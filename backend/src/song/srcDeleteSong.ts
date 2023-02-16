import { Handler } from 'aws-lambda';
import {
	startupRoutine,
	badRequestReturn,
	genericResponse,
} from '../shared/helpers';
import { DeleteSong } from 'typings/DeleteSong';
import { Song } from '../shared/models/Song';
import { initDB } from '../shared/db';
initDB();

export const handler: Handler = async (event) => {
	startupRoutine(event);

	const userUid = event?.cognitoPoolClaims?.sub;
	const body: DeleteSong = event?.body;
	const { songID: uid } = body;

	try {
		await Song.destroy({
			where: {
				uid,
				userUid,
			},
		});

		return genericResponse();
	} catch (e) {
		console.error(e);
		return badRequestReturn();
	}
};
