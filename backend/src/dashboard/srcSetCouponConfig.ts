import { Handler } from 'aws-lambda';
// DB
import { initDB } from '../shared/db';
import { anInternalError, genericResponse, startupRoutine } from '../shared/helpers';
import { Coupon } from "../shared/models/Coupon";
initDB();

export const handler: Handler = async (event) => {
	startupRoutine(event);


	const body: any = event?.body;
	const { name, discount, type, product } = body;

	try {

		await Coupon.create({
			name, discount, type, product
		})

		return genericResponse();
	} catch (e: any) {
		return anInternalError(e);
	}
};
