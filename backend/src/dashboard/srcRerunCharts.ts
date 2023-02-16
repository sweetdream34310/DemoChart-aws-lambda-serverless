import { Handler } from 'aws-lambda';
import {Op, Sequelize} from 'sequelize';
import { GetCharts } from 'typings/GetCharts';
import { initDB } from '../shared/db';
import { bucketFolders } from '../shared/enums';
import {
	badRequestReturn, genericResponse,
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

	try {
		const songs = await Song.findAll({
			attributes: [
				'title',
				'uid',
				'genreID',
				[Sequelize.fn('AVG', Sequelize.col('score')), 'ratingsSum'],
				[
					Sequelize.fn('COUNT', Sequelize.col('duration')),
					'listensSum',
				],
				'paid'
			],
			// where: {
			// 	[Op.and]: [{ genreID }, { paid: true }],
			// },
			// where: {
			// 	paid: true,
			// },
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
			order: [[Sequelize.col('ratingsSum'), 'DESC']],
			subQuery: false,
			raw: true,
			// limit: 100, --> also reset those who got no chart position anymore!
		});

		const promises = [];
		let chartPos = 0;
		for (let i = 0; i < songs.length; i++) {
			const songJson = songs[i] as any;

			console.log(songs[i]);
			let isChart = false;
			if (Number.parseInt(songJson.listensSum) > 10 && chartPos < 100 && songs[i].paid){
				isChart = true;
				chartPos ++;
				console.log("CHART! " + chartPos)
			}

			const promiseSong = Song.update(
				{ chartPosition: (isChart ? chartPos : null)},
				{ where: {
						uid: songs[i].uid
					}
				});
			promises.push(promiseSong)
		}

		console.log(promises)
		await Promise.all(promises);



		return genericResponse(true);



	} catch (err) {
		console.error(err);
		return badRequestReturn();
	}
};
