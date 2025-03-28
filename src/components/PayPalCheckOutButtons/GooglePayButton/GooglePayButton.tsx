import renderJSSDK, { JSSDKParams } from "@/service/LoadPayPalScript/renderJSSDK";
import { FC, useEffect, useRef } from "react";
import CommonTextDialog, {
    DialogRef,
} from "@/components/Dialog/CommonTextDialog";

//@ts-ignore
import { GooglePayConstructor } from "./GooglePayLoad";

const GooglePayButton: FC = () => {
    const dialogRef = useRef<DialogRef>(null);

    useEffect(() => {
        const additionalOptions = new Map<string, string>();
        additionalOptions.set("components", "googlepay");
        let JSLoadParams: JSSDKParams = {
            addressCountry: "US",
            additionalOptions: additionalOptions,
        };

        const GoogleLoadScriptPromise = new Promise<void>((resolve) => {
            const gpError = document.getElementById("google-pay-error-msg");
            if (gpError) gpError.innerText = "Loading Google Pay...";

            let mScript = document.createElement("script");
            const url = "https://pay.google.com/gp/p/js/pay.js";
            mScript.src = url;
            document.getElementById("root")?.appendChild(mScript);
            mScript.onload = function () {
                console.log(
                    "--[GoogleLoadScriptPromise]Google Pay Script Loaded"
                );
                resolve();
            };
        });

        const PayPalLoadScriptPromise: Promise<void> = renderJSSDK(JSLoadParams);

        Promise.all([GoogleLoadScriptPromise, PayPalLoadScriptPromise])
            .then(() => {
                console.log("Both Promises are resolved!");
                const gpError = document.getElementById("google-pay-error-msg");
                if (gpError) gpError.innerText = "";

                if (window.google && window.paypal.Googlepay) {
                    console.log("[Google&PayPal Object checked!]");

                    const googlePayStarter = new GooglePayConstructor(
                        (captureResponse: any) => {
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
                        },
                        "ShowSuccess"
                    );
                    googlePayStarter.onGooglePayLoaded().catch(console.log);
                }
                // onGooglePayLoaded().catch(console.log);
            })
            .catch(() => {
                const gpError = document.getElementById("google-pay-error-msg");
                if (gpError)
                    gpError.innerText =
                        "Google Pay is not supported, please change your browser.";
            });
    });

    return (
        <>
            <div
                id="google-button-container"
                // className=" w-full object-contain  inline-block "
                // style={{
                //     width: "403px",
                //     height: "63px;",
                // }}
            >
                <CommonTextDialog ref={dialogRef} />
                <div id="google-pay-error-msg"></div>
            </div>
        </>
    );
};

export default GooglePayButton;
