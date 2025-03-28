import ErrorPage from "../pages/error-page";

import CheckoutPage from "../pages/ShoppingCartCheckout";

import Product from "../pages/Product";
import Thankyou from "../pages/Thankyou";
import App from "../App";
import lab from "./labRoutes";
import { createHashRouter } from "react-router-dom";
import DisplayRoot from "../pages/DisplayRoot";

const createDisplayRoot = (displaySubRoot: string) => {
    return {
        path: `/${displaySubRoot}`,
        element: <DisplayRoot />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: `/${displaySubRoot}`,
                element: <Product />,
            },
            {
                path: `/${displaySubRoot}product`,
                element: <Product />,
            },
            {
                path: `/${displaySubRoot}CheckoutPage`,
                element: <CheckoutPage />,
            },
            {
                path: `/${displaySubRoot}thankyou`,
                element: <Thankyou />,
            },
        ],
    };
};

const createMyRouterContent = () => {
    let rootRoutersList = [];

    const labRouter = import.meta.env.VITE_REACT_APP_LAB_ROUTER;

    if (labRouter === "TRUE") {
        rootRoutersList.push(lab);
    }
    if (labRouter === "TRUE") {
        rootRoutersList.push(
            {
                path: "/",
                element: <App />,
                errorElement: <ErrorPage />,
            },
            createDisplayRoot("display/")
        );
    } else {
        rootRoutersList.push(createDisplayRoot(""));
    }
    // debugger;
    return rootRoutersList;
};

// const router = createBrowserRouter(createMyRouterContent());
const router = createHashRouter(createMyRouterContent());

export default router;
