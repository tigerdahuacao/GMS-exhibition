/*****************************************************
 *****************************************************
 ******* BCDCButton这个模块已经废弃
 ******* 通过SmartPaymentButton的buttonType属性
 ******* 来控制渲染不同的Button类型
 *******
 ******* 请使用SmartPaymentButton.tsx这个文件
 *******
 *******
 *****************************************************
 *****************************************************/

import React, { FC, useEffect } from "react";
import CreateOrderObject from "../../../../../service/LoadPayPalScript/createOrderObject.util";
// import PayPal_SPB_JS_SDK_LoadScript from "../LoadPayPalScript/JSSDK";
import renderJSSDK from "../../../../../service/LoadPayPalScript/renderJSSDK";
import { useNavigate } from "react-router-dom";
// import { useAppSelector } from "../../typeHooks";
// import { getBuyerInfo } from "../../reducer/reducers/buyerInfoReducer";

const BCDCButton: FC = () => {
    // const buyerInfo = useAppSelector((state) => getBuyerInfo(state));
    // const isWithShippingOption = useAppSelector(
    //     (state) => state.withShippingOption.isWithShipping
    // ) as boolean;

    const navigate = useNavigate();
    const renderBtn = () => {
     
        // if (window.paypal) {
        //     let button = window.paypal.Buttons({
        //         fundingSource: window.paypal.FUNDING.CARD,
        //         ...CreateOrderObject({
        //             navigate,
        //         }),
        //     });
        //     if (button.isEligible()) {
        //         button.render("#paypal-button-container");
        //     }
        // }
    };

    useEffect(() => {
        (async () => {
            // console.log(
            //     "JS SDK states:",
            //     (PayPal_SPB_JS_SDK_LoadScript as any).readyState
            // );
            // debugger;
            // await UseJSSDK().then(renderBtn);
        })();
    });

    return (
        <div>
            <div id="paypal-button-container"></div>
        </div>
    );
};
export default BCDCButton;
