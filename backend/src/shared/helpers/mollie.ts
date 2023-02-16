import {
  createMollieClient,
  Customer,
  Payment,
  PaymentMethod
} from '@mollie/api-client';
import { MOLLIE } from '../config';

export const client = createMollieClient({ apiKey: MOLLIE.API_KEY });

async function createCustomer(email: string, name: string): Promise<Customer> {
	return client.customers
		.create({
			email,
			name,
		})
		.catch((err) => {
			console.error(err);
			throw new Error(`Couldn't create mollie customer.`);
		});
}

async function getPayment(id: string): Promise<Payment> {
	return client.payments.get(id).catch((err) => {
		console.error(err);
		throw new Error(`Couldn't get mollie payment with id ${id}`);
	});
}

async function createPayment(
	amount: { value: string; currency: string },
	customerId: string,
	metadata?: any
): Promise<Payment> {
	return client.payments
		.create({
			amount,
			customerId,
			description: 'democharts | Thank you for your purchase',
			redirectUrl: MOLLIE.RETURN_URL,
			webhookUrl: MOLLIE.WEBHOOK_URL,
			metadata,
			method: [PaymentMethod.paypal],
		})
		.catch((err) => {
			console.error(err);
			throw new Error(
				`Couldn't create payment for customer ${customerId}`
			);
		});
}

export const mollie = {
	createCustomer,
	createPayment,
	getPayment,
};
