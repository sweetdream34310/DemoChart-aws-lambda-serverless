import { PaymentStatus } from '@mollie/api-client';
import { Handler } from 'aws-lambda';
import { initDB, sequelize } from '../shared/db';
import { badRequestReturn } from '../shared/helpers';
import { mollie } from '../shared/helpers/mollie';
import { Payment } from '../shared/models/Payment';
import { Song } from '../shared/models/Song';
import { User } from '../shared/models/User';
import { sendInvoice } from './helper';
initDB();

export const handler: Handler = async (event) => {
	console.log(event);
	const { id: paymentId } = event.body;

	if (!paymentId) {
		return badRequestReturn();
	}

	const transaction = await sequelize.transaction();
	try {
		console.log('Handling payment with id ', paymentId);

		const { id: molliePaymentID, status } = await mollie.getPayment(
			paymentId
		);

		const payment = await Payment.findOne({
			where: { molliePaymentID },
		});

		if (!payment) {
			throw new Error(
				`Payment with mollieID ${molliePaymentID} not found`
			);
		}
		const { userUid, credits: boughtCredits } = payment;

		const user = await User.findOne({
			where: { uid: userUid },
		});

		if (!user) {
			throw new Error(`No user found with uid ${userUid}`);
		}

		switch (status) {
			case PaymentStatus.paid:
				{
					payment.status = status;
					await payment.save({ transaction });
					console.log('payment status updated');

					// Update credits
					await user.increment('credits', {
						by: boughtCredits,
						transaction,
					});
					console.log('credits updated');

					// Mark song as paid
					if (payment.songUid) {
						const song = await Song.findOne({
							where: { uid: payment.songUid },
						});

						if (!song) {
							throw new Error(
								`No song found with uid ${userUid}`
							);
						}

						await user.decrement('credits', { transaction });
						console.log(`Credits decreased`);

						song.paid = true;
						song.paymentDate = new Date();
						await song.save({ transaction });
						console.log('marked song as paid');
						await transaction.commit();

						// Send invoice
						await sendInvoice({
							id: payment.uid,
							email: user.email,
							credits: boughtCredits,
							name: user.name,
							amount: payment.amount,
							currency: payment.currency,
						});
					}
				}
				break;

			default:
				{
					//TODO send email
				}
				break;
		}

		return true;
	} catch (e) {
		await transaction.rollback();
		console.error(e);
		return badRequestReturn();
	}
};
