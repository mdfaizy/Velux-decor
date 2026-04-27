import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./redux/app/store";
createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <Provider store={store}>
    <App />
    <ToastContainer position="top-right" autoClose={3000} />
    </Provider>
  </StrictMode>,
);
