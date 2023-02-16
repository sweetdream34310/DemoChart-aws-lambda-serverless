import { REFERENCE_PIC_WIDHT, REFERENCE_PIC_HEIGHT, fileTypeImg } from './../shared/config';

/*
		
im Gig ist seller id, dann fragen ob seller id zur userid gehört
wenn ja, dann weiter sonst 401

*/

import { Handler } from 'aws-lambda';
import {
	startupRoutine, anInternalErrorResponse, aBadRequestResponse,
} from '../shared/helpers';

import { initDB } from '../shared/db';
import { Gig } from "../shared/models/Gig";
import { Seller } from "../shared/models/Seller"

initDB();

const bucket = "backend-s3buckets-dev-databucket-mnzmiczicq8f";
export const handler: Handler = async (event: any, context: any, callback: any) => {
	startupRoutine(event);
	const userUid = event?.cognitoPoolClaims?.sub;
	const body: any = event?.body;
	const { gigUid } = body;

	try {
		let foundSeller = await Seller.findOne({ where: { userUid: userUid } });

		if (!foundSeller) {
			return aBadRequestResponse(callback, 'Seller not found');
		}

		const authenticatedId = foundSeller.uid;
	
		await Gig.destroy({
			where: {
				sellerUid: authenticatedId,
				uid : gigUid
			}
		});

	} catch (e) {
		return anInternalErrorResponse(callback, e);
	}
};
