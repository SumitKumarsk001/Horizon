import ReactDOM from "react-dom/client";
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux';
import { store } from './app/store.ts';
import { worker } from "./mocks/browser.ts";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

async function enableMocking() {
  if (import.meta.env.DEV) {
    await worker.start({
      onUnhandledRequest: "bypass",
    });
  }
}
enableMocking().then(() => {
ReactDOM.createRoot(document.getElementById('root')!).render(
 
    <Provider store={store}>
      
      <App />
     
       <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="colored"
    />
   </Provider>
  
);

});    

