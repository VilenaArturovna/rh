import {useEffect, useState} from "react";
import {api} from "./api";
import {useSearchParams} from "react-router-dom";

const orderId = "d1a07621-1636-4d7b-96c9-cee6a5d80a2e";

export const ReturnPage = () => {
  const [amazonCheckoutSessionId, setAmazonCheckoutSessionId] = useState<string | null>(null)
  console.log("-> amazonCheckoutSessionId", amazonCheckoutSessionId);
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null)

  let [searchParams] = useSearchParams();

  const getUrl = async () => {
    if (amazonCheckoutSessionId) {
      const res = await api.getAmazonPayRedirectUrl({orderId, checkoutSessionId: amazonCheckoutSessionId})
      setRedirectUrl(res.data)
    }
  }

  useEffect(() => {
    setAmazonCheckoutSessionId(searchParams.get('amazonCheckoutSessionId'))
  }, []);

  useEffect(() => {
    (async () => {
      amazonCheckoutSessionId && await getUrl()
    })()
  }, [amazonCheckoutSessionId])

  return (
    <div className="App-header">
      Перейдите по ссылке
      {redirectUrl && <a href={redirectUrl}>
        AmazonPay
      </a>}
    </div>
  )
}
