
export default function usePaypalCheckout() {

    const onCheckout = () => {
        window.paypal
            .Buttons({

                env: 'sandbox', // Or 'production'
                // Set up the payment:
                // 1. Add a payment callback
                payment: function (data: any, actions: any) {
                    // 2. Make a request to your server
                    console.log("payment??", data, actions)
                    return actions.request.post('/my-api/create-payment/')
                        .then(function (res: any) {
                            // 3. Return res.id from the response
                            return res.id;

                        });
                },
                // Execute the payment:
                // 1. Add an onAuthorize callback
                onAuthorize: function (data: any, actions: any) {
                    // 2. Make a request to your server
                    return actions.request.post('/my-api/execute-payment/', {
                        paymentID: data.paymentID,
                        payerID: data.payerID
                    })
                        .then(function (res: any) {
                            // 3. Show the buyer a confirmation message.
                        });
                },
                // createOrder: (data, actions, err) => {
                //   return actions.order.create({
                //     intent: 'CAPTURE',
                //     purchase_units: [
                //       {
                //         description: 'Cool looking table',
                //         amount: {
                //           currency_code: 'CAD',
                //           value: props.price,
                //         },
                //       },
                //     ],
                //   });
                // },
                // onApprove: async (data, actions) => {
                //   const order = await actions.order.capture();
                //   console.log(order);
                // },
                onError: (err: any) => {
                    console.log(err);
                },
            })
    }

    return {
        onCheckout,
    }
}