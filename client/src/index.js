import { StateProvider } from "./pages/StateProvider";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
ReactDOM.render(
    <StateProvider>
        <App />
    </StateProvider>,
    document.getElementById("root")
);
