import { Handler } from 'aws-lambda';

// DB
import { initDB } from '../shared/db';
initDB();

// Models
import { startupRoutine, badRequestReturn } from '../shared/helpers';
import { UpdateProfile } from 'typings/UpdateProfile';
import { User } from '../shared/models/User';
import { Op } from 'sequelize';

export const handler: Handler = async (event) => {
	startupRoutine(event);

	const uid = event?.cognitoPoolClaims?.sub;
	const body: UpdateProfile = event?.body;
	const { name } = body;

	try {
		const user = await User.findOne({
			where: {
				[Op.and]: [{ name }, { uid: { [Op.not]: uid } }],
			},
		});

		return { success: !user };
	} catch (e) {
		console.error(e);
		return badRequestReturn();
	}
};
