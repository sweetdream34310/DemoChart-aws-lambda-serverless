import {Handler} from 'aws-lambda';
import {aBadRequestResponse, anInternalErrorResponse, startupRoutine,} from '../shared/helpers';
import {initDB} from '../shared/db';

import {User} from '../shared/models/User';
import {Product} from '../shared/models/Product';
import {ProductOrder} from '../shared/models/ProductOrder';
import {confirmOrder} from '../shared/paypal/confirmOrder'
import {Order} from '../shared/models/Order';
import sendProductDownloadLinksFromStore from '../shared/mails/sendProductDownloadLinksFromStore';

initDB();


/**
 * Uses orderId to ask paypal for current state.
 * If state is completed, update order in database.
 * Otherwise, return an error
 */
export const handler: Handler = async (
    event: any,
    context: any,
    callback: any
) => {
    startupRoutine(event);
    // const uid = event?.cognitoPoolClaims?.sub;

    const body: any = event?.body;
    const {fullName, paypalOrderId} = body;

    try {
        let product;

        if (!paypalOrderId) {
            return aBadRequestResponse(callback, 'Bad Request');
        }

        const captureStatus = await confirmOrder(paypalOrderId);

        if (captureStatus === 'COMPLETED') {
            await Order.update(
                {
                    state: 'COMPLETED',
                },
                {where: {paypalOrderId}}
            );

            const updatedOrder = await Order.findOne({
                where: {paypalOrderId},
                include: [
                    {
                        model: ProductOrder,
                        include: [{model: Product}],
                    },
                    {
                        model: User,
                    },
                ],
            });

            if (updatedOrder) {
                console.log(
                    'products',
                    updatedOrder.productOrder.map((el) => el.product)
                );
                await sendProductDownloadLinksFromStore(updatedOrder.email, {
                    firstName: fullName.split(' ')[0], // updatedOrder.user.firstName
                    products: updatedOrder.productOrder.map((el) => el.product),
                });

                return {order: updatedOrder};
            } else {
                return anInternalErrorResponse(
                    callback,
                    'Updated order not found.'
                );
            }
        } else {
            return aBadRequestResponse(callback, 'Order not completed yet.');
        }
    } catch (e) {
        return anInternalErrorResponse(callback, e);
    }
};
