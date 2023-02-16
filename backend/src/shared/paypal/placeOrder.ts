// @ts-ignore
import paypal from '@paypal/checkout-server-sdk';

export const placeOrder = async (invoiceAmount: number, currency: string) => {

    const paypalClientId = process.env.PAYPAL_CLIENT;
    const paypalSecret = process.env.PAYPAL_SECRET;
    let stage = process.env.NODE_ENV;

    console.log("place order shared: ", invoiceAmount, currency);

    // Remove this line for prod build!
    stage = 'dev';

    let environment;
    if (stage === 'production') {
        environment = new paypal.core.LiveEnvironment(
            paypalClientId,
            paypalSecret
        );
    } else {
        console.log('srcPlaceOrder', paypalClientId, paypalSecret);
        environment = new paypal.core.SandboxEnvironment(
            paypalClientId,
            paypalSecret
        );
    }
    let client = new paypal.core.PayPalHttpClient(environment);

    let request = new paypal.orders.OrdersCreateRequest();
    request.requestBody({
        intent: 'CAPTURE',
        purchase_units: [
            {
                amount: {
                    currency_code: currency,
                    value: invoiceAmount,
                },
            },
        ],
    });

    console.log("place order request: ", JSON.stringify(request));

    let createOrder = async function () {
        let response = await client.execute(request);
        console.log(`Response: ${JSON.stringify(response)}`);
        return response.result;
    };

    const paypalOrder = await createOrder();

    console.log('New paypal order created:', paypalOrder);

    return paypalOrder.id;
}