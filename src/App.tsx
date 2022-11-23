import React from "react";
import "./App.css";
import {Route, Routes} from "react-router-dom";
import {MainPage} from "./main-page";
import {ConfirmPage} from "./confirm-page";
import {ReturnPage} from "./return-page";
import {StripeReturn} from "./stripe-return";

function App() {
  //обязательно сообщить на бэк адреса страниц для возврата и подтверждения платежа
return (
  <Routes>
    <Route path='/' element={<MainPage />}/>
    <Route path='return' element={<ReturnPage />}/>
    <Route path='confirm' element={<ConfirmPage />}/>
    <Route path='stripe-return' element={<StripeReturn />}/>
  </Routes>
)
}

export default App;
