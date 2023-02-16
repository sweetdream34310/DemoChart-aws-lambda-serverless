import { Handler } from 'aws-lambda';
import { startupRoutine, badRequestReturn } from '../shared/helpers';

import { UpdateSongDetails } from 'typings/UpdateSongDetails';
import { Song } from '../shared/models/Song';
import { initDB } from '../shared/db';
initDB();

export const handler: Handler = async (event) => {
	startupRoutine(event);

	const uid = event?.cognitoPoolClaims?.sub;
	const body: UpdateSongDetails = event?.body;
	const { songID, title, genreID, moodID } = body;

	try {
		// create song in DB
		const song = await Song.update(
			{
				title,
				genreID,
				moodID,
			},
			{ where: { uid: songID, userUid: uid } }
		);

		if (song[0] === 0) {
			console.error(`User ${uid} does not have song with uid ${songID}`);
			return badRequestReturn();
		}

		console.log(song);
		// @ts-ignore
		return song[1];
	} catch (e) {
		console.error(e);
		return badRequestReturn();
	}
};
