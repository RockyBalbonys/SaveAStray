import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./tools/store.js";
import { QuestionnaireProvider } from "./hooks/useQuestionnaire.jsx";
import { ChatProvider } from "./hooks/UseChat.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <QuestionnaireProvider>
          <ChatProvider>
            <App />
          </ChatProvider>
        </QuestionnaireProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
