import { Handler } from 'aws-lambda';
import {
	startupRoutine, aNotFoundResponse, anInternalErrorResponse, aBadRequestResponse,
} from '../shared/helpers';
import {initDB, sequelize} from '../shared/db';

import { User } from '../shared/models/User';
import {FilterSongs} from "../../typings/FilterSongs";
import {UserSelectors} from "../shared/helpers/PublicSelectors/UserSelectors";
import {Product} from "../shared/models/Product";
initDB();

export const handler: Handler = async (event: any, context: any, callback: any) => {
	startupRoutine(event);
	const uid = event?.cognitoPoolClaims?.sub;
	const productId = event.path?.productId;


	try {
		let products;

		products = await Product.findAll({
			attributes: [
				"uid",
				"name",
				"imageUrl",
				"description",
				"brand",
				"category",
				"price",
				"priceOld",
				"countInStock",
				"rating",
				"numReviews",
				"tags",
				"copiesSold",
				"copiesAvailable",
				"songFile",
				"songUrl",
				"songBy",
				"songDescription",
				"songTags",
				"isBump",
				"bumpPrice",
			],
		});

		if (!products) return aNotFoundResponse(callback, 'No product found for this user with this filter');

		return products;

	} catch (e) {
		return anInternalErrorResponse(callback, e);
	}
};
