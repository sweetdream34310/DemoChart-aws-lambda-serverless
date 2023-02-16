import { fileTypeVideo } from './../shared/config';
import { CATEGORIES } from './../../../lib/types/Categories';
import { bucketFolders, fileTypes } from '../shared/enums';
import {
	REFERENCE_PIC_WIDHT,
	REFERENCE_PIC_HEIGHT,
	fileTypeImg,
} from '../shared/config';

/*
		
im Gig ist seller id, dann fragen ob seller id zur userid gehört
wenn ja, dann weiter sonst 401

*/
import { v4 as uuidv4 } from 'uuid';
import { Handler } from 'aws-lambda';
import {
	startupRoutine,
	anInternalErrorResponse,
	aNotFoundResponse,
	objectUrlToBuffer,
	uplaodToBucket,
	aBadRequestResponse,
	bulkUpsert,
	bulkUpertNested,
} from '../shared/helpers';
import { initDB } from '../shared/db';
import { Gig } from '../shared/models/Gig';
import { Seller } from '../shared/models/Seller';
import { GigFaq } from '../shared/models/GigFaq';
import { GigGenres } from '../shared/models/GigGenres';
import { GigReferences } from '../shared/models/GigReferences';
import { GigMedia } from '../shared/models/GigMedia';
import { ServiceOffer } from '../shared/models/ServiceOffer';
import { ServiceOfferFeatures } from '../shared/models/ServiceOfferFeatures';
import sharp from 'sharp';
import { GigCategories } from '../shared/models/GigCategories';
import generateUniqueSlug from '../shared/helpers/generateUniqueSlug';
initDB();

interface media {
	meidaUrl: string;
	arrayPosition: number;
	isVideo?: boolean
}

const bucket = 'backend-s3buckets-dev-databucket-mnzmiczicq8f';
export const handler: Handler = async (
	event: any,
	context: any,
	callback: any
) => {
	startupRoutine(event);
	const userUid = event?.cognitoPoolClaims?.sub;
	
	const body: any = event?.body;
	const {
		uid,
		name,
		gigCategories,
		active,
		completed,
		price,
		currency,
		description,
		experienceYears,
		welcomeMessage,
		gigGenres,
		gigFaqs,
		gigReferences,
		gigMedias,
		gigServiceOffers,
	} = body;

	try {
		let foundSeller = await Seller.findOne({ where: { userUid: userUid } });
		let gigVideos:[] = [];
		let gigImages:[] = [];

		if (!foundSeller) {
			return aBadRequestResponse(callback, 'Seller not found');
		}

		let foundGig;
		if (uid) {
			foundGig = await Gig.findOne({
				where: { uid: uid, sellerUid: foundSeller.uid },
				include: [
					{
						model: GigGenres,
						required: false,
					},
					{
						model: GigFaq,
						required: false,
					},
					{
						model: GigReferences,
						required: false,
					},
					{
						model: GigCategories,
						required: false,
					},
					{
						model: GigMedia,
						required: false,
					},
					{
						model: ServiceOffer,
						required: false,
					},
				],
			});
		}

		// TODO: check if uid from fronent is same as saved in backend
		// if (foundGig) {
		// 	blockUnwantedUids(gigReferences, foundGig.gigReferences)
		// 	blockUnwantedUids(gigGenres, foundGig.gigGenres)
		// 	blockUnwantedUids(gigFaqs, foundGig.gigFaqs)
		// 	blockUnwantedUids(gigMedias, foundGig.gigMedias)
		// 	blockUnwantedUids(gigServiceOffers, foundGig.gigServiceOffers)
		// }
		const slug = await generateUniqueSlug(name, async (slug: string) => await Gig.findOne({where: {slug}}) )
		console.log("SLUG   ", slug)
		const gigOptions: any = {
			name,
			slug,
			active,
			price,
			completed,
			currency,
			description,
			experienceYears,
			welcomeMessage,
		};

		gigOptions.sellerUid = foundSeller.uid;

		if (foundGig) {
			gigOptions.uid = foundGig.uid;
		}

		let gig = await Gig.upsert(gigOptions);
		const gigUid = foundGig ? foundGig.uid : gig[0].uid;

		gigCategories?.forEach((el: any) => (el.gigUid = gigUid));
		gigGenres?.forEach((el: any) => (el.gigUid = gigUid));
		gigFaqs?.forEach((el: any) => (el.gigUid = gigUid));
		gigServiceOffers?.forEach((el: any) => (el.gigUid = gigUid));
		gigMedias?.forEach((el: any) => (el.gigUid = gigUid));
		gigVideos?.forEach((el: any) => (el.gigUid = gigUid));




		if (gigReferences != undefined) {
			foundGig && foundGig.gigReferences.forEach(async reference => {
				if(!gigReferences.find((ref:any) => {return ref.uid === reference.uid})) {
					await GigReferences.destroy({
						where: {
							uid : reference.uid
						}
					});
				}
			});
					
			await bulkUploadImages(gigReferences, gigUid, 'img');
			await bulkUpsert(GigReferences, gigReferences);
		}

		if (gigMedias != undefined) {
			foundGig && foundGig.gigMedias.forEach(async media => {
				if(!gigMedias.find((med:any) => {return med.uid === media.uid})) {
					await GigMedia.destroy({
						where: {
							uid : media.uid
						}
					});
				}
			});

			gigImages = gigMedias.filter((media:media) => !media.isVideo);
			gigVideos = gigMedias.filter((media:media) => media.isVideo);
			await bulkUploadImages(gigImages, gigUid, 'mediaUrl');
			await bulkUpsert(GigMedia, gigImages);
		}

		if (gigVideos.length > 0) {
			await bulkUploadVideos(gigVideos, gigUid, 'mediaUrl');
			await bulkUpsert(GigMedia, gigVideos);
		}

		if (gigServiceOffers != undefined) {
			foundGig && foundGig.gigServiceOffers.forEach(async serviceOffer => {
				if(!gigServiceOffers.find((offer:any) => {return offer.uid === serviceOffer.uid})) {
					await ServiceOffer.destroy({
						where: {
							uid : serviceOffer.uid
						}
					});
				}
			});
			await bulkUpertNested(ServiceOffer, ServiceOfferFeatures, gigServiceOffers);
		}
		if (gigFaqs != undefined) {
			foundGig && foundGig.gigFaqs.forEach(async faq => {
				if(!gigFaqs.find((fa:any) => {return fa.uid === faq.uid})) {
					await GigFaq.destroy({
						where: {
							uid : faq.uid
						}
					});
				}
			});
			await bulkUpsert(GigFaq, gigFaqs);
		}
		if (gigGenres != undefined) {
			await bulkUpsert(GigGenres, gigGenres);
		}
		if (gigCategories != undefined) {
			await bulkUpsert(GigCategories, gigCategories);
		}

		return [gig[0]];
	} catch (e) {
		return anInternalErrorResponse(callback, e);
	}
};

async function handleReferenceImage(image: any) {
	const buffer = objectUrlToBuffer(image);

	const newBuffer = await sharp(buffer)
		.resize(REFERENCE_PIC_WIDHT, REFERENCE_PIC_HEIGHT)
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

async function handleVideoUpload(image: any) {
	const buffer = objectUrlToBuffer(image);

	const videoUid = uuidv4();

	const imgSrc = await uplaodToBucket(
		buffer,
		videoUid,
		fileTypeVideo,
		fileTypes.mp4,
		bucket,
		bucketFolders.marketplace
	);
	const videoSrc = videoUid;

	return videoSrc;
}

async function bulkUploadImages(
	array: any,
	foundGigUid: String,
	columnName: string
) {
	for (const element of array) {
		if (element.hasOwnProperty(columnName) && element[columnName] != '' && element[columnName].startsWith("data:image")) {
			console.log("WOOOO,   ",  )
			const imageUid = await handleReferenceImage(element[columnName]);
			element[columnName] = imageUid;
		} else {
			console.error(
				'No Image provided for reference' + element.name + '!'
			);
		}
		element.gigUid = foundGigUid;
	}
}

async function bulkUploadVideos(
	array: any,
	foundGigUid: String,
	columnName: string
) {
	for (const element of array) {
		if (element.hasOwnProperty(columnName) && element[columnName] != '' && element[columnName].startsWith("data:video")) {
			const imageUid = await handleVideoUpload(element[columnName]);
			element[columnName] = imageUid;
		} else {
			console.error(
				'No Image provided for reference' + element.name + '!'
			);
		}
		element.gigUid = foundGigUid;
	}
}
