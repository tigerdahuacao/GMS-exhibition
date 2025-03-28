import  { FC, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PAYMENT_METHOD from "@/enum/PAYMENT_METHOD";
import { BuyerInfo, getBuyerInfo } from "@/reducer/reducers/buyerInfoReducer";
import getCreateOrderObjectFn from "@/service/LoadPayPalScript/createOrderObject.util";
import CommonTextDialog, {
    DialogRef,
} from "@/components/Dialog/CommonTextDialog";

import { useAppSelector } from "@/typeHooks";
import { getRecurringFlag } from "@/reducer/reducers/vaultReducer";
import { generateAccessToken } from "@/service/OrderV2/ByOnlineFetch/API";

import renderJSSDK, { JSSDKParams } from "@/service/LoadPayPalScript/renderJSSDK";

interface ButtonType {
    buttonType: PAYMENT_METHOD;
}

const SPB: FC<ButtonType> = ({ buttonType }) => {
    const dialogRef = useRef<DialogRef>(null);

    const isUseVault = useAppSelector((store) => getRecurringFlag(store));

 
    console.log(`%c["SmartPaymentButton.tsx"]isUseVault:`, "color:green", isUseVault);

    let infoMessageArea = document.getElementById(
        "smart-payment-button-info-area"
    );
    const setInfoMessage = () => {
        if (infoMessageArea) {
            infoMessageArea.innerText =
                "Current Payment Method is not support in the country select.";
        }
    };
    const clearInfoMessage = () => {
        if (infoMessageArea) {
            infoMessageArea.innerText = "";
        }
    };

    const navigate = useNavigate();
    const location = useLocation();
    const pathname = location.pathname;

    const getLink = () => {
        if (pathname.startsWith("/lab")) {
            return "/lab/thankyou";
        } else if (pathname.startsWith("/display")) {
            return "/display/thankyou";
        } else {
            return "";
        }
    };

    // const buyerInfo = useAppSelector((state) => state.buyerInfo);
    const buyerInfo: BuyerInfo = useAppSelector((state) => {
        return getBuyerInfo(state);
    });
    const addressCountry = buyerInfo.Address.Country;

    const openDialogFn = (transactionID: string) => {
        setTimeout(() => {
            dialogRef.current?.openDialogWithCustomizedContent(
                "Congratulation!",
                "success",
                `Your transaction ${transactionID} is Completed!`
            );
        }, 500);
    };

    const renderBtn = () => {
        if (window.paypal) {
            let button;
            let obj = getCreateOrderObjectFn({
                navigate,
                getLink,
                isOpenDialog: true,
                openDialogFn: openDialogFn,
            });
            if (buttonType === PAYMENT_METHOD.PAYPAL_BCDC) {
                button = window.paypal.Buttons({
                    fundingSource: window.paypal.FUNDING.CARD,
                    ...obj,
                    //2024-11-19 自动打开 BCDC按钮
                    expandCardForm: true,
                });
            } else if (buttonType === PAYMENT_METHOD.PAYPAL_STANDARD) {
                button = window.paypal.Buttons(obj);
            } else if (buttonType === PAYMENT_METHOD.PAYPAL_BNPL) {
                button = window.paypal.Buttons({
                    fundingSource: window.paypal.FUNDING.PAYLATER,
                    ...obj,
                });
            }

            clearInfoMessage();
            if (button.isEligible()) {
                button.render("#paypal-button-container");
                // .then(() => {});
            } else {
                if (buttonType === PAYMENT_METHOD.PAYPAL_BNPL) {
                    if (
                        !document
                            .getElementById("paypal-button-container")
                            ?.hasChildNodes()
                    ) {
                        setInfoMessage();
                    }
                }
            }
        }
    };
    useEffect(() => {
        (async () => {
            let JSLoadParams: JSSDKParams = {
                addressCountry: addressCountry,
            };

            //增加BNPL的参数
            if (buttonType === PAYMENT_METHOD.PAYPAL_BNPL) {
                let map = new Map<string, string>();
                map.set("enable-funding", "paylater");
                if (["AU", "ES", "DE", "IT", "FR"].includes(addressCountry)) {
                    map.set("currency", "EUR");
                }
                if (["GB"].includes(addressCountry)) {
                    map.set("currency", "GBP");
                }
                JSLoadParams.additionalOptions = map;
            }

            //2025-01-19新增vault的参数
            if (isUseVault) {
                JSLoadParams.isUseVault = true;
                let tokenData = await generateAccessToken();
                let id_token = tokenData!.id_token;
                JSLoadParams.dataUserIdToken = id_token;
                console.log("[Vault]data-user-id-token is Generated!:",id_token)
            }
            
            await renderJSSDK(JSLoadParams).then(renderBtn);
        })();
    });

    return (
        <div>
            <div id="paypal-button-container"></div>
            <div id="smart-payment-button-info-area"></div>
            <CommonTextDialog ref={dialogRef} />
        </div>
    );
};
export default SPB;
