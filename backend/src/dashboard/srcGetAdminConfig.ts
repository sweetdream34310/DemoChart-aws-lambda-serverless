import { Handler } from 'aws-lambda';
// DB
import { initDB } from '../shared/db';
import {anInternalError, badRequestReturn, startupRoutine} from '../shared/helpers';
import {AdminConfigs} from "../shared/models/AdminConfigs";
initDB();

export const handler: Handler = async (event) => {
	startupRoutine(event);

	const body: any = event?.body;
	const { key } = body;

	try {
		const entry = await AdminConfigs.findOne({
			where: {
				key
			}
		});

		if (entry){
			return entry.value;
		}
		return badRequestReturn(`No config found with '${key}' key`);
	} catch (e: any) {
		return anInternalError(e);
	}
};
