import {Handler} from 'aws-lambda';
import {aBadRequestResponse, anInternalErrorResponse, startupRoutine,} from '../shared/helpers';
import {initDB} from '../shared/db';

import {User} from '../shared/models/User';
import {Product} from '../shared/models/Product';
import {ProductOrder} from '../shared/models/ProductOrder';
import {placeOrder} from '../shared/paypal/placeOrder';

// @ts-ignore
import paypal from '@paypal/checkout-server-sdk';
import {Order} from '../shared/models/Order';

initDB();

const paypalClientId = process.env.PAYPAL_CLIENT;
const paypalSecret = process.env.PAYPAL_SECRET;
let stage = process.env.NODE_ENV;

export const handler: Handler = async (
	event: any,
	context: any,
	callback: any
) => {
	startupRoutine(event);

	const body: { email: string; productIds: [] } = event?.body;
	const { email, productIds } = body;

	try {
		if (!email || !productIds) {
			return aBadRequestResponse(callback, 'Bad Request');
		}

		const user = await User.findOne({ where: { email: email } });
		console.log(body);

		// if (!user) {
		// 	return aBadRequestResponse(
		// 		callback,
		// 		'User not found.' + JSON.stringify(body)
		// 	);
		// }

		const products = await Product.findAll({ where: { uid: productIds } });

		if (products.length !== productIds.length) {
			return aBadRequestResponse(
				callback,
				'product length does not equal product id length.'
			);
		}

		let invoiceAmount = 0;
		for (let i = 0; i < products.length; i++) {
			invoiceAmount += products[i].price;
		}
		const currency = 'USD';

		const paypalOrderId = await placeOrder(invoiceAmount, currency);

		const paypalOrderIdExists = await Order.findOne({
			where: { paypalOrderId: paypalOrderId },
		});
		if (paypalOrderIdExists) {
			return anInternalErrorResponse(
				callback,
				'Order with existing paypal id created twice. ' + paypalOrderId
			);
		}
		let order: any = await Order.create({
			userUid: user && user.uid,
			email: email,
			orderDate: new Date(),
			invoiceAmount: invoiceAmount,
			currency: currency,
			paypalOrderId: paypalOrderId,
			state: 'INIT',
			products: [products.map((el) => el.uid)],
		});

		const prom = [];
		for (let i = 0; i < products.length; i++) {
			console.log('PRODUCTS', products[i], products[i].uid);
			// prom.push(order.addProduct(products[i]))

			prom.push(
				ProductOrder.create({
					productUid: products[i].uid,
					orderUid: order.uid,
				})
			);
		}
		await Promise.all(prom);

		return paypalOrderId;
	} catch (e) {
		return anInternalErrorResponse(callback, e);
	}
};
