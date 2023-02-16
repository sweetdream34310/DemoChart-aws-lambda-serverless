import { Handler } from 'aws-lambda';
import { initDB } from '../shared/db';
import { anInternalErrorResponse, startupRoutine } from '../shared/helpers';
import { Coupon } from "../shared/models/Coupon";
initDB();

export const handler: Handler = async (event: any, context: any, callback: any) => {
	startupRoutine(event);

	const body: any = event?.body;
	const { uid, name, type, discount, product } = body;

	try {
		let couponConfig = await Coupon.upsert({
			uid,
			name,
			type,
			discount,
			product
		});

		return couponConfig;

	} catch (e) {
		return anInternalErrorResponse(callback, e);
	}
};
