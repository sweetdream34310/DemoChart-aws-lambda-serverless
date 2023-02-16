import { Handler } from 'aws-lambda';
import { initDB } from '../shared/db';
import { bucketFolders } from '../shared/enums';
import {
	badRequestReturn,
	getPublicUrl, startupRoutine
} from '../shared/helpers';
import { ProfileListItem } from '../shared/models/ProfileListItem';
import { SocialMedia } from '../shared/models/SocialMedia';
import { Song } from '../shared/models/Song';
import { User } from '../shared/models/User';
import {Favorites} from "../shared/models/Favorites";
import {UserSelectors} from "../shared/helpers/PublicSelectors/UserSelectors";
initDB();

export const handler: Handler = async (event) => {
	startupRoutine(event);

	try {

		console.log("srcGetFollowed: Start")
		const uid = event?.cognitoPoolClaims?.sub;

		const options = {
			where: { followerUid: uid },
			include: [
				{
					model: User,
					as: 'followed',
					attributes: UserSelectors.favorites,
					include: [{
						model: ProfileListItem,
						attributes: [
							'title',
							'header',
							'description',
							'dateString',
							'link',
						],
					}]
				},
			],
		}

		console.log("srcGetFollowed: options")

		console.log(options);

		const followedUsers = await Favorites.findAll(options);


		console.log("srcGetFollowed: awaited")
		console.log(followedUsers);

		// if (followedUsers.length === 0) {
		//
		// 	return badRequestReturn();
		// }

		// const retObj = followedUsers.map((e) => {
		// 	return {
		// 		...e,
		// 		profileImg: getPublicUrl(e.uid, bucketFolders.profilePic),
		// 		profileHeader: getPublicUrl(e.uid, bucketFolders.profileHeader)
		// 	};
		// });

		// const userObj = user.toJSON() as User;
		// userObj.uploadedSongs = temp as any;

		return followedUsers;
	} catch (e) {
		console.error(e);
		return badRequestReturn();
	}
};
