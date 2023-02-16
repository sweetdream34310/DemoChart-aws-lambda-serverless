import { Handler } from 'aws-lambda';
import { BuyCredits } from 'typings/BuyCredits';
import { PRICING } from '../shared/config';
import { initDB, sequelize } from '../shared/db';
import { badRequestReturn, startupRoutine } from '../shared/helpers';
import { mollie } from '../shared/helpers/mollie';
import { Payment } from '../shared/models/Payment';
import { Song } from '../shared/models/Song';
import { User } from '../shared/models/User';
initDB();

export const handler: Handler = async (event) => {
	startupRoutine(event);

	const uid = event?.cognitoPoolClaims?.sub;
	const body: BuyCredits = event?.body;
	const { songID, plan } = body;

	const transaction = await sequelize.transaction();
	try {
		let song;
		if (songID) {
			song = await Song.findOne({
				where: { uid: songID },
			});

			if (!song) {
				throw new Error(`No song found with uid ${uid}`);
			}

			if (song.paid) {
				throw new Error(`Song is already paid`);
			}
			console.log(song);
		}

		const user = await User.findOne({
			where: { uid },
		});

		if (!user) {
			throw new Error(`No user found with uid ${uid}`);
		}
		console.log(user);

		let customerId = user.mollieCustomerID;
		if (!customerId) {
			// create a mollie customer if non exists
			const { id } = await mollie.createCustomer(user.email, user.name);
			customerId = id;

			user.mollieCustomerID = customerId;
			await user.save({ transaction });
		}

		const { credits, ...amount } = PRICING[plan][0];

		console.log(amount);

		const payment = await mollie.createPayment(amount, customerId);
		console.log(payment);
		console.log('payment created');

		await Payment.create(
			{
				userUid: uid,
				molliePaymentID: payment.id,
				method: payment.method,
				status: payment.status,
				amount: payment.amount.value,
				currency: payment.amount.currency,
				songUid: song?.uid,
				credits,
			},
			{ transaction }
		);
		console.log('added open payment to DB');
		await transaction.commit();

		return payment.getCheckoutUrl();
	} catch (e) {
		await transaction.rollback();
		console.error(e);
		return badRequestReturn();
	}
};
