import {PayPalButtons, PayPalScriptProvider} from "@paypal/react-paypal-js";
import {api} from "./api";
import {PayPalScriptOptions} from "@paypal/paypal-js/types/script-options";

type Props = {
  orderId: string
}
export const Paypal = ({orderId}: Props) => {
  //добавить client-id в .env
  const options: PayPalScriptOptions = {
    "client-id":
      "ARMdQuh6dY86qufnYrszk-yoF7VarImn_mnaDflg6qEx29-ymD47JJ8tl0phoVdQCQ_MNE6UNMk51OWL",
    currency: "USD",
    intent: "authorize",
  };
  return (
    <PayPalScriptProvider options={options}>
      <PayPalButtons
        style={{
          layout: "horizontal",
          color: "gold",
        }}
        createOrder={() =>
          api.createOrder(orderId).then((res) => res.data)
        }
        onApprove={(data) => {
          return api
            .authorizePayment({ paypalOrderId: data.orderID, orderId })
            .then((res) => {
              console.log(res.data);
            });
        }}
      />
    </PayPalScriptProvider>
  )
}
