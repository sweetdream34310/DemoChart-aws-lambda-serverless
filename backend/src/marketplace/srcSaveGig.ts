import { Handler } from 'aws-lambda';
import { aBadRequestResponse, anInternalErrorResponse, startupRoutine, } from '../shared/helpers';
import { initDB } from '../shared/db';

import { ServiceOffer } from '../shared/models/ServiceOffer';
import { Gig } from '../shared/models/Gig';

// @ts-ignore
import { ServiceOfferOrder } from '../shared/models/ServiceOfferOrder';
import { ServiceOrderStatus } from '../../../lib/types/ServiceOrderStatus'
import {SavedGigs} from "../shared/models/SavedGigs";


initDB();

export const handler: Handler = async (
    event: any,
    context: any,
    callback: any
) => {
    startupRoutine(event);
	const userUid = event?.cognitoPoolClaims?.sub;
    
    const  body: { gigUid : string } = event?.body;
    const { gigUid } = body;

    const saveGig = await SavedGigs.findOne({ where: { gigUid }});
    if (saveGig) {
        await SavedGigs.destroy({ where: { gigUid } });
        return { removed: true }
    } else {
        await SavedGigs.create({
            userUid, gigUid 
        });
        return { added: true }
    }
}