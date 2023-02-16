import { Handler } from 'aws-lambda';
import {
	startupRoutine,
	badRequestReturn,
	objectUrlToBuffer,
	uplaodToBucket,
	genericResponse, anInternalError,
} from '../shared/helpers';
import sharp from 'sharp';
import {
	fileTypeImg,
	PROFILE_HEADER_WIDTH,
	PROFILE_HEADER_HEIGHT,
} from '../shared/config';
import { bucketFolders, fileTypes } from '../shared/enums';
import { UploadProfileHeader } from '../../typings/UploadProfileHeader';

import { v4 as uuidv4 } from 'uuid';
import {User} from "../shared/models/User";
import {initDB} from "../shared/db";

initDB();

const bucket = process.env.DATA_BUCKET || '';

export const handler: Handler = async (event) => {
	startupRoutine(event);

	const uid = event?.cognitoPoolClaims?.sub;
	const body: UploadProfileHeader = event?.body;


	console.log("srcUploadProfileHeader");
	console.log("body");
	console.log(body);

	const profileHeaderUid = uuidv4();

	try {
		// Convert dataURL to buffer
		// @ts-ignore
		const buffer = objectUrlToBuffer(body.file);

		// Resize picture
		let newBuffer = buffer;


		// const fileSize = (body.file).replace(/=/g,'').length * 0.75;
		// console.log("File size: " + fileSize);
		// if (fileSize > 512000) {
			newBuffer = await sharp(buffer)
				.resize(PROFILE_HEADER_WIDTH, PROFILE_HEADER_HEIGHT)
				.jpeg()
				.toBuffer();
		// }

		// Upload picture to s3
		await uplaodToBucket(
			newBuffer,
			profileHeaderUid,
			fileTypeImg,
			fileTypes.jpg,
			bucket,
			bucketFolders.profileHeader
		);

		const profileHeaderSrc = profileHeaderUid;

		await User.update(
			{
				profileHeaderSrc
			},
			{ where: { uid } }
		);

		return {newSrc: profileHeaderSrc}
	} catch (e: any) {
		return anInternalError(e);
	}
};
