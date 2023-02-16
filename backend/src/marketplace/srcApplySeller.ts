import { fileTypes, bucketFolders } from './../shared/enums';
import { PROFILE_PIC_SIZE, fileTypeImg } from './../shared/config';
import { Handler } from 'aws-lambda';
import {
	startupRoutine, anInternalErrorResponse, objectUrlToBuffer, uplaodToBucket
} from '../shared/helpers';
import { initDB } from '../shared/db';
import {Seller} from "../shared/models/Seller";
import { v4 as uuidv4 } from 'uuid';
import sharp from 'sharp'
import {transporter} from "../shared/mails/mailings";
import {User} from "../shared/models/User";
initDB();
const bucket = "backend-s3buckets-dev-databucket-mnzmiczicq8f";

export const handler: Handler = async (event: any, context: any, callback: any) => {
	startupRoutine(event);
    const userUid = event?.cognitoPoolClaims?.sub;
	const body: any = event?.body;
	console.log("useruis: ",userUid)

	try {
		const user = await User.findOne({ where: { uid: userUid },});

		const params = {
			from: {
				name: 'no reply (Democharts)',
				address: 'no-reply@democharts.org',
			},
			replyTo: 'no-reply@democharts.org',
			to: 'hello@democharts.org',
			subject: 'New Seller Application',
			html: `
    <h1>${user?.firstName} ${user?.name} applied as a seller</h1>
    <p>Categories: ${body.category1} ${body.category2}</p>
    <p>Description: ${body.description}</p>
    <p>Uid: ${user?.uid}</p>
  `,
		};

		transporter.sendMail(params);
		return;
	} catch (e) {
		return anInternalErrorResponse(callback, e);
	}
};

async function handleImageUpload(image :any){
	const buffer = objectUrlToBuffer(image);

	const newBuffer = await sharp(buffer)
		.resize(PROFILE_PIC_SIZE, PROFILE_PIC_SIZE)
		.jpeg()
		.toBuffer();

	const profileImageUid = uuidv4();

	const imgSrc = await uplaodToBucket(
		newBuffer,
		profileImageUid,
		fileTypeImg,
		fileTypes.jpg,
		bucket,
		bucketFolders.marketplace
	);
	console.log("ImageSource: " + imgSrc)
	const profileImageSrc = profileImageUid;

	return profileImageSrc;
}

