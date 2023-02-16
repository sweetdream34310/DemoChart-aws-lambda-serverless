import { Handler } from 'aws-lambda';
import { initDB } from '../shared/db';
import { startupRoutine, } from '../shared/helpers';
import useGigsFinder from "./service/useGigsFinder";


initDB();

export const handler: Handler = async (event, context, callback) => {
	startupRoutine(event);
	const body: any = event?.body;
	const userUid = event?.cognitoPoolClaims?.sub;
	const { searchString, genres, categories, groupby, sellerUid, gigsPerPage, page } = body;
	return await useGigsFinder({ searchString, genres, categories, groupby, sellerUid, gigsPerPage, page, userUid }, callback);
};
