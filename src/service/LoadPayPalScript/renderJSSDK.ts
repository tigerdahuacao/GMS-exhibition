import { Input } from '@mui/material';
import { BuyerInfo } from '../../reducer/reducers/buyerInfoReducer';
import { getJsSDKClientIDSecretKey } from '../OrderV2/ByOnlineFetch/API';


export interface JSSDKParams {
    input?: Function, //在SDK加载完成, 也就是这里的onload回调函数里的自定义执行
    addressCountry: string,
    additionalOptions?: Map<string, string>,
    isUseVault?: boolean, //2025-01-19 增加控制vault的开关参数
    dataUserIdToken?: string, //2025-01-19 增加data-user-id-token
    [key: string]: any;
}

const renderJSSDK = function (loadParam: JSSDKParams) {
    let { input, addressCountry, additionalOptions, isUseVault = false, dataUserIdToken } = loadParam;
    // debugger;
    let additionalParams: string[] = new Array<string>();
    if (additionalOptions) {
        additionalOptions.forEach((value, key) => {
            additionalParams.push(`${key}=${value}`)
        })
    }

    return new Promise<void>((resolve) => {
        let PayPal_SPB_JS_SDK_LoadScript = document.createElement("script");
        console.log("[UseJSSDK.ts] PayPal JS SDK load!");
        const { clientID, secretKey } = getJsSDKClientIDSecretKey();

        const url = `https://www.paypal.com/sdk/js?client-id=${clientID}&buyer-country=${addressCountry}${additionalParams.length > 0 ? "&" + additionalParams.join("&") : ""}`;
        console.log("[UseJSSDK.ts] Smart Payment button Url:\r\n", `>> ${url}`)
        PayPal_SPB_JS_SDK_LoadScript.src = url;
        PayPal_SPB_JS_SDK_LoadScript.async = false;

        console.log(`%c["renderJSSDK.ts"]isUseVault:`, "color:green", isUseVault);
        console.log(`%c["renderJSSDK.ts"]data-user-id-token:`, "color:green", dataUserIdToken);

        if (isUseVault) {
            PayPal_SPB_JS_SDK_LoadScript.setAttribute("data-user-id-token", dataUserIdToken || "");
        }
        document
            .getElementById("root")
            ?.appendChild(PayPal_SPB_JS_SDK_LoadScript);
        // console.clear();

        PayPal_SPB_JS_SDK_LoadScript.onload = function () {
            console.log("--[UseJSSDK.ts] SDK load Complete!");
            input && input.call(this);
            resolve();
        };
    });
};
export default renderJSSDK;
