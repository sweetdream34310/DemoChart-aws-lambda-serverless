import { Handler } from 'aws-lambda';
import {
	startupRoutine, aNotFoundResponse, anInternalErrorResponse, aBadRequestResponse,
} from '../shared/helpers';
import {initDB, sequelize} from '../shared/db';

import { User } from '../shared/models/User';
import {FilterSongs} from "../../typings/FilterSongs";
import {UserSelectors} from "../shared/helpers/PublicSelectors/UserSelectors";
import {Order} from "../shared/models/Order";
import {Product} from "../shared/models/Product";
import {ProductOrder} from "../shared/models/ProductOrder";
import {ProfileListItem} from "../shared/models/ProfileListItem";
initDB();

export const handler: Handler = async (event: any, context: any, callback: any) => {
	startupRoutine(event);

	try {
		let orders;

		orders = await Order.findAll({
			order: [
				['createdAt', 'ASC']
			],
			include: [
				{
					model: ProductOrder,
					include: [{
						model: Product
					}]
				}
			]
		});

		if (!orders) return aNotFoundResponse(callback, 'No order found for this user with this filter');

		return orders;

	} catch (e) {
		return anInternalErrorResponse(callback, e);
	}
};
