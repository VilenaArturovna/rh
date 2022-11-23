import React, {useEffect, useState} from "react";
import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";
import {api} from "./api";
import {CheckoutForm} from "./checkout-form";

const stripePromise = loadStripe("pk_test_51LYNJNB7CHQMZ06UbFRTSSnfezPuBfLq7ANdppGL9AR0a6kJIfHWatzOQb4PdQ6rxCXtmiP0sjTrktBA0GqAwlWM009AaDcjJn");

export const PaymentIntent = () => {
  const [clientSecret, setClientSecret] = useState("");
  console.log("-> clientSecret", clientSecret);

  const orderId = '9929f159-3461-49c1-b352-6f02a13514a4'

  useEffect(() => {
    !clientSecret && (async () => {
      const res = await api.createStripePaymentIntent(orderId)
      setClientSecret(res.data)
    })()
  }, [clientSecret])

  const appearance = {
    theme: 'flat',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="App">
      {clientSecret && (
        // @ts-ignore
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm clientSecret={clientSecret} />
        </Elements>
      )}
    </div>
  )
}
