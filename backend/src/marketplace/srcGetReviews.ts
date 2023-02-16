import { ServiceOffer } from './../shared/models/ServiceOffer';
import { GigMedia } from './../shared/models/GigMedia';
import { Handler } from 'aws-lambda';
import { Seller } from '../shared/models/Seller';
import {
	aBadRequestResponse,
	anInternalErrorResponse,
	startupRoutine,
    getPublicUrl,
} from '../shared/helpers';
import { initDB } from '../shared/db';
import { Gig } from '../shared/models/Gig';
import { bucketFolders } from '../shared/enums';
import {GigReview} from "../shared/models/GigReview";


initDB();

export const handler: Handler = async (event, context, callback) => {
	startupRoutine(event);

	const body: any = event?.body;
	const { gigUid, reviewsPerPage, page } = body;

	const offset = reviewsPerPage * (page - 1);

	try {
		// 8 pages as default
		const gigReivews = await GigReview.findAll({
			where: {
				gigUid,
			},
			limit: 8,
			offset,
		});
		
		return gigReivews;
	} catch (error) {
		return anInternalErrorResponse(callback, error);
	}
};
