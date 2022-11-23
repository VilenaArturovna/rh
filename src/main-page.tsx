import React from "react";
import {Paypal} from "./paypal";
import {AmazonPay} from "./amazon-pay";
import {api} from "./api";

const orderId = "d1a07621-1636-4d7b-96c9-cee6a5d80a2e";

export const MainPage = () => {
  const onClick = async () => {
    await api.getXlsx()
  }
  const getTicket = async () => {
    await api.getTicket('ebe8337a-70dc-48fb-9374-5bc01aea3243')
  }
  return (
    <div className="App">
      <header className="App-header">
        <button onClick={onClick}>Get xlsx</button>
        <button onClick={getTicket}>Get ticket</button>


        {/*<Paypal orderId={orderId} />*/}

        {/*<AmazonPay orderId={orderId} />*/}

        {/*<PaymentIntent />*/}
      </header>
    </div>
  );
}
