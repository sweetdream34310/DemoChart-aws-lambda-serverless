import { OrderMedia } from './../shared/models/OrderMedia';
import { bucketFolders, fileTypes } from './../shared/enums';
import { fileTypeImg, fileTypeVideo } from './../shared/config';
import { ServiceOfferOrder } from './../shared/models/ServiceOfferOrder';
import { Handler } from 'aws-lambda';
import { v4 as uuidv4 } from 'uuid';
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
import { Order } from '../shared/models/Order';
initDB();
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
		sellerUid,
		buyerUid,
		gigUid,
		orderStatus,
		orderDue,
		orderDate,
		orderPrice,
		buyerMessage,
		serviceOfferUid,
		uploadedFiles,
	} = body;

	try {
		const orderDateObj = new Date(orderDate);
		orderDateObj.setDate(orderDateObj.getDate() + orderDue);

		let foundOrder = await ServiceOfferOrder.findOne({
			where: { sellerUid: sellerUid, orderDate: orderDate },
		});

		const orderOptions: any = {
			sellerUid: sellerUid,
			buyerUid: buyerUid,
			gigUid: gigUid,
			orderStatus: orderStatus,
			orderDue: orderDateObj.toISOString(),
			orderDate: orderDate,
			buyerMessage: buyerMessage,
			orderPrice: orderPrice,
			serviceOfferUid: serviceOfferUid,
		};

		if (foundOrder) {
			orderOptions.uid = foundOrder.uid;
		}

		
		let order = await ServiceOfferOrder.upsert(orderOptions);

		const orderUid = foundOrder ? foundOrder.uid : order[0].uid;
		//TODO: Größe & Titel adden
		await uploadedFiles.forEach(
			(file: any) => {
				switch (file.fileType) {
					case 'image/jpeg':
						file.fileType = fileTypeImg;
						file.fileEnding = fileTypes.jpeg;
						break;
					case 'image/png':
						file.fileType = fileTypeImg;
						file.fileEnding = fileTypes.png;
						break;
					case 'video/mp4':
						file.fileType = fileTypeVideo;
						file.fileEnding = fileTypes.mp4;
						break;
					case 'audio/mpeg':
						file.fileType = fileTypes.mp3;
						file.fileEnding = fileTypes.mp3;
						break;
					case 'application/pdf':
						file.fileType = fileTypes.pdf;
						file.fileEnding = fileTypes.pdf;
						break;
					default:
						break;
				}
			}
		);

		await bulkUploadMedia(uploadedFiles, orderUid)
		await bulkUpsert(OrderMedia, uploadedFiles);

		return [order, uploadedFiles];
	} catch (e) {
		return anInternalErrorResponse(callback, e);
	}
};

async function bulkUploadMedia(
	array: any,
	orderUid: String
) {
	for (const element of array) {
		console.log("ELEMENT    ", element)
		if (element.hasOwnProperty("mediaUrl") && element.mediaUrl != '' && element.mediaUrl.startsWith(`data:`)) {
			const meidaUid = await handleMediaUpload(element);
			element.mediaUrl = meidaUid;
		} else {
			console.error(
				'No Image provided for reference' + element.name + '!'
			);
		}
		element.orderUid = orderUid;
	}
}

async function handleMediaUpload(media: any) {
	const buffer = objectUrlToBuffer(media.mediaUrl);

	const meidaUid = uuidv4();

	await uplaodToBucket(
		buffer,
		meidaUid,
		media.fileType,
		media.fileEnding,
		bucket,
		bucketFolders.marketplace
	);

	const mediaSrc = meidaUid;

	return mediaSrc;
}
