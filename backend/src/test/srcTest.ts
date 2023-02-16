import { Handler } from 'aws-lambda';
import { badRequestReturn, startupRoutine } from '../shared/helpers';
import { USER_POOL_ID } from '../shared/config';
import { initDB, sequelize } from '../shared/db';

import AWS, { CognitoIdentity } from 'aws-sdk';
import { AdminGetUserRequest } from 'aws-sdk/clients/cognitoidentityserviceprovider';

initDB();

export const handler: Handler = async (event) => {
	startupRoutine(event);

	const uid = event?.cognitoPoolClaims?.sub;

	console.log('hi from main before admingetuser');

	const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider();
	console.log(cognitoIdentityServiceProvider);

	/*const adminGetUserPromise = util.promisify(
		cognitoIdentityServiceProvider.adminGetUser
	);*/

	const adminGetUserPromise = (params: AdminGetUserRequest) => {
		return new Promise((resolve, reject) => {
			cognitoIdentityServiceProvider.adminGetUser(params, (err, data) => {
				if (err) return reject(err);
				resolve(data);
			});
		});
	};

	let x = await adminGetUserPromise({
		Username: 'wesapa@gmail.com',
		UserPoolId: USER_POOL_ID,
	});

	console.log('hi from main after admingetuser');

	/*let temp = cognitoIdentityServiceProvider.adminGetUser(
		{
			Username: 'wesapa@gmail.com',
			UserPoolId: USER_POOL_ID,
		} ,
		function (err, data) {
			console.log('hi from callback');
			if (err) console.log(err, err.stack);
			// an error occurred
			else console.log(data); // successful response
		}
	);*/

	return x;

	/*try {
		const song = await Song.findOne({
			attributes: {
				exclude: [
					'updatedAt',
					'deletedAt',
					'deletedAt',
					'mollieCustomerID',
				],
			},
			where: { uid: '4b4b8cf4-1a9c-4544-b956-4b57861e6160' },
			include: [
				{
					model: User,
					as: 'haveRated',
					include: [
						{
							model: Rating,
							as: 'ratedSongs',
							where: {
								songUid: '4b4b8cf4-1a9c-4544-b956-4b57861e6160',
							},
						},
					],
				},
			],
		});

		if (!song) {
			return badRequestReturn();
		}

		return song;
	} catch (e) {
		console.error(e);
		return badRequestReturn();
	}*/

	return badRequestReturn();
};
