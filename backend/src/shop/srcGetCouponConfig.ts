import { Handler } from 'aws-lambda';
// DB
import { initDB } from '../shared/db';
import { anInternalError, startupRoutine } from '../shared/helpers';
import { Coupon } from "../shared/models/Coupon";
initDB();

export const handler: Handler = async (event) => {
	startupRoutine(event);

	const body: any = event?.body;
	const { name } = body;

	try {
		const entry = await Coupon.findOne({
			where: {
				name
			}
		});

		if (entry) {
			return entry;
		}
	} catch (e: any) {
		return anInternalError(e);
	}
};
