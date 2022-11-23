import {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";
import {api} from "./api";

export const ConfirmPage = () => {
  const [amazonCheckoutSessionId, setAmazonCheckoutSessionId] = useState<string | null>(null)
  console.log("-> amazonCheckoutSessionId", amazonCheckoutSessionId);

  let [searchParams] = useSearchParams();

  const complete = async () => {
    amazonCheckoutSessionId && await api.completeAmazonPayCheckoutSession(amazonCheckoutSessionId)
  }

  useEffect(() => {
    setAmazonCheckoutSessionId(searchParams.get('amazonCheckoutSessionId'))
  }, []);

  useEffect(() => {
    (async () => {
      amazonCheckoutSessionId && await complete()
    })()
  }, [amazonCheckoutSessionId])
  return <div className="App-header">
    Done!!
  </div>
}
