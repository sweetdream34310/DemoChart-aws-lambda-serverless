#Payment process looks like the following:
1. Frontend Store gets product data from backend
2. User adds products to store
3. User starts checkout process via paypal.
4. Instead of creating an order directly on frontend side, we send a request to our backend with the product ids.
5. On backend side, we start an order via paypal api. Here we set the price and currency.
6. We return the paypal order id to the frontend
7. The user goes through the payment process of paypal.
8. After successfull payment, paypal informs our frontend.
9. Our frontend sends this information to the backend.
10. Our backend does not trust the frontend's information and uses the orderId to ask paypal directly whether the order is completed or not.
11. If so, we set the order to succeeded in our system. We send back the download-links. At the same time, we send out our E-Mails with those download links.
12. The user gets redirected to another site where he can download the bought products.

#Paypal Sandbox account
E-Mail: sb-io6us12488089@personal.example.com 

PW: -kR}Q^4M


#Paypal Tutorial with backend validation
https://medium.com/@savannahar68/pain-with-paypal-payment-gateway-integration-f084eb47f9cd 


