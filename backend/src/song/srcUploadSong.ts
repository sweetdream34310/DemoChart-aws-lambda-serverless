import { Handler } from 'aws-lambda';
import {
	startupRoutine,
	badRequestReturn,
	objectUrlToBuffer,
	uplaodToBucket,
} from '../shared/helpers';
import { bucketFolders, fileTypes } from '../shared/enums';
import { UploadSong } from 'typings/UploadSong';
import { Song } from '../shared/models/Song';
import { initDB } from '../shared/db';
initDB();

const bucket = process.env.DATA_BUCKET || '';

export const handler: Handler = async (event) => {
	startupRoutine(event);

	const uid = event?.cognitoPoolClaims?.sub;
	const body: UploadSong = event?.body;
	const { file } = body;

	try {
		// create song in DB
		const song = await Song.create({
			userUid: uid,
		});

		// Convert dataURL to buffer
		const buffer = objectUrlToBuffer(file);

		// Upload song to s3
		await uplaodToBucket(
			buffer,
			song.uid,
			fileTypes.mp3,
			fileTypes.mp3,
			bucket,
			bucketFolders.songs
		);

		return song.uid;
	} catch (e) {
		console.error(e);
		return badRequestReturn();
	}
};
