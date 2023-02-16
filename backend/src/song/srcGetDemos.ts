import { Handler } from 'aws-lambda';
import {
	badRequestReturn,
	getPublicUrl,
	startupRoutine,
} from '../shared/helpers';
import { Song } from '../shared/models/Song';
import { initDB } from '../shared/db';
import { bucketFolders } from '../shared/enums';
import { Op, Sequelize } from 'sequelize';
import { Rating } from '../shared/models/Rating';
import { Listen } from '../shared/models/Listen';
initDB();

export const handler: Handler = async (event) => {
	startupRoutine(event);
	const uid = event?.cognitoPoolClaims?.sub;

	try {
		const songs = await Song.findAll({
			attributes: [
				'uid',
				'paymentDate',
				'title',
				'genreID',
				'chartPosition',
				[Sequelize.fn('AVG', Sequelize.col('score')), 'ratingsAvg'],
				[Sequelize.fn('AVG', Sequelize.col('duration')), 'listensAvg'],
			],
			where: { userUid: uid, paid: true },
			include: [
				{ model: Rating, attributes: [] },
				{ model: Listen, attributes: [] },
			],
			group: 'uid',
			order: [['paymentDate', 'DESC']],
			subQuery: false,
		});

		// Calucaltes the amount of plays per song
		// IDK how to combiens this into oen query
		const listens = await Song.findAll({
			attributes: [
				'uid',
				[
					Sequelize.fn('COUNT', Sequelize.col('duration')),
					'listensSum',
				],
			],
			where: { userUid: uid, paid: true },
			include: [{ model: Listen, attributes: [] }],
			group: 'uid',
			subQuery: false,
		});

		return songs.map((song) => {
			const {
				uid,
				title,
				paymentDate,
				genreID,
				ratingsAvg,
				listensAvg,
				chartPosition,
			} = song.toJSON() as any;
			return {
				uid,
				date: paymentDate,
				title,
				coverSrc: getPublicUrl(uid, bucketFolders.covers),
				genreID,
				chartPosition,
				avgPlaytime: listensAvg,
				totalPlays: (listens
					.find((e) => e.uid === uid)
					?.toJSON() as any).listensSum,
				rating: Number(ratingsAvg),
				url: getPublicUrl(uid, bucketFolders.songs),
			};
		});
	} catch (err) {
		console.error(err);
		return badRequestReturn();
	}
};
