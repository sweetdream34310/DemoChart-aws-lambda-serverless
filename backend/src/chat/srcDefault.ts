import { Handler } from 'aws-lambda';
import { startupRoutine, badRequestReturn } from '../shared/helpers';

import { WsClient } from './helpers';

export const handler: Handler = async (event) => {
	startupRoutine(event);

	const connectionId = event.requestContext.connectionId;
	const client = new WsClient();

	try {
		await client.send(connectionId, {
			message: 'Dude stop it!',
		});

		return {
			statusCode: 200,
		};
	} catch (e) {
		console.error(e);
		return badRequestReturn();
	}
};
