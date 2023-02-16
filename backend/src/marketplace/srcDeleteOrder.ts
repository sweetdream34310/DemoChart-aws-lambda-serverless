import { ServiceOfferOrder } from './../shared/models/ServiceOfferOrder';
import { Handler } from 'aws-lambda';
import {
	startupRoutine, anInternalErrorResponse, aBadRequestResponse,
} from '../shared/helpers';

import { initDB } from '../shared/db';
initDB();

export const handler: Handler = async (event: any, context: any, callback: any) => {
	startupRoutine(event);
	const body: any = event?.body;
	const { orderUid } = body;

	try {
		await ServiceOfferOrder.destroy({
			where: {
				uid: orderUid,
			}
		});

	} catch (e) {
		return anInternalErrorResponse(callback, e);
	}
};
