import { Handler } from 'aws-lambda';
import {
	startupRoutine,
	badRequestReturn,
	objectUrlToBuffer,
	uplaodToBucket,
	genericResponse, anInternalError,
} from '../shared/helpers';
import sharp from 'sharp';
import { UploadProfilePic } from 'typings/UploadProfilePic';
import { fileTypeImg, PROFILE_PIC_SIZE } from '../shared/config';
import { bucketFolders, fileTypes } from '../shared/enums';
import {User} from "../shared/models/User";
import {v4 as uuidv4} from "uuid";
import {initDB} from "../shared/db";

initDB();

const bucket = process.env.DATA_BUCKET || '';

export const handler: Handler = async (event) => {
	startupRoutine(event);

	const uid = event?.cognitoPoolClaims?.sub;
	const body: UploadProfilePic = event?.body;

	try {
		// Convert dataURL to buffer
		const buffer = objectUrlToBuffer(body.file);

		// Resize picture
		const newBuffer = await sharp(buffer)
			.resize(PROFILE_PIC_SIZE, PROFILE_PIC_SIZE)
			.jpeg()
			.toBuffer();


		const profileImageUid = uuidv4();

		// Upload picture to s3
		await uplaodToBucket(
			newBuffer,
			profileImageUid,
			fileTypeImg,
			fileTypes.jpg,
			bucket,
			bucketFolders.profilePic
		);


		const profileImageSrc = profileImageUid;

		await User.update(
			{
				profileImageSrc
			},
			{ where: { uid } }
		);

		return {newSrc: profileImageSrc}

	} catch (e: any) {
		return anInternalError(e);
	}
};
