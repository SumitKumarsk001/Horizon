
import React from "react";
import ReactDOM from "react-dom/client";
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux';
import { store } from './app/store.ts';
import { worker } from "./mocks/browser.ts";

async function enableMocking() {
  if (import.meta.env.DEV) {
    await worker.start({
      onUnhandledRequest: "bypass",
    });
  }
}
enableMocking().then(() => {
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
   </Provider>
  </React.StrictMode>,
);

});    

