import { Handler } from 'aws-lambda';
import { bucketFolders } from '../shared/enums';
import {
	startupRoutine,
	badRequestReturn,
	getPublicUrl, aNotFoundResponse, anInternalErrorResponse,
} from '../shared/helpers';
import { initDB } from '../shared/db';
import { Song } from '../shared/models/Song';
import {Op, Sequelize} from 'sequelize';
import { Rating } from '../shared/models/Rating';
import { User } from '../shared/models/User';
import {isFollowedByRequestedUser} from "../shared/sharedQueries/isFollowedByRequestedUser";
import {SaveRating} from "../../typings/SaveRating";
import {FilterSongs} from "../../typings/FilterSongs";
import {UserSelectors} from "../shared/helpers/PublicSelectors/UserSelectors";
initDB();

export const handler: Handler = async (event, context, callback) => {
	startupRoutine(event);
	const uid = event?.cognitoPoolClaims?.sub;

	const body: FilterSongs = event?.body;
	const { songID, filter } = body;

	try {
		let song;
		// If songID return specified song else return random songe
		if (songID) {
			song = await Song.findOne({
				attributes: ['uid', 'title', 'genreID'],
				where: { uid: songID },
				include: [
					{
						model: User,
						attributes: UserSelectors.songPreview,
					},
				],
			});
		} else {
			song = await Song.findOne({
				attributes: ['uid', 'title', 'genreID'],
				where: Sequelize.and(
					Sequelize.where(Sequelize.col('ratings.uid'), null),
					{
						paid: true,
						disabledByAdmin: false,
					},
					filter && filter.genres.length > 0
						? { genreID: { [Op.in]: filter.genres.map(el => el[0]) } }
						: { paid: true }
				),
				include: [
					{ model: User, attributes: UserSelectors.songPreview },
					{
						model: Rating,
						required: false,
						where: { userUid: uid },
						attributes: [],
					},
				],
				group: 'uid',
				subQuery: false,
			});
		}


		if (!song) return aNotFoundResponse(callback, 'No songs found for this user with this filter');

		const isFollowedByReqUser = await isFollowedByRequestedUser(uid, song.user.uid);

		return {
			uid: song.uid,
			coverSrc: getPublicUrl(song.uid, bucketFolders.covers),
			mp3Src: getPublicUrl(song.uid, bucketFolders.songs),
			title: song.title,
			genreID: song.genreID,
			artist: {
				firstName: song.user.firstName,
				lastName: song.user.lastName,
				artistName: song.user.artistName,
				slug: song.user.slug,
				uid: song.user.uid,
				isFollowedByRequestedUser: isFollowedByReqUser
			},
			userUid: song.user.uid,
			countryID: song.user.countryID,
		};
	} catch (e) {
		return anInternalErrorResponse(callback, e);
	}
};
