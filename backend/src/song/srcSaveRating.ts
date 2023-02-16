import { Handler } from 'aws-lambda';
import {
	startupRoutine,
	badRequestReturn,
	genericResponse,
} from '../shared/helpers';
import { initDB } from '../shared/db';
import { SaveRating } from 'typings/SaveRating';
import { Rating } from '../shared/models/Rating';
import { Listen } from '../shared/models/Listen';
initDB();

export const handler: Handler = async (event) => {
	startupRoutine(event);

	const uid = event?.cognitoPoolClaims?.sub;
	const body: SaveRating = event?.body;
	const { songID, rating, listenTime } = body;

	try {
		await Rating.create({
			songUid: songID,
			userUid: uid,
			score: rating,
		});

		await Listen.create({
			songUid: songID,
			userUid: uid,
			duration: listenTime,
		});

		return genericResponse();
	} catch (e) {
		console.error(e);
		return badRequestReturn();
	}
};
