import axios from "axios";
import { saveAs } from 'file-saver';

const instance = axios.create({
  baseURL: "http://localhost:3000/",
});

type CreatePaypalOrderRequestDto = {
  orderId: string;
};
type AuthorizePaypalPaymentRequestDto = {
  orderId: string;
  paypalOrderId: string;
};

export const api = {
  createOrder(orderId: string) {
    return instance.post<string>("payment/paypal/create-order", { orderId });
  },
  authorizePayment(body: AuthorizePaypalPaymentRequestDto) {
    return instance.post("payment/paypal/authorize-payment", { ...body });
  },
  createAmazonPayCheckout(orderId: string) {
    return instance.post<RenderButtonsSettings>("payment/amazon-pay/create-checkout", {orderId});
  },
  getAmazonPayRedirectUrl(body: SendAmazonPayCheckoutSessionIdRequestDto) {
    return instance.post<string>("payment/amazon-pay/get-return-url", {...body});
  },
  completeAmazonPayCheckoutSession(checkoutSessionId: string) {
    return instance.post('payment/amazon-pay/complete-checkout-session', { checkoutSessionId })
  },
  createStripePaymentIntent(orderId: string) {
    return instance.post('payment/stripe/create-payment-intent', { orderId })
  },
  getXlsx() {
    return instance.post('admin/subscription/xls', {},{ responseType: 'arraybuffer' })
      .then((res) => {
        const blob = new Blob([res.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        saveAs(blob, 'subscriptions.xlsx');
      });
  },
  getTicket(id: string) {
    return instance.get(`ticket/${id}/pdf`, { responseType: 'arraybuffer' })
      .then((res) => {
        const blob = new Blob([res.data], { type: 'application/pdf' });
        saveAs(blob, 'ticket.pdf');
      });
  }
};

interface Price {
  amount: string;
  currencyCode: string;
}
export interface RenderButtonsSettings {
  merchantId: string;
  publicKeyId: string;
  ledgerCurrency: string;
  checkoutLanguage: string;
  productType: string;
  placement: string;
  buttonColor: string;
  estimatedOrderAmount: Price;
  createCheckoutSessionConfig: {
    payloadJSON: string;
    signature: string;
    publicKeyId: string;
  };
}

export interface SendAmazonPayCheckoutSessionIdRequestDto {
  checkoutSessionId: string;
  orderId: string;
}


