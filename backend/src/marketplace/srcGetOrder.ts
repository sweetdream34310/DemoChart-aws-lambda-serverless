import {Handler} from 'aws-lambda';
import {aBadRequestResponse, anInternalErrorResponse, startupRoutine,} from '../shared/helpers';
import {initDB} from '../shared/db';
import {ServiceOffer} from '../shared/models/ServiceOffer';
import {Gig} from '../shared/models/Gig';
import {getSellerOrBuyerConditionServiceOfferOrder} from '../shared/sharedQueries/isBuyerOrSeller'

import {ServiceOfferOrder} from '../shared/models/ServiceOfferOrder';
import {ServiceOrderStatus} from '../../../lib/types/ServiceOrderStatus';
import {Op} from 'sequelize';
import {GigMedia} from "../shared/models/GigMedia";
import {OrderMedia} from "../shared/models/OrderMedia";

initDB();

export const handler: Handler = async (
	event: any,
	context: any,
	callback: any
) => {
	startupRoutine(event);

	const body: { orderUid: string } = event?.body;
	const { orderUid } = body;
	const userUid = event?.cognitoPoolClaims?.sub;

	console.log("update order status: ", orderUid);

	try {
		if (!orderUid) {
			return aBadRequestResponse(callback, 'Bad Request');
		}

		const {condition} = await getSellerOrBuyerConditionServiceOfferOrder(userUid);

		const where = {
			[Op.and]: [
				{ orderStatus: { [Op.not]: ServiceOrderStatus.PLACED } },
				{uid: orderUid},
				condition
			]
		}

		console.log("Where?", where);
		console.log("Where?", userUid);

		const serviceOfferOrder = await ServiceOfferOrder.findOne({
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
							required: true
						}],
						required: true
					},
					{
						model: OrderMedia,
						required: false
					}
				]
			}
		);

		if (!serviceOfferOrder) {
			return aBadRequestResponse(
				callback,
				'service offer not found.'
			);
		}

		console.log("service offer order", JSON.stringify(serviceOfferOrder))
		return serviceOfferOrder;
	} catch (e) {
		return anInternalErrorResponse(callback, e);
	}
};
