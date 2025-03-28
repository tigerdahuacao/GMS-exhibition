import { FC, useState } from "react";

import LeftPart from "./LeftPart";
import RightPart from "./RightPart";
import DownloadButtonPart from "./DownloadButtonPart";
import { useAppSelector } from "@/typeHooks";
import { getPaymentMethod } from "@/reducer/reducers/paymentMethodReducer";
import PAYMENT_METHOD from "@/enum/PAYMENT_METHOD";
import CodeDisplayAreaPrism from "@/components/CodeDisplayArea/CodeDisplayAreaPrism/CodeDisplayAreaPrism";
import {
    CODE_SNIPPET_NAME,
    PrismThemeNAME,
} from "@/components/CodeDisplayArea/CodeDisplayAreaPrism/PrismDisplayContextProvider";
import ACDCTestCard from "@/components/ACDC/ACDCTestCard";
import { CommonToggle } from "@/components/Toggles/CommonToggle";
import classNames from "classnames";
import { useLocation } from "react-router-dom";
import { getUseACDCFlag } from "@/reducer/reducers/vaultReducer";

const CheckoutPage: FC = () => {
    const currentPaymentMethod: PAYMENT_METHOD = useAppSelector((state) =>
        getPaymentMethod(state)
    );

    const isUseACDCVault = useAppSelector((state) =>getUseACDCFlag(state));

    const [showCodeDisplayArea, setShowCodeDisplayArea] = useState(false);

    const renderDownloadButtonPart = () => {
        if (currentPaymentMethod === PAYMENT_METHOD.PAYPAL_BCDC) {
            return <DownloadButtonPart />;
        }
        if (currentPaymentMethod === PAYMENT_METHOD.PAYPAL_APM) {
            return <DownloadButtonPart />;
        }
    };

    const renderACDCTestPart = () => {
        if (currentPaymentMethod === PAYMENT_METHOD.PAYPAL_ACDC && !isUseACDCVault) {
            return <ACDCTestCard />;
        }
    };

    const paymentMethodRD = useAppSelector((state) => getPaymentMethod(state));

    const renderFrontEndCode = () => {
        let codeSnippetName: CODE_SNIPPET_NAME = CODE_SNIPPET_NAME.SPB_STANDARD;
        if (paymentMethodRD === PAYMENT_METHOD.PAYPAL_STANDARD) {
            //default
        }
        if (paymentMethodRD === PAYMENT_METHOD.PAYPAL_BNPL) {
            codeSnippetName = CODE_SNIPPET_NAME.SPB_BNPL;
        }
        if (paymentMethodRD === PAYMENT_METHOD.PAYPAL_ACDC) {
            codeSnippetName = CODE_SNIPPET_NAME.ACDC;
        }
        if (paymentMethodRD === PAYMENT_METHOD.PAYPAL_GOOGLEPAY) {
            codeSnippetName = CODE_SNIPPET_NAME.GOOGLEPAY;
        }
        if (paymentMethodRD === PAYMENT_METHOD.PAYPAL_APPLEPAY) {
            codeSnippetName = CODE_SNIPPET_NAME.APPLEPAY;
        }
        if (paymentMethodRD === PAYMENT_METHOD.PAYPAL_APM) {
            codeSnippetName = CODE_SNIPPET_NAME.APM_IDEAL;
        }
        return (
            <>
                {/* {paymentMethodRD} */}
                {/* <div className="w-full h-4"></div> */}
                <CodeDisplayAreaPrism
                    codeSnippetName={codeSnippetName}
                    prismTheme={PrismThemeNAME.github}
                />
            </>
        );
    };

    const showCode = () => {
        return (
            <>
                {renderFrontEndCode()}
                <CodeDisplayAreaPrism
                    codeSnippetName={CODE_SNIPPET_NAME.BackEndAPI}
                    prismTheme={PrismThemeNAME.nightOwl}
                    languageType="js"
                />
            </>
        );
    };

    const location = useLocation();
    const pathname = location.pathname;

    const fitWidth = () => {
        if (!pathname.startsWith("/lab")) {
            return true;
        }
    };

    return (
        <div
            className={classNames({
                "w-screen": fitWidth(),
            })}
        >
            {/* 标题: Shipping Cart BCDC */}
            <div className="w-full h-10">
                <CommonToggle
                    handleChange={(event, checked) => {
                        setShowCodeDisplayArea(checked);
                    }}
                    labelContent="显示代码"
                    tipContent="点击用于切换显示/隐藏代码展示区域"
                />
            </div>
            {/* [2023-10-08 修改"Left right 背景图拿掉] */}
            {/* <div className="flex flex-col md:flex-row bg-gray-300"> */}

            <div className="flex flex-col md:flex-row bg-white w-full">
                <div
                    className={classNames({
                        " basis-1/4  m-2 divide-gray-300/50":
                            showCodeDisplayArea,
                    })}
                >
                    {showCodeDisplayArea && showCode()}
                </div>

                <div className=" basis-1/2  m-2">
                    <LeftPart></LeftPart>
                </div>

                {/* [2025-03-25](fix)  添加min-w-fit, 让右侧panel在14寸的电脑上的显示正常点*/}
                <div className=" basis-1/4  m-2 min-w-fit">
                    <RightPart />
                    {
                        // 2024-11-25去掉下载按钮
                        // renderDownloadButtonPart()
                    }
                    {renderACDCTestPart()}
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
