import { Handler } from 'aws-lambda';
// DB
import { initDB } from '../shared/db';
import {anInternalError, genericResponse, startupRoutine} from '../shared/helpers';
import {AdminConfigs} from "../shared/models/AdminConfigs";
initDB();

export const handler: Handler = async (event) => {
	startupRoutine(event);

	try {
		const entry = await AdminConfigs.findAll();

		return entry;
	} catch (e: any) {
		return anInternalError(e);
	}
};
