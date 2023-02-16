import { Handler } from 'aws-lambda';
import {
	startupRoutine, aNotFoundResponse, anInternalErrorResponse, aBadRequestResponse,
} from '../shared/helpers';
import {initDB, sequelize} from '../shared/db';

import { User } from '../shared/models/User';
import {UserSelectors} from "../shared/helpers/PublicSelectors/UserSelectors";
import {Product} from "../shared/models/Product";
initDB();

export const handler: Handler = async (event: any, context: any, callback: any) => {
	startupRoutine(event);
	const uid = event?.cognitoPoolClaims?.sub;

	const productId = event.path?.productId;

	// await sequelize.sync({ alter: true });

	return aBadRequestResponse(callback, 'This route is inactive.');

	try {
		let product;

		if (!productId) {
			return aBadRequestResponse(callback, JSON.stringify(event)+'No Product ID given')
		}

		product = await Product.findOne({
			where: { name: productId },
		});

		if (!product) return aNotFoundResponse(callback, 'No product found for this user with this filter');

		return product;

	} catch (e) {
		return anInternalErrorResponse(callback, e);
	}
};
