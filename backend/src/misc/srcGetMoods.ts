import { Handler } from 'aws-lambda';
import { badRequestReturn, startupRoutine } from '../shared/helpers';
import { Mood } from '../shared/models/Mood';
import { initDB } from '../shared/db';
initDB();

export const handler: Handler = async (event) => {
	startupRoutine(event);

	try {
		const countries = await Mood.findAll();
		return countries.map((e) => [e.id, e.name]);
	} catch (err) {
		console.error(err);
		return badRequestReturn();
	}
};
