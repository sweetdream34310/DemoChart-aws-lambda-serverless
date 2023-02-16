import { Handler } from 'aws-lambda';
import { badRequestReturn, startupRoutine } from '../shared/helpers';
import { Country } from '../shared/models/Country';
import { initDB } from '../shared/db';
initDB();

export const handler: Handler = async (event) => {
	startupRoutine(event);

	try {
		const countries = await Country.findAll();
		return countries.map((e) => [e.countryCode, e.name]);
	} catch (err) {
		console.error(err);
		return badRequestReturn();
	}
};
