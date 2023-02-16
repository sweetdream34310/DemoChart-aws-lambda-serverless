import { Op } from 'sequelize';
import { OrderMedia } from './../shared/models/OrderMedia';
import { ServiceOfferOrder } from './../shared/models/ServiceOfferOrder';
import { Handler } from 'aws-lambda';
import {initDB} from '../shared/db';
import {
	badRequestReturn, genericResponse, startupRoutine, aBadRequestResponse, getPublicUrl
} from '../shared/helpers';
import { ServiceOffer } from '../shared/models/ServiceOffer';
import { Gig } from '../shared/models/Gig';
import { GigMedia } from '../shared/models/GigMedia';
import { bucketFolders } from '../shared/enums';
import { Seller } from '../shared/models/Seller';
import {getSellerOrBuyerConditionServiceOfferOrder} from '../shared/sharedQueries/isBuyerOrSeller';
import {ServiceOrderStatus} from "../../../lib/types/ServiceOrderStatus";

initDB();

export const handler: Handler = async (event, context, callback) => {
	startupRoutine(event);
	const userUid = event?.cognitoPoolClaims?.sub;
	const body: any = event?.body;

	const {condition} = await getSellerOrBuyerConditionServiceOfferOrder(userUid);

	const where = {
		[Op.and]: [
			{ orderStatus: { [Op.not]: ServiceOrderStatus.PLACED } },
			condition,
		]
	}

	try {
		const orders = await ServiceOfferOrder.findAll({
			order: [
				['createdAt', 'ASC']
			],
			where: where,
			include: [
				{
					model: ServiceOffer,
					include: [{
						model: Gig,
						attributes: ["name"],
						include: [{
							model: GigMedia,
							required: true
						}],
						required:true
					}],
					required: true
				},
				{
					model: OrderMedia,
					required: false
				}
			],
		});

		orders?.forEach(async order => {
			order?.serviceOffer?.gig?.gigMedias && order?.serviceOffer?.gig?.gigMedias.forEach(media => {
				if (media.mediaUrl != null && media.mediaUrl != "" && !media.mediaUrl.startsWith("https")) {
					media.mediaUrl = getPublicUrl(media.mediaUrl, bucketFolders.marketplace, "backend-s3buckets-dev-databucket-mnzmiczicq8f", media.isVideo)
				}
			});
			order?.orderMedias.forEach(media => {
				if (media.mediaUrl != null && media.mediaUrl != "" && !media.mediaUrl.startsWith("https")) {
					media.mediaUrl = getPublicUrl(media.mediaUrl, bucketFolders.marketplace, "backend-s3buckets-dev-databucket-mnzmiczicq8f", false, media.fileEnding)
				}
			})
		})

		return orders;
	} catch (e) {
		console.error(e);
		return aBadRequestResponse(callback, JSON.stringify(e));
	}
};
