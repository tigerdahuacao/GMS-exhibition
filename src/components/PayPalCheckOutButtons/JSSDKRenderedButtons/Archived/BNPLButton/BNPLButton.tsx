import React, { FC, useEffect } from "react";
import CreateOrderObject from "../../../../../service/LoadPayPalScript/createOrderObject.util";
import renderJSSDK from "../../../../../service/LoadPayPalScript/renderJSSDK";
import { useNavigate } from "react-router-dom";

const BNPLButton: FC = () => {
    const navigate = useNavigate();
    // const renderBtn = () => {
    //     debugger;
    //     if (window.paypal) {
    //         let button = window.paypal.Buttons({
    //             fundingSource: window.paypal.FUNDING.PAYLATER,
    //             ...CreateOrderObject({
    //                 navigate,
    //             }),
    //         });
    //         if (button.isEligible()) {
    //             button.render("#paypal-button-container");
    //         }
    //     }
    // };

    useEffect(() => {
        (async () => {
            // await UseJSSDK().then(renderBtn);
        })();
    });

    return (
        <div>
            <div id="paypal-button-container"></div>
        </div>
    );
};
export default BNPLButton;
