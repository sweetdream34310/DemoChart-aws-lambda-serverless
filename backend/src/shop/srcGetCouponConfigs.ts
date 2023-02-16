import { Handler } from 'aws-lambda';
// DB
import { initDB } from '../shared/db';
import { startupRoutine } from '../shared/helpers';
import { Coupon } from "../shared/models/Coupon";
initDB();

export const handler: Handler = async (event) => {
	startupRoutine(event);

	try {
		const entry = await Coupon.findAll({
			attributes: [
				"uid",
				"name",
				"discount",
				"type",
				"product",
			],
		});

		if (entry) {
			return entry;
		}
	} catch (e: any) {
		return 'Maximus: error was occured!';
	}
};
