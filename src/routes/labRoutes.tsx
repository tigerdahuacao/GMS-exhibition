import Root from "../pages/LabRoot/LabRoot";
import APM from "../pages/APM";
import ApplePay from "../pages/ApplePay";
import GooglePay from "../pages/GooglePay";
import HomePage from "../pages/HomePage";
import Product from "../pages/Product";
import CheckoutPage from "../pages/ShoppingCartCheckout";
import SinglePageTest from "../pages/SingleTestPage";
import Thankyou from "../pages/Thankyou";
import PaymentSetting from "../pages/PaymentSetting/PaymentSetting";
// import Tooltips from "../pages/Tooltips";

import PositionedTooltips from "../pages/Tooltips";

import Venmo from "../pages/Venmo";
import ErrorPage from "../pages/error-page";


import ACDCSingleDisplay from "@/pages/ACDC/ACDCSingleDisplay";

const lab = {
    path: "/lab",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
        {
            path: "/lab/tooltips",
            element: <PositionedTooltips />,
        },

        {
            path: "/lab/thankyou",
            element: <Thankyou />,
        },

        {
            path: "/lab/PaymentSetting",
            element: <PaymentSetting />,
        },
        {
            path: "/lab/product",
            element: <Product />,
        },
        {
            path: "/lab/CheckoutPage",
            element: <CheckoutPage />,
        },
        {
            path: "/lab/applePay",
            element: <ApplePay />,
        },
        {
            path: "/lab/googlePay",
            element: <GooglePay />,
        },
        {
            path: "/lab/venmo",
            element: <Venmo />,
        },
        {
            path: "/lab/APM",
            element: <APM />,
        },
        {
            path: "/lab",
            element: <HomePage />,
        },
        {
            path: "/lab/singlePageTest",
            element: <SinglePageTest />,
        },
        
        {
            path: "/lab/ACDC",
            element: <ACDCSingleDisplay />,
        },
    ],
}

export default lab;