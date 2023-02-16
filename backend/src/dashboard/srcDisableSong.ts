import { Handler } from 'aws-lambda';
// DB
import { initDB } from '../shared/db';
import {
	aBadRequestResponse,
	anInternalError, anInternalErrorResponse,
	badRequestReturn,
	genericResponse,
	startupRoutine
} from '../shared/helpers';
import { User } from '../shared/models/User';
import {Song} from "../shared/models/Song";
initDB();

export const handler: Handler = async (event, context, callback) => {
	startupRoutine(event);


	const body = event?.body;
	if (!body.songUid || body.disable === undefined) {
		return aBadRequestResponse(callback,'No song or disable param given.');
	}

	try {
		const song = await Song.findOne(
			{ where: { uid: body.songUid } }
		);

		if (!song) {
			return aBadRequestResponse(callback, 'Song to disable/enable not found');
		}

		await Song.update(
			{ disabledByAdmin: body.disable },
			{ where: { uid: body.songUid }}
			);

		console.log(song);

		return genericResponse(true);
	} catch (e) {
		return anInternalErrorResponse(callback, e);
	}
};
