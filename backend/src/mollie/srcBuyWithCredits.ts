import { Handler } from 'aws-lambda';
import { startupRoutine, badRequestReturn } from '../shared/helpers';
import { BuyWithCredits } from 'typings/BuyWithCredits';
import { Song } from '../shared/models/Song';
import { initDB, sequelize } from '../shared/db';
import { User } from '../shared/models/User';
import { FRONTEND_URL } from '../shared/config';
initDB();

export const handler: Handler = async (event) => {
	startupRoutine(event);

	const uid = event?.cognitoPoolClaims?.sub;
	const body: BuyWithCredits = event?.body;
	const { songID } = body;

	const transaction = await sequelize.transaction();
	try {
		const song = await Song.findOne({ where: { uid: songID } });
		if (!song) {
			throw new Error(`No song found with uid ${uid}`);
		}

		if (song.paid) {
			throw new Error(`Song is already paid`);
		}

		const user = await User.findOne({ where: { uid } });
		if (!user) {
			throw new Error(`No user found with uid ${uid}`);
		}

		if (user.credits < 1) {
			throw new Error(`remaining credits not sufficient`);
		}

		await user.decrement('credits', { transaction });
		console.log(`Credits decreased`);

		song.paid = true;
		song.paymentDate = new Date();
		await song.save({ transaction });
		console.log('marked song as paid');
		await transaction.commit();

		return `${FRONTEND_URL}/mydmeos`;
	} catch (e) {
		await transaction.rollback();
		console.error(e);
		return badRequestReturn();
	}
};
