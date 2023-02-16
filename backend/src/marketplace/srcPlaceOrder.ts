import {Handler} from 'aws-lambda';
import {aBadRequestResponse, anInternalErrorResponse, startupRoutine,} from '../shared/helpers';
import {initDB} from '../shared/db';

import {User} from '../shared/models/User';
import {ServiceOffer} from '../shared/models/ServiceOffer';
import {Gig} from '../shared/models/Gig';

// @ts-ignore
import {ServiceOfferOrder} from '../shared/models/ServiceOfferOrder';
import {placeOrder} from '../shared/paypal/placeOrder';
import {ServiceOrderStatus} from '../../../lib/types/ServiceOrderStatus'

initDB();

export const handler: Handler = async (
	event: any,
	context: any,
	callback: any
) => {
	startupRoutine(event);

	const body: { serviceOfferUid: string, orderDue: number } = event?.body;
	const { serviceOfferUid, orderDue } = body;
	const userUid = event?.cognitoPoolClaims?.sub;

	console.log("place order service offer: ", serviceOfferUid, orderDue);

	try {
		if (!serviceOfferUid) {
			return aBadRequestResponse(callback, 'Bad Request');
		}

		let user = await User.findOne({where: { uid: userUid }});
		console.log("user: " + JSON.stringify(user));

		const serviceOffer = await ServiceOffer.findOne({
			where: { uid: serviceOfferUid },
			include: {
				model: Gig
			}});

		if (!serviceOffer) {
			return aBadRequestResponse(
				callback,
				'service offer not found.'
			);
		}

		console.log("service offer", JSON.stringify(serviceOffer))

		let invoiceAmount = serviceOffer.offerPrice;
		const currency = 'USD';

		const paypalOrderId = await placeOrder(invoiceAmount, currency);

		console.log("paypal order id: ", paypalOrderId);

		const paypalOrderIdExists = await ServiceOfferOrder.findOne({
			where: { paypalOrderId: paypalOrderId },
		});
		if (paypalOrderIdExists) {
			return anInternalErrorResponse(
				callback,
				'Order with existing paypal id created twice. ' + paypalOrderId
			);
		}

		const orderDateObj = new Date();
		const orderDateString = orderDateObj.toISOString();
		orderDateObj.setDate(orderDateObj.getDate() + orderDue);
		const orderDueString = orderDateObj.toISOString();

		let serviceOfferOrder: any = await ServiceOfferOrder.create({
			paypalOrderId: paypalOrderId,
			orderPrice: serviceOffer.offerPrice,
			orderDate: orderDateString,
			orderDue: orderDueString,
			orderStatus: ServiceOrderStatus.PLACED,
			buyerUid: user && user.uid,
			sellerUid: serviceOffer.gig.sellerUid,
			serviceOffer: serviceOffer,
			serviceOfferUid: serviceOfferUid,
		});

		return paypalOrderId;
	} catch (e) {
		return anInternalErrorResponse(callback, e);
	}
};
