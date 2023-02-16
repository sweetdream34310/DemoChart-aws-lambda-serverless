import { Handler } from 'aws-lambda';
import { badRequestReturn, startupRoutine } from '../shared/helpers';
import { Genre } from '../shared/models/Genre';
import { initDB } from '../shared/db';
initDB();

export const handler: Handler = async (event) => {
	startupRoutine(event);

	try {
		const countries = await Genre.findAll();
		return countries.map((e) => [e.id, e.name]);
	} catch (err) {
		console.error(err);
		return badRequestReturn();
	}
};
