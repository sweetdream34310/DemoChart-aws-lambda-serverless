import { Handler } from 'aws-lambda';
import {Op, Sequelize} from 'sequelize';
import { GetCharts } from 'typings/GetCharts';
import { initDB } from '../shared/db';
import { bucketFolders } from '../shared/enums';
import {
	anInternalErrorResponse,
	badRequestReturn,
	getPublicUrl,
	startupRoutine
} from '../shared/helpers';
import { Listen } from '../shared/models/Listen';
import { Rating } from '../shared/models/Rating';
import { Song } from '../shared/models/Song';
import { User } from '../shared/models/User';
import {UserSelectors} from "../shared/helpers/PublicSelectors/UserSelectors";
initDB();

export const handler: Handler = async (event, context, callback) => {
	startupRoutine(event);

	try {
		const songs = await Song.findAll({
			attributes: [
				'title',
				'uid',
				'genreID',
				'chartPosition',
				'paid',
				'disabledByAdmin',
				[Sequelize.fn('AVG', Sequelize.col('score')), 'ratingsSum'],
				[
					Sequelize.fn('COUNT', Sequelize.col('duration')),
					'listensSum',
				],
				'createdAt'
			],
			include: [
				{
					model: User,
					as: 'user',
					attributes: UserSelectors.songPreview,
				},
				{ model: Rating, attributes: [] },
				{ model: Listen, attributes: [] },
			],
			group: 'uid',
			order: [['createdAt', 'DESC']],
			subQuery: false,
		});

		const ret = songs.map((song) => {
			const songJson = song.toJSON() as any;
			return {
				uid: songJson.uid,
				url: getPublicUrl(songJson.uid, bucketFolders.songs),
				artistImg: getPublicUrl(
					songJson.user.uid,
					bucketFolders.profilePic
				),
				artist: songJson.user,
				title: songJson.title,
				rating: Number(songJson.ratingsSum),
				plays: songJson.listensSum,
				countryID: songJson.user.countryID,
				genreID: songJson.genreID,
				paid: songJson.paid,
				disabledByAdmin: songJson.disabledByAdmin,
				chartPosition: songJson.chartPosition,
				createdAt: songJson.createdAt,
			};
		});
		return ret;
	} catch (err) {
		console.error(err);
		return anInternalErrorResponse(callback, err);
	}
};
