import { FC, useState } from "react";

import PricingSeparate from "./PricingSeparate";
import PricingTotal from "./PricingTotal";

import { useAppSelector, useAppDispatch } from "@/typeHooks";

import SmartPaymentButton from "@/components/PayPalCheckOutButtons/JSSDKRenderedButtons/SmartPaymentBtn/SmartPaymentButton";
// BCDCButton这个模块已经废弃, 通过SmartPaymentButton的buttonType属性来控制渲染不同的Button类型
// import BCDCButton from "@/components/PayPalCheckOutButtons/JSSDKRenderedButtons/BCDCButton/BCDCButton";
import APMDisplayArea from "../APM/APMDisplayArea";
import PAYMENT_METHOD from "@/enum/PAYMENT_METHOD";
import { getShoppingCart } from "@/reducer/reducers/shoppingCartReducer";
import { getPaymentMethod } from "@/reducer/reducers/paymentMethodReducer";
import { getAPMMethod } from "@/reducer/reducers/APMReducer";
import APM_METHOD_ENUM from "../APM/APM_METHOD_ENUM";
import ACDCComponents from "@/components/ACDC/ACDCComponents";
import GooglePayButton from "@/components/PayPalCheckOutButtons/GooglePayButton/GooglePayButton";
import ApplePayButton from "@/components/PayPalCheckOutButtons/ApplePayButton/ApplePayButton";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import { Tooltip } from "@mui/material";
import FakeApplePayButton from "@/components/PayPalCheckOutButtons/ApplePayButton/FakeApplePayButton";
import { getUseACDCFlag } from "@/reducer/reducers/vaultReducer";
import ACDCRecurring from "@/components/ACDC/ACDCRecurring";

function renderSmartPaymentButtons() {
    return (
        <>
            <SmartPaymentButton buttonType={PAYMENT_METHOD.PAYPAL_STANDARD} />
        </>
    );
}

function renderBCDCButton() {
    return (
        //BCDCButton这个模块已经废弃, 通过SmartPaymentButton的buttonType属性来控制渲染不同的Button类型
        // <>
        //     <BCDCButton />
        // </>
        <>
            <SmartPaymentButton buttonType={PAYMENT_METHOD.PAYPAL_BCDC} />
        </>
    );
}

function renderAPMButton(APMMethod: APM_METHOD_ENUM) {
    console.log("APM Method:", APMMethod);
    return (
        <>
            <APMDisplayArea
                method={APMMethod}
                setMethod={() => {
                    console.log("这是购物车结算页面, 不需要setMethod回调函数");
                }}
                showLabel={true}
                showField={true}
                showButton={true}
            />
        </>
    );
}

function renderBNPLButton() {
    return (
        <>
            <SmartPaymentButton buttonType={PAYMENT_METHOD.PAYPAL_BNPL} />
        </>
    );
}

function renderACDC(isUseACDCVault: boolean) {
    if (!isUseACDCVault) {
        return (
            <>
                <ACDCComponents />
            </>
        );
    } else {
        return (
            <>
                <ACDCRecurring />
            </>
        );
    }
}

function renderGooglePay() {
    return (
        <>
            <GooglePayButton />
        </>
    );
}

function renderApplePay() {
    return (
        <>
            <FakeApplePayButton />
            {/* <ApplePayButton /> */}
        </>
    );
}

function CurrentPaymentMethod(
    selectPaymentMethod: PAYMENT_METHOD,
    APMMethod: APM_METHOD_ENUM,
    isUseACDCVault: boolean
) {
    switch (selectPaymentMethod) {
        case PAYMENT_METHOD.PAYPAL_STANDARD:
            return renderSmartPaymentButtons();
            break;
        case PAYMENT_METHOD.PAYPAL_BCDC:
            return renderBCDCButton();
            break;
        case PAYMENT_METHOD.PAYPAL_APM:
            return renderAPMButton(APMMethod);
            break;
        case PAYMENT_METHOD.PAYPAL_BNPL:
            return renderBNPLButton();
            break;
        case PAYMENT_METHOD.PAYPAL_ACDC:
            return renderACDC(isUseACDCVault);
            break;
        case PAYMENT_METHOD.PAYPAL_APPLEPAY:
            return renderApplePay();
            break;
        case PAYMENT_METHOD.PAYPAL_GOOGLEPAY:
            return renderGooglePay();
            break;
        default:
            break;
    }
    console.log("什么都没有返回");
}

const RightPart: FC = () => {
    const selectPaymentMethod = useAppSelector((state) =>
        getPaymentMethod(state)
    ) as PAYMENT_METHOD;
    const shoppingCartList = useAppSelector((state) => getShoppingCart(state));
    const APMMethod = useAppSelector((state) => {
        return getAPMMethod(state);
    });

    const isUseACDCVault = useAppSelector((state) => getUseACDCFlag(state));

    let [showPaymentMethod, setShowPaymentMethod] =
        useState(selectPaymentMethod);

    const isWithShippingOption = useAppSelector(
        (state) => state.withShippingOption.isWithShipping
    ) as boolean;

    // console.log("isWithShippingOption:",isWithShippingOption)

    const renderFn = () => {
        if (shoppingCartList.length > 0) {
            return (
                <div>
                    <div>
                        <PricingSeparate />
                    </div>
                    <div>
                        <PricingTotal />
                    </div>
                    <hr className=" my-2" />
                    <div>
                        {/* <p>当前的支付方式: {selectPaymentMethod}</p> */}
                        {/* <p>是否带有运输参数: {`${isWithShippingOption}`}</p> */}

                        <div>
                            {CurrentPaymentMethod(
                                selectPaymentMethod,
                                APMMethod,
                                isUseACDCVault
                            )}
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    <div>
                        <em>Empty Cart</em>
                    </div>
                    <div>Please Select your favorite products!</div>
                </div>
            );
        }
    };

    return (
        <div className="relative bg-white px-6 pb-8 pt-10 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-2xl sm:rounded-lg sm:px-10 ">
            <div className="mx-auto max-w-2xl">
                <div className="divide-y divide-gray-300/50">{renderFn()}</div>
            </div>
        </div>
    );
};
export default RightPart;
