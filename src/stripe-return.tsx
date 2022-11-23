import {useEffect, useState} from "react";
import {useStripe} from '@stripe/react-stripe-js';
import {useSearchParams} from "react-router-dom";

export const StripeReturn = () => {
  const stripe = useStripe();
  const [message, setMessage] = useState<string>('');

  let [searchParams] = useSearchParams();
  const clientSecret = searchParams.get(
    'payment_intent_client_secret'
  );
  console.log("-> clientSecret", clientSecret);

  useEffect(() => {
    console.log("-> stripe", stripe);
    if (!stripe) {
      return;
    }

    if (!clientSecret) return;

    // Retrieve the PaymentIntent
    stripe
      .retrievePaymentIntent(clientSecret)
      .then(({paymentIntent}) => {
        // Inspect the PaymentIntent `status` to indicate the status of the payment
        // to your customer.
        //
        // Some payment methods will [immediately succeed or fail][0] upon
        // confirmation, while others will first enter a `processing` state.
        //
        // [0]: https://stripe.com/docs/payments/payment-methods#payment-notification
        switch (paymentIntent?.status) {
          case 'succeeded':
            setMessage('Success! Payment received.');
            break;

          case 'processing':
            setMessage("Payment processing. We'll update you when payment is received.");
            break;

          case 'requires_payment_method':
            // Redirect your user back to your payment page to attempt collecting
            // payment again
            setMessage('Payment failed. Please try another payment method.');
            break;

          default:
            setMessage('Something went wrong.');
            break;
        }
      });
  }, [stripe]);


  return (<div>{message}</div>);
};
