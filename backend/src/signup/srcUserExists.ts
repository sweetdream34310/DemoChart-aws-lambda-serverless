import { Handler } from 'aws-lambda';
import {anInternalErrorResponse, badRequestReturn, startupRoutine} from '../shared/helpers';

import AWS from 'aws-sdk';
import { AdminGetUserRequest } from 'aws-sdk/clients/cognitoidentityserviceprovider';
import { USER_POOL_ID } from '../shared/config';
import {User} from "../shared/models/User";
import {initDB} from "../shared/db";
initDB();

export const handler: Handler = async (event) => {
	startupRoutine(event);

	const emailToFind = event?.body.mail;

	const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider();
	// Promisify callback because it no work :(

	// const adminGetUserPromise = (params: AdminGetUserRequest) => {
	// 	return new Promise((resolve, reject) => {
	// 		cognitoIdentityServiceProvider.adminGetUser(params, (err, data) => {
	// 			if (err) return reject(err);
	// 			resolve(data);
	// 		});
	// 	});
	// };

	try {
		// const foundUser = await adminGetUserPromise({
		// 	Username: emailToFind,
		// 	UserPoolId: USER_POOL_ID,
		// });


		const foundUser = await User.findOne({ where: { email: emailToFind } });

		// const user = await User.findOne({
		// 	where: { email: emailToFind },
		// });

		console.log("FOUND USER for email " + emailToFind + "? " + !!foundUser, USER_POOL_ID);
		if (foundUser) {
			return { exists: true};
		} else {
			return { exists: false};
		}
	} catch (e) {
		console.error(e)
		return anInternalErrorResponse(e);
		// console.error(e);
		// return false;
	}

	// return badRequestReturn();
};
