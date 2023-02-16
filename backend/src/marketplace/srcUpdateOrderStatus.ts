import {Handler} from 'aws-lambda';
import { Op } from 'sequelize';

import {aBadRequestResponse, anInternalErrorResponse, startupRoutine,} from '../shared/helpers';
import {initDB} from '../shared/db';

import {User} from '../shared/models/User';
import {Seller} from '../shared/models/Seller';
import {ServiceOffer} from '../shared/models/ServiceOffer';
import {Gig} from '../shared/models/Gig';
import {getSellerOrBuyerConditionServiceOfferOrder, isBuyer, isSeller} from '../shared/sharedQueries/isBuyerOrSeller';

import {ServiceOfferOrder} from '../shared/models/ServiceOfferOrder';
import {ServiceOrderStatus} from '../../../lib/types/ServiceOrderStatus';

initDB();

export const handler: Handler = async (
	event: any,
	context: any,
	callback: any
) => {
	startupRoutine(event);

	const body: { orderUid: string, status: string } = event?.body;
	const { orderUid, status } = body;
	const userUid = event?.cognitoPoolClaims?.sub;

	console.log("update order status: ", orderUid, status);

	try {
		if (!orderUid) {
			return aBadRequestResponse(callback, 'Bad Request');
		}

		const {condition, seller} = await getSellerOrBuyerConditionServiceOfferOrder(userUid);

		const where = {
			[Op.and]: [
				{ orderStatus: { [Op.not]: ServiceOrderStatus.PLACED } },
				{uid: orderUid},
				condition
			]
		}

		const serviceOfferOrder = await ServiceOfferOrder.findOne({
			where: where,
			include: {
				model: ServiceOffer,
				required: true,
			}
		});

		if (!serviceOfferOrder) {
			return aBadRequestResponse(
				callback,
				'service offer not found.'
			);
		}

		console.log("service offer order", JSON.stringify(serviceOfferOrder))

		const updateStatus = async(oderUid: string, status: string) => {
			const result = await ServiceOfferOrder.update(
				{orderStatus: status},
				{where: {uid: orderUid}});
		}

		if (isBuyer(userUid, serviceOfferOrder)) {
			console.log("user is Buyer");
			switch (status) {
				case ServiceOrderStatus.COMPLETED:
				case ServiceOrderStatus.CHANGES_REQUESTED:
					await updateStatus(orderUid, status);
					break;
				default:
					return aBadRequestResponse(
						callback,
						'user is not allowed to update service offer order state to: ' + status
					);
			}
		} else if (seller && isSeller(seller.uid, serviceOfferOrder)) {
			console.log("user is seller");
			switch (status) {
				case ServiceOrderStatus.CANCELED:
				case ServiceOrderStatus.IN_PROGRESS:
				case ServiceOrderStatus.READY_TO_REVIEW:
					await updateStatus(orderUid, status);
					break;
				default:
					return aBadRequestResponse(
						callback,
						'user is not allowed to update service offer order state to: ' + status
					);
			}
		} else {
			return aBadRequestResponse(
				callback,
				'user is not buyer or seller of order: ' + orderUid
			);
		}

		const updatedOrder = await ServiceOfferOrder.findOne({where: {uid: orderUid}});
		if (!updatedOrder || updatedOrder?.orderStatus !== status) {
			return aBadRequestResponse(
				callback,
				'not possible to update status to: ' + status
			);
		}

		console.log("updatedOrder: ", updatedOrder);
		return true;
	} catch (e) {
		return anInternalErrorResponse(callback, e);
	}
};
