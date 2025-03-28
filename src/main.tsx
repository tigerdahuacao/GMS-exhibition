
import * as ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import router from "./routes/createRouter";
import store, { persistor } from "./reducer/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

console.table(import.meta.env);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <RouterProvider router={router} />
        </PersistGate>
    </Provider>
);
