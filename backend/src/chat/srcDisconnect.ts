import { Handler } from 'aws-lambda';
import {startupRoutine, genericResponse, anInternalError} from '../shared/helpers';
import { initDB } from '../shared/db';
import {User} from "../shared/models/User";

initDB();

export const handler: Handler = async (event) => {
	startupRoutine(event);

	const uid = event.requestContext.authorizer.uid;

	try {
		await User.update(
			{
				wsSessionId: null,
			},
			{ where: { uid } }
		);


		return {
			statusCode: 200,
		};
	} catch (e) {

		return {
			statusCode: 500,
		};

	}
};
