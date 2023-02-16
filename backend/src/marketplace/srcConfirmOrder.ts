import {Handler} from 'aws-lambda';
import {aBadRequestResponse, anInternalErrorResponse, startupRoutine,} from '../shared/helpers';
import {initDB} from '../shared/db';
import {ServiceOfferOrder} from '../shared/models/ServiceOfferOrder';
import {ServiceOrderStatus} from './../../../lib/types/ServiceOrderStatus';
import {confirmOrder} from './../shared/paypal/confirmOrder';

initDB();

/**
 * Uses orderId to ask paypal for current state.
 * If state is completed, update order in database.
 * Otherwise, return an error
 */
export const handler: Handler = async (
	event: any,
	context: any,
	callback: any
) => {
	startupRoutine(event);
	// const uid = event?.cognitoPoolClaims?.sub;

	const body: any = event?.body;
	const { paypalOrderId } = body;

	console.log("confirmOrder: " + paypalOrderId);

	try {
		if (!paypalOrderId) {
			return aBadRequestResponse(callback, 'Bad Request');
		}

		const captureStatus = await confirmOrder(paypalOrderId);

		if (captureStatus === 'COMPLETED') {
			await ServiceOfferOrder.update(
				{
					orderStatus: ServiceOrderStatus.PAID,
				},
				{ where: { paypalOrderId } }
			);

			const updatedOrder = await ServiceOfferOrder.findOne({
				where: { paypalOrderId }
			});

			if (updatedOrder) {
				console.log(
					'service offer',
					JSON.stringify(updatedOrder)
				);

				return { order: updatedOrder };
			} else {
				return anInternalErrorResponse(
					callback,
					'Updated service offer order not found.'
				);
			}
		} else {
			return aBadRequestResponse(callback, 'Service offer order not completed yet.');
		}
	} catch (e) {
		return anInternalErrorResponse(callback, e);
	}
};
