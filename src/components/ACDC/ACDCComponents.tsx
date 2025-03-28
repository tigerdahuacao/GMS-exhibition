import { FC, useEffect, useRef, useState } from "react";

import {
    createOrderCallback,
    onApproveCallback,
    print_console_ACDC_btn,
    resultMessage,
} from "./ACDCCallBack";
import classNames from "classnames";

import { useAppDispatch, useAppSelector } from "../../typeHooks";
import { setIsCustomizedClient } from "../../reducer/reducers/clientSecretReducer";
import CommonTextDialog, { DialogRef } from "../Dialog/CommonTextDialog";
import renderJSSDK, {
    JSSDKParams,
} from "@/service/LoadPayPalScript/renderJSSDK";
import getCreateOrderObjectFn from "@/service/LoadPayPalScript/createOrderObject.util";
import { useLocation, useNavigate } from "react-router-dom";
import { generateAccessToken } from "@/service/OrderV2/ByOnlineFetch/API";
import { getRecurringFlag } from "@/reducer/reducers/vaultReducer";

const ACDCComponents: FC = () => {
    let [cardFormDisplay, setCardFormDisplay] = useState("inline-block");
    let [submitBtnDisable, setSubmitBtnDisable] = useState(true);

    // const [dialogTransactionID, setDialogTransactionID] = useState(null);
    const dispatch = useAppDispatch();
    const dialogRef = useRef<DialogRef>(null);

    const isUseVault = useAppSelector((store) => getRecurringFlag(store));

    let cardField: any;

    const openDialogFn = (transactionID: string) => {
        setTimeout(() => {
            dialogRef.current?.openDialogWithCustomizedContent(
                "Congratulation!",
                "success",
                `Your transaction ${transactionID} is Completed!`
            );
        }, 500);
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

    const renderCard = () => {
        const obj = getCreateOrderObjectFn({
            navigate,
            getLink,
            isOpenDialog: true,
            openDialogFn: openDialogFn,
        });

        // debugger;
        cardField = window.paypal.CardFields({
            ...obj,
        });

        console.log("[2][ACDC.Page.init]:Start to load JS SDK");
        let nameField;
        let nameField_value;
        let numberField;
        let cvvField;
        let expiryField;
        if (cardField.isEligible()) {
            nameField = cardField.NameField({
                inputEvents: {
                    onChange: (data: any) => {
                        // debugger;
                        // nameField_value = data;
                    },
                },
            });
            const renderPromise1 = nameField.render(
                "#card-name-field-container"
            );

            numberField = cardField.NumberField();
            const renderPromise2 = numberField.render(
                "#card-number-field-container"
            );

            cvvField = cardField.CVVField();
            const renderPromise3 = cvvField.render("#card-cvv-field-container");

            expiryField = cardField.ExpiryField();
            const renderPromise4 = expiryField.render(
                "#card-expiry-field-container"
            );

            Promise.all([
                renderPromise1,
                renderPromise2,
                renderPromise3,
                renderPromise4,
            ]).then(() => {
                setSubmitBtnDisable(false);
                // dispatch(setIsCustomizedClient(false));
            });
        } else {
            setCardFormDisplay("none");
        }
    };

    useEffect(() => {
        dispatch(setIsCustomizedClient(true));
        (async () => {
            let JSLoadParams: JSSDKParams = {
                addressCountry: "US",
            };
            let map = new Map<string, string>();
            map.set("components", "buttons,card-fields");
            JSLoadParams.additionalOptions = map;

            //2025-03-25 新增vault的参数
            if (isUseVault) {
                JSLoadParams.isUseVault = true;
                let tokenData = await generateAccessToken();
                let id_token = tokenData!.id_token;
                JSLoadParams.dataUserIdToken = id_token;
                console.log(
                    "[Vault]data-user-id-token is Generated!:",
                    id_token
                );
            }

            console.log("[1][ACDC.Page.init]:Start to load JS SDK");
            await renderJSSDK(JSLoadParams).then(renderCard);
        })();
    });

    const submitOnClick = () => {
        print_console_ACDC_btn();
        cardField.submit().catch((error: any) => {
            resultMessage(
                `Sorry, your transaction could not be processed...<br><br>${error}`
            );
        });
    };

    return (
        <>
            <div
                id="card-form"
                className={classNames({
                    display: cardFormDisplay,
                })}
            >
                <div id="card-number-field-container"></div>
                <div id="card-expiry-field-container"></div>
                <div id="card-cvv-field-container"></div>
                <div id="card-name-field-container"></div>
                <button
                    id="multi-card-field-button"
                    type="button"
                    onClick={submitOnClick}
                    disabled={submitBtnDisable}
                >
                    Pay now with Card
                </button>
            </div>
            <p id="result-message"></p>
            <CommonTextDialog ref={dialogRef} />
        </>
    );
};

export default ACDCComponents;
