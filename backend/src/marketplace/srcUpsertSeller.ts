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
import { User } from '../shared/models/User';
initDB();
const bucket = "backend-s3buckets-dev-databucket-mnzmiczicq8f";
export const handler: Handler = async (event: any, context: any, callback: any) => {
	startupRoutine(event);
    const userUid = event?.cognitoPoolClaims?.sub;
	const body: any = event?.body;
    const {
		seller,
		user
	} = body;

	const sellerOptions: any = {
		aboutMe: seller.aboutMe,
		slug: seller.slug,
		userName: seller.userName,
		profileImageSrc: seller.profileImageSrc,
		experienceYears: seller.experienceYears,
		gigsCompleted: seller.gigsCompleted,
		activeSeller: seller.activeSeller,
		customLabel: seller.customLabel,
		customLabelValue: seller.customLabelValue
	}

	const userOptions: any = {
		uid: userUid,
		firstName: user.firstName,
		lastName: user.lastName,
		jobTitle: user.jobTitle,
		countryID: user.countryID
	};

	try {

		let foundSeller = await Seller.findOne( { where: { userUid: userUid } });

		if (foundSeller) { sellerOptions.uid = foundSeller.uid }

		if (sellerOptions.profileImageSrc != undefined && sellerOptions.profileImageSrc.startsWith("data:image")) {
			sellerOptions.profileImageSrc = await handleImageUpload(sellerOptions.profileImageSrc)
		}

		let seller = await Seller.upsert(sellerOptions);
		let user = await User.upsert(userOptions);

		return [seller[0], user[0]];
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
	const profileImageSrc = profileImageUid;

	return profileImageSrc;
}

