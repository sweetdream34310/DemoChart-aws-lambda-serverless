import { Handler } from 'aws-lambda';
import {
	startupRoutine,
	badRequestReturn,
	objectUrlToBuffer,
	uplaodToBucket,
	genericResponse,
} from '../shared/helpers';
import { COVER_SIZE, fileTypeImg } from '../shared/config';
import { Song } from '../shared/models/Song';
import { initDB } from '../shared/db';
import { UploadCover } from 'typings/UploadCover';
import sharp from 'sharp';
import { bucketFolders, fileTypes } from '../shared/enums';
initDB();

const bucket = process.env.DATA_BUCKET || '';

export const handler: Handler = async (event) => {
	startupRoutine(event);

	console.log("Cover upload started")

	const uid = event?.cognitoPoolClaims?.sub;
	const body: UploadCover = event?.body;
	const { songID, file } = body;

	try {
		// create song in DB
		const song = await Song.findOne({
			where: { uid: songID, userUid: uid },
		});
		console.log(song);

		if (!song) {
			console.error('No song with give in Found');
			return badRequestReturn();
		}

		// Convert dataURL to buffer
		const buffer = objectUrlToBuffer(file);

		// Resize picture
		const newBuffer = await sharp(buffer)
			.resize(COVER_SIZE, COVER_SIZE)
			.jpeg()
			.toBuffer();

		// Upload song to s3
		await uplaodToBucket(
			newBuffer,
			song.uid,
			fileTypeImg,
			fileTypes.jpg,
			bucket,
			bucketFolders.covers
		);

		return genericResponse(true);
	} catch (e) {
		console.error(e);
		return badRequestReturn();
	}
};
