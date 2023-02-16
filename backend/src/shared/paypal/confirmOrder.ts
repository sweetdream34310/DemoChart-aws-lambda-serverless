// @ts-ignore
import paypal from '@paypal/checkout-server-sdk';
export const confirmOrder = async (paypalOrderId: string) => {

    const paypalClientId = process.env.PAYPAL_CLIENT;
    const paypalSecret = process.env.PAYPAL_SECRET;
    //let stage = process.env.NODE_ENV;

    let stage = "dev";


    // Creating an environment
    // let clientId = "AV-v1pPnbjlDyTK8iiIvrFW6V7WlVhQutFBxxN55OZ4-eQ3UKzj2ftYcN9p8iF3k04UsgLVtW4OhGG2f";
    // let clientSecret = "EJNFNXUTtcp2yohvB_sdmicf3pb-plD7GVuoBkz1T-vul2b1xsJmRaaCIyoXTZSA8CBJVtJ_LgRJr0u0";

    // This sample uses SandboxEnvironment. In production, use LiveEnvironment
    // let environment = new paypal.core.SandboxEnvironment(
    // 	paypalClientId,
    // 	paypalSecret
    // );
    let environment;

    if (stage === 'production') {
        environment = new paypal.core.LiveEnvironment(paypalClientId, paypalSecret);
    } else {
        environment = new paypal.core.SandboxEnvironment(paypalClientId, paypalSecret);
    }
    let client = new paypal.core.PayPalHttpClient(environment);

    console.log("confirmOrder", environment, client);

    let captureOrder = async function (orderId: string) {
        const request = new paypal.orders.OrdersCaptureRequest(orderId);
        request.requestBody({});
        // Call API with your client and get a response for your call
        let response = await client.execute(request);
        console.log(`Response: ${JSON.stringify(response)}`);
        // If call returns body in response, you can get the deserialized version from the result attribute of the response.
        console.log(`Capture: ${JSON.stringify(response.result)}`);
        return response.result;
    };

    let capture: any = await captureOrder(paypalOrderId);

    console.log('CAPTURE', capture);

    // const paypalPayment = capture?.purchase_units[0] && capture.purchase_units[0].payments && capture.purchase_units[0].captures[0];
    return capture.status;
}