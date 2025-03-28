import renderJSSDK, { JSSDKParams } from "@/service/LoadPayPalScript/renderJSSDK";
import { FC, useEffect, useRef } from "react";

import CommonTextDialog, {
    DialogRef,
} from "@/components/Dialog/CommonTextDialog";

//@ts-ignore
import { handleApplePay } from "./handleApplePay";

const ApplePayButton: FC = () => {
    const dialogRef = useRef<DialogRef>(null);

    useEffect(() => {
        const additionalOptions = new Map<string, string>();
        additionalOptions.set("components", "applepay");
        let JSLoadParams: JSSDKParams = {
            addressCountry: "US",
            additionalOptions: additionalOptions,
        };

        const ApplePayLoadScriptPromise = new Promise<void>((resolve) => {
            let mScript = document.createElement("script");
            const url =
                "https://applepay.cdn-apple.com/jsapi/v1/apple-pay-sdk.js";
            mScript.src = url;
            document.getElementById("root")?.appendChild(mScript);
            mScript.onload = function () {
                console.log(
                    "--[ApplePayLoadScriptPromise]Apple Pay Script Loaded"
                );
                resolve();
            };
        });

        const vConsoleLoadScriptPromise = new Promise<void>((resolve) => {
            let mScript = document.createElement("script");
            const url =
                "https://unpkg.com/vconsole@latest/dist/vconsole.min.js";
            mScript.src = url;
            document.getElementById("root")?.appendChild(mScript);
            mScript.onload = function () {
                console.log(
                    "--[vConsoleLoadScriptPromise]vconsole Pay Script Loaded"
                );
                resolve();
            };
        });

        const PayPalLoadScriptPromise: Promise<void> = renderJSSDK(JSLoadParams);

        Promise.all([
            ApplePayLoadScriptPromise,
            PayPalLoadScriptPromise,
            vConsoleLoadScriptPromise,
        ]).then(() => {
            console.log("All Promises are resolved!");
            if (window.ApplePaySession && window.paypal.Applepay) {
                console.log("[Apple Pay src Object checked!]");

                handleApplePay((captureResponse: any) => {
                    // debugger;
                    const transaction =
                        captureResponse?.purchase_units?.[0]?.payments
                            ?.captures?.[0]["id"];
                    console.log(
                        JSON.stringify(captureResponse, null, "  ")
                    );
                    setTimeout(() => {
                        dialogRef.current?.openDialogWithCustomizedContent(
                            "Congratulation!",
                            "success",
                            `Your transaction ${transaction} is Completed!`
                        );
                    }, 1500);
                });
               
            }
    
        });
    });

    return (
        <>
            <div id="applepay-container"></div>
            <CommonTextDialog ref={dialogRef} />
        </>
    );
};

export default ApplePayButton;
