import React, {useEffect, useState} from "react";
import {api, RenderButtonsSettings} from "./api";

interface AmazonProps {
  bindChangeAction?: any;
  bindUpgradeAction?: any;
  initCheckout?: any;
  renderButton?: any;
  signout?: any;
}

function useAmazonPay(): { amazonPay: AmazonProps } {
  const [amazonPay, setAmazonPay] = useState<any>(null);

  useEffect(() => {
    const _window = window as any;
    const amazonApi = _window?.amazon?.Pay;
    if (amazonApi) {
      if (!amazonPay) {
        setAmazonPay({ ...amazonApi });
      }
    }
  });

  return { amazonPay: { ...amazonPay } };
}

type Props = {
  orderId: string
}

export const AmazonPay = ({orderId}: Props) => {
  //добавить скрипт в index.html

  const { amazonPay } = useAmazonPay();

  const [amazonButtonConfig, setAmazonButtonConfig] = useState<RenderButtonsSettings>();

  const fetchAmazonConfig = async () => {
    const res = await api.createAmazonPayCheckout(orderId)
    setAmazonButtonConfig(res.data)
  }

  useEffect(() => {
    (async () => await fetchAmazonConfig())()
  }, [])

  const renderAmazonPayButton =() => {
    if (!amazonPay?.renderButton) {
      console.log('amazon pay render button not found');
      return;
    }

    if (!amazonButtonConfig) {
      console.log('amazon pay render button not found');
      return;
    }

    amazonPay.renderButton('#AmazonPayButton', amazonButtonConfig);
  };
  //console.log("-> amazonButtonConfig", amazonButtonConfig);
  useEffect(() => {
    //console.log('is ready to render Amazon Pay button');
    renderAmazonPayButton();
  }, [amazonButtonConfig]);

  return (
    <div style={{height: 100, width: 400}}>
      <div id="AmazonPayButton"/>
    </div>
  )

}
