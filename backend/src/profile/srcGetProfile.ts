import { Handler } from 'aws-lambda';
import {initDB} from '../shared/db';
import { bucketFolders } from '../shared/enums';
import {
	aBadRequestResponse,
	anInternalError, anInternalErrorResponse, aNotFoundResponse, anUnauthorizedResponse,
	badRequestReturn,
	getPublicUrl, startupRoutine
} from '../shared/helpers';
import { ProfileListItem } from '../shared/models/ProfileListItem';
import { SocialMedia } from '../shared/models/SocialMedia';
import { Song } from '../shared/models/Song';
import { User } from '../shared/models/User';
import {Favorites} from "../shared/models/Favorites";
import {Sequelize} from "sequelize-typescript";
import {isFollowedByRequestedUser} from "../shared/sharedQueries/isFollowedByRequestedUser";
import {UserSelectors} from "../shared/helpers/PublicSelectors/UserSelectors";
import {UserTypes} from "../../../lib/types/UserTypes";
initDB();

export const handler: Handler = async (event, context, callback) => {
	startupRoutine(event);

	const slug = event?.query?.slug;
	if (!slug) {
		return aBadRequestResponse(callback, 'missing query parameter');
	}

	try {
		const requestedByUid = event?.cognitoPoolClaims?.sub;
		const requestedBy = await User.findOne( {
			where: { uid: requestedByUid }
		});

		const user = await User.findOne({
			attributes: UserSelectors.profile,
			where: { slug: slug, approvedByAdmin: true },
			include: [
				{
					model: ProfileListItem,
					attributes: [
						'title',
						'header',
						'description',
						'dateString',
						'link',
					],
				},
				{
					model: SocialMedia,
					attributes: ['platform', 'link', 'linkText'],
					limit: 10,
				},
				{
					model: Song,
					as: 'uploadedSongs',
					attributes: ['uid', 'genreID', 'title'],
					where: {
						paid: true,
					},
					order: [['paymentDate', 'DESC']],
					limit: 10,
				},
			],
		});

		if (!user || !requestedBy) {
			return aNotFoundResponse(callback, `No user found with slug ${slug}`);
		}

		if (
			user.slug !== requestedBy.slug &&
			user.userType === UserTypes.Artist && requestedBy.userType === UserTypes.Artist
		){
			return anUnauthorizedResponse(callback, 'An artist is not allowed to see another artist\'s profile')
		}

		const uid = event?.cognitoPoolClaims?.sub;
		const isFollowedByReqUser = await isFollowedByRequestedUser(uid, user.uid);


		const userObj = user.toJSON() as User;

		// Group items by categories
		// userObj.profileListItems = userObj.profileListItems.reduce(
		// 	(acc, cur) => {
		// 		const index = acc.findIndex((e) => e[0].title === cur.title);
		// 		if (index >= 0) {
		// 			acc[index].push(cur);
		// 		} else {
		// 			acc.push([cur]);
		// 		}
		// 		return acc;
		// 	},
		// 	new Array<any>()
		// );

		// Add song url
		const temp = userObj.uploadedSongs.map((e) => {
			return { ...e, url: getPublicUrl(e.uid, bucketFolders.songs) };
		});
		console.log(temp);
		userObj.uploadedSongs = temp as any;

		return {
			profileImg: getPublicUrl(user.profileImageSrc, bucketFolders.profilePic),
			profileHeader: getPublicUrl(user.profileHeaderSrc, bucketFolders.profileHeader),
			isFollowedByRequestedUser: isFollowedByReqUser,
			...userObj,
		};
	} catch (e) {
		return anInternalErrorResponse(callback, e);
	}
};
