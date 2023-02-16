import { Handler } from 'aws-lambda';
import {Op, Sequelize} from 'sequelize';
import { GetCharts } from 'typings/GetCharts';
import { initDB } from '../shared/db';
import { bucketFolders } from '../shared/enums';
import {
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

export const handler: Handler = async (event) => {
	startupRoutine(event);
	const body: GetCharts = event?.body;
	const { genreID } = body;

	try {
		const songs = await Song.findAll({
			attributes: [
				'title',
				'uid',
				'genreID',
				'chartPosition',
				[
					Sequelize.fn('AVG', Sequelize.col('score')),
					'ratingsSum'
				],
				[
					Sequelize.fn('AVG', Sequelize.col('duration')),
					'listensSum',
				],
			],
			// where: {
			// 	[Op.and]: [{ genreID }, { paid: true }],
			// },
			where: {
				paid: true,
				disabledByAdmin: false,
				chartPosition: {
					[Op.lte]: 100,
				}
			},
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
			order: [['chartPosition', 'ASC']],
			// order: [[Sequelize.col('ratingsSum'), 'DESC']],
			subQuery: false,
			limit: 100,
		});

		const ret = songs.map((song) => {
			const songJson = song.toJSON() as any;
			return {
				uid: songJson.uid,
				url: getPublicUrl(songJson.uid, bucketFolders.songs),
				coverUrl: getPublicUrl(
					songJson.uid,
					bucketFolders.covers
				),
				artist: songJson.user,
				// artist: {
				// 	name: songJson.user.artistName,
				// 	slug: songJson.user.slug,
				// 	firstName: songJson.user.firstName,
				// 	lastName: songJson.user.lastName,
				// },
				title: songJson.title,
				rating: Number(songJson.ratingsSum),
				plays: Math.round(songJson.listensSum),
				countryID: songJson.user.countryID,
				genreID: songJson.genreID,
				chartPosition: songJson.chartPosition
			};
		});
		return ret;
	} catch (err) {
		console.error(err);
		return badRequestReturn();
	}
};
