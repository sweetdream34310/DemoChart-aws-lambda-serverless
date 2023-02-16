import { ServiceOffer } from './../shared/models/ServiceOffer';
import { GigMedia } from './../shared/models/GigMedia';
import { Handler } from 'aws-lambda';
import { Seller } from '../shared/models/Seller';
import { aBadRequestResponse, anInternalErrorResponse, } from '../shared/helpers';
import { initDB } from '../shared/db';
import {
    startupRoutine, getPublicUrl
} from '../shared/helpers';
import { Gig } from '../shared/models/Gig';
import { bucketFolders } from '../shared/enums';
import {SavedGigs} from "../shared/models/SavedGigs";
import useGigsFinder from "./service/useGigsFinder";

initDB();

// export const handler: Handler = async (event, context, callback) => {
//     startupRoutine(event);
// 	const userUid = event?.cognitoPoolClaims?.sub;
//
//     const body: any = event?.body;
//     const { page } = body;
//
//     try {
//         const savedGigs = await Gig.findAll({
//             limit: 12,
//             offset: (page+1 - 1) * 12,
//             include: [{
//                 model: SavedGigs,
//                 // through: {
//                 where: {
//                     userUid: userUid
//                 }
//                 // }
//             }],
//             // include: [{
//             //     model: SavedGigs,
//             //     attributes: ["userUid"],
//             //     required: false,
//             //     where: {
//             //         userUid: userUid,
//             //     }
//             // }],
//             // where: {
//             //     userUid
//             // },
//         });
//         return savedGigs;
//     } catch (error) {
//         return anInternalErrorResponse(callback, error);
//     }
// };



export const handler: Handler = async (event, context, callback) => {
    startupRoutine(event);
    const body: any = event?.body;
    const userUid = event?.cognitoPoolClaims?.sub;
    const { gigsPerPage, page } = body;
    return await useGigsFinder({ gigsPerPage, page, userUid, showSavedGigsOnly: true }, callback);
};
