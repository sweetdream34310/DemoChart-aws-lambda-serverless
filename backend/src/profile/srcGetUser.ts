import { Handler } from 'aws-lambda';

// DB
import { initDB } from '../shared/db';
initDB();

// Models
import { User } from '../shared/models/User';
import {startupRoutine, getPublicUrl, aBadRequestResponse, anInternalErrorResponse} from '../shared/helpers';
import { Rating } from '../shared/models/Rating';
import {bucketFolders} from "../shared/enums";

export const handler: Handler = async (event, context, callback) => {
	startupRoutine(event);

	const uid = event?.cognitoPoolClaims?.sub;

	try {
		const user = await User.findOne({
			attributes: {
				exclude: [
					'createdAt',
					'updatedAt',
					'deletedAt',
					'deletedAt',
					'mollieCustomerID',
				],
			},
			where: { uid },
		});

		if (!user) return aBadRequestResponse(callback, `No user found with uid: ${uid}`);

		// get number of ratings in the last 24h
		/*SELECT COUNT(*)
		FROM Ratings r
		WHERE r.userUid = 'ca56e3c2-1144-4436-9449-24b19b9088b3'
		AND r.createdAt > DATE_SUB(CURDATE(), INTERVAL 1 DAY)*/

		const fucker = await Rating.findAndCountAll({
			where: {
				userUid: uid,
				// younger than 24 hours
				// createdAt: {
				// 	[Op.gt]: Sequelize.literal(
				// 		' DATE_SUB(CURDATE(), INTERVAL 1 DAY)'
				// 	),
				// },
			},
		});

		console.log(user);
		return {
			...user.toJSON(),
			ratings24H: fucker.count,
			profileImg: getPublicUrl(user.uid, bucketFolders.profilePic),
			profileHeader: getPublicUrl(user.uid, bucketFolders.profileHeader),
		};
	} catch (e) {
		return anInternalErrorResponse(callback, e);
	}
};
