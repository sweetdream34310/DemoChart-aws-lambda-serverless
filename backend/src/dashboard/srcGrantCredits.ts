import { Handler } from 'aws-lambda';
// DB
import { initDB } from '../shared/db';
import {anInternalError, badRequestReturn, genericResponse, startupRoutine} from '../shared/helpers';
import { User } from '../shared/models/User';
initDB();

export const handler: Handler = async (event) => {
	startupRoutine(event);


	const body = event?.body;
	if (!body.email || !body.credits) {
		return badRequestReturn('No email given');
	}

	try {
		const user = await User.findOne(
			{ where: { email: body.email } }
		);

		if (!user) {
			return badRequestReturn('User not found');
		}

		await User.update(
			{ credits: (user.credits + body.credits)},
			{ where: { email: body.email }}
			);

		console.log(user);

		return genericResponse(true);
	} catch (e: any) {
		return anInternalError(e);
	}
};
