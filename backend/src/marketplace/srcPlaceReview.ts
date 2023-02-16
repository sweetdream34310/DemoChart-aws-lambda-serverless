import { Handler } from 'aws-lambda';
import { aBadRequestResponse, anInternalErrorResponse, startupRoutine, } from '../shared/helpers';
import { initDB } from '../shared/db';

import { ServiceOffer } from '../shared/models/ServiceOffer';
import { Gig } from '../shared/models/Gig';

// @ts-ignore
import { ServiceOfferOrder } from '../shared/models/ServiceOfferOrder';
import { ServiceOrderStatus } from '../../../lib/types/ServiceOrderStatus'
import { includes } from 'lodash';
import {GigReview} from "../shared/models/GigReview";

initDB();

export const handler: Handler = async (
    event: any,
    context: any,
    callback: any
) => {
    startupRoutine(event);
    const userUid = event?.cognitoPoolClaims?.sub;

    const body: {
        serviceOfferOrderUid: string,
        ratingGeneral: number,
        ratingCommunication: number,
        ratingDescribedService: number,
        ratingResellRecommendation: number,
        description: string
    } = event?.body;

    const { serviceOfferOrderUid, ratingGeneral, ratingCommunication, ratingDescribedService, ratingResellRecommendation, description } = body;

    const serviceOfferOrder = await ServiceOfferOrder.findOne({
        where: { uid: serviceOfferOrderUid },
        include: {
            model: ServiceOffer
        }
    });

    // get gig uid from service offer order uid
    const gigUid = serviceOfferOrder?.serviceOffer.gigUid

    // need to be dealt with Exceptions
    if (serviceOfferOrder?.buyerUid !== userUid)
        console.error('This order is not made by the reviewer');
    if (serviceOfferOrder?.orderStatus !== ServiceOrderStatus.COMPLETED)
        console.error('The order is not completed for leaving reviews');

    // calculate rating average
    const ratingAverage = (ratingGeneral + ratingCommunication + ratingDescribedService + ratingResellRecommendation) / 4;

    // create the new review of service offer
    const newReview = await GigReview.create({
        userUid,
        description,
        ratingGeneral,
        ratingCommunication,
        ratingDescribedService,
        ratingResellRecommendation,
        ratingAverage
    });

    let averageRating = 0;

    const count = await GigReview.count({ where: { gigUid } })

    if (count == 0) {
        averageRating = ratingAverage
    } else {

        const gig = await Gig.findOne({
            where: { uid: gigUid }
        });

        if (gig?.averageRating !== undefined ) {
            const gigReivews = await GigReview.findAll({ where: { gigUid } });
            
        } else {
            averageRating = ((count * gig?.averageRating!) + ratingAverage) / (count + 1)
        }

    }

    // update average rating of the gig
    await Gig.update(
        {
            averageRating
        },
        {
            where: { gigUid }
        }
    )

    return newReview;
}