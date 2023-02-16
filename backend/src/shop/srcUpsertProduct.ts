import { Handler } from 'aws-lambda';
import {
	startupRoutine, anInternalErrorResponse,
} from '../shared/helpers';
import { initDB } from '../shared/db';
import {Product} from "../shared/models/Product";
initDB();

export const handler: Handler = async (event: any, context: any, callback: any) => {
	startupRoutine(event);

	const body: any = event?.body;
	const { uid, name, imageUrl, description, brand, category, price, priceOld, countInStock, rating, numReviews, tags, copiesSold, copiesAvailable, songFile, songUrl, songBy, songDescription, songTags, isBump, bumpPrice, downloadLink, active } = body;

	try {
		let product = await Product.upsert({
			uid,
			name,
			imageUrl,
			description,
			brand,
			category,
			price,
			priceOld,
			countInStock,
			rating,
			numReviews,
			tags,
			copiesSold,
			copiesAvailable,
			songFile,
			songUrl,
			songBy,
			songDescription,
			songTags,
			isBump,
			bumpPrice,
			downloadLink,
			active,
		});

		return product;

	} catch (e) {
		return anInternalErrorResponse(callback, e);
	}
};
