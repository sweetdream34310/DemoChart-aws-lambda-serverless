import { Handler } from 'aws-lambda';
import {initDB} from '../shared/db';
import {
	badRequestReturn, genericResponse, startupRoutine, aBadRequestResponse
} from '../shared/helpers';
import {SubmitFeedback} from "../../typings/SubmitFeedback";
import { Seller } from '../shared/models/Seller';

initDB();

export const handler: Handler = async (event, context, callback) => {
	startupRoutine(event);

	try {
		const sellers = await Seller.findAll({
			// where: {
			// 	approvedByAdmin: true,
			// 	activeSeller: true
			// }
		});

		// only return if activ && approved by admin
		console.log("Seller: ",sellers);
		return sellers;
	} catch (e) {
		console.error(e);
		return aBadRequestResponse(callback, JSON.stringify(e));
	}
};
