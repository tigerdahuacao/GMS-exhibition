// import store from "@/reducer/store";
import { getJsSDKClientIDSecretKey } from "@/service/OrderV2/ByOnlineFetch/API";

/*
 * Define the version of the Google Pay API referenced when creating your configuration
 * 指定Google Pay 版本, 是必须的
 */
const baseRequest = {
    apiVersion: 2,
    apiVersionMinor: 0,
};

const { clientID, secretKey } = getJsSDKClientIDSecretKey();

const IS_3rd_Party_F = false;

let paymentsClient = null,
    allowedPaymentMethods = null,
    //merchantInfo需要包含merchantName和merchantID
    //不过这里不是很关键, 因为在使用PayPal OrderV2的时候传了merchant参数
    merchantInfo = null;

//------------------------------------------------------------------------------------------

export class GooglePayConstructor {
    #handlePaymentSuccess;
    #handleFnType;

    constructor(handlePaymentSuccessFn,handleFnType) {
        this.#handlePaymentSuccess = handlePaymentSuccessFn;
        this.#handleFnType = handleFnType;
    }

    #getGoogleTransactionInfo() {
        return {
            countryCode: "US",
            currencyCode: "USD",
            totalPriceStatus: "FINAL",
            totalPrice: "33.98",
            totalPriceLabel: "Total",
        };
    }

    /* Configure support for the Google Pay API */
    // 参考google pay dev第8步
    async #getGooglePaymentDataRequest() {
        //构建一个JS对象来说明当前网站对Google Pay API的支持情况
        const paymentDataRequest = Object.assign({}, baseRequest);
        //添加当前应用的付款方式, 在这里就是PayPal
        const { allowedPaymentMethods, merchantInfo } =
            await this.#getGooglePayConfig();

        //卡相关参数
        // https://developers.google.com/pay/api/web/reference/request-objects#CardParameters
        const billingAddressParameters =
            allowedPaymentMethods?.[0]?.parameters?.billingAddressParameters;
        billingAddressParameters.phoneNumberRequired = true;

        paymentDataRequest.allowedPaymentMethods = allowedPaymentMethods;

        // debugger;
        //添加测试的交易信息

        paymentDataRequest.transactionInfo = this.#getGoogleTransactionInfo();
        paymentDataRequest.merchantInfo = merchantInfo;

        // paymentDataRequest.merchantInfo.merchantName = "AAAABBB";
        // debugger;

        //使用回调 intent 加载付款数据
        paymentDataRequest.callbackIntents = ["PAYMENT_AUTHORIZATION"];

        paymentDataRequest.shippingAddressRequired = true;
        paymentDataRequest.emailRequired = true;

        return paymentDataRequest;
    }

    //------------------------------------------------------------------------------------------

    // 主要方法, 当来自Google的脚本加载后做的事情
    async onGooglePayLoaded() {
        console.log("[1](onGooglePayLoaded): Google Pay Script is loaded!");
        const paymentsClient = this.#getGooglePaymentsClient();
        const { allowedPaymentMethods } = await this.#getGooglePayConfig();

        console.log("[4](onGooglePayLoaded): execute isReadyToPay() function");

        try {
            let response = await paymentsClient.isReadyToPay(
                this.#getGoogleIsReadyToPayRequest(allowedPaymentMethods)
            );
            if (response.result) {
                console.log(
                    "[6](onGooglePayLoaded.isReadyToPay): Congratulation! Google Pay is support!"
                );
                this.#addGooglePayButton();
            }
        } catch (err) {
            const gpError = document.getElementById("google-pay-error-msg");
            gpError.innerText = ("Google Pay is not supported, please change your browser.")

            console.error(err);
        }
    }

    //初始化paymentClient  参照Google Pay Dev第五步
    #getGooglePaymentsClient() {
        console.log(
            "[2](getGooglePaymentsClient): Google Pay Client is initialize!"
        );
        const handleFn = this.#handlePaymentSuccess;
        const handleFnType = this.#handleFnType;
        if (paymentsClient === null) {
            paymentsClient = new window.google.payments.api.PaymentsClient({
                environment: "TEST",
                // environment: "PRODUCTION",
                paymentDataCallbacks: {
                    //注册: 在买家授权之后
                    //参考Dev Doc第11步 设置授权付款
                    // onPaymentAuthorized: this.#onPaymentAuthorized,
                    onPaymentAuthorized: (paymentData) => {                        
                        // debugger;
                        return new Promise(function (resolve, reject) {
                            console.log(
                                "[9]The user authorized this transaction!"
                            );
                            processPayment(paymentData, handleFn, handleFnType)
                                .then(function (data) {      
                                                         
                                    resolve({ transactionState: "SUCCESS" });
                                })
                                .catch(function (errDetails) {
                                    resolve({ transactionState: "ERROR" });
                                });
                        });
                    },

                    //这里还可以添加onPaymentDataChanged的回调函数, 用于解决运费/促销的问题
                    //参考Dev Doc第12步 设置授权付款
                },
            });
        }
        return paymentsClient;
    }

    /* Fetch Default Config from PayPal via PayPal SDK */
    // 参考Google Pay dev doc第6步
    async #getGooglePayConfig() {
        console.log(
            "[3](getGooglePayConfig): Get isReadyToPay Object!确定是否能使用GooglePay进行付款"
        );
        if (allowedPaymentMethods == null || merchantInfo == null) {
            const googlePayConfig = await window.paypal.Googlepay().config();
            allowedPaymentMethods = googlePayConfig.allowedPaymentMethods;
            merchantInfo = googlePayConfig.merchantInfo;
        }
        return {
            allowedPaymentMethods,
            merchantInfo,
        };
    }

    /* Configure your site's support for payment methods supported by the Google Pay */
    // 参考Google Pay dev doc第6步
    #getGoogleIsReadyToPayRequest(allowedPaymentMethods) {
        console.log(
            "[5](getGoogleIsReadyToPayRequest): wrap a request object for isReadyToPay. 对象合并以提供一个符合规范的对象"
        );
        return Object.assign({}, baseRequest, {
            allowedPaymentMethods: allowedPaymentMethods,
        });
    }

    // Add button after everything goes well
    #addGooglePayButton() {
        console.log("[7](addGooglePayButton): Add Google Pay Button.");
        const paymentsClient = this.#getGooglePaymentsClient();
        // https://developers.google.com/pay/api/web/guides/brand-guidelines#payment-buttons-assets
        const button = paymentsClient.createButton({
            onClick: this.#onGooglePaymentButtonClicked.bind(this),
            buttonSizeMode: "fill",
            buttonRadius: 4,
        });
        document.getElementById("google-button-container").appendChild(button);
    }

    // click事件的handler
    async #onGooglePaymentButtonClicked() {
        console.log(
            "[8](onGooglePaymentButtonClicked): Google Pay Button is Clicked!."
        );

        const paymentDataRequest = await this.#getGooglePaymentDataRequest();
        paymentDataRequest.transactionInfo = this.#getGoogleTransactionInfo();
        const paymentsClient = this.#getGooglePaymentsClient();

        //参考Google Pay dev doc第10步
        console.log(JSON.stringify(paymentDataRequest, null, "  "));
        // debugger;
        paymentsClient.loadPaymentData(paymentDataRequest);
        //其他的支付网关比如使用银行卡之类的到这里可能就结束了, 从paymentsClient获取token并传给第三方支付机构
    }

    // #onPaymentAuthorized(paymentData) {
    //     return new Promise(function (resolve, reject) {
    //         console.log("[9]The user authorized this transaction!");
    //         processPayment(paymentData)
    //             .then(function (data) {
    //                 this.#handlePaymentSuccess.call();
    //                 debugger;
    //                 resolve({ transactionState: "SUCCESS" });
    //             })
    //             .catch(function (errDetails) {
    //                 resolve({ transactionState: "ERROR" });
    //             });
    //     });
    // }
}


//------------------------------------------------------------------------------------------

async function processPayment(paymentData,handleCallBackFunction,handleFnType) {
   
    try {
        // const { currencyCode, totalPrice } = getGoogleTransactionInfo();
        const order = {
            intent: "CAPTURE",
            purchase_units: [
                {
                    reference_id: "default",
                    description: "This a display Product",
                    // "invoice_id": "24212065573227",
                    custom_id: "shoppaas_1722304979933",
                    items: [
                        {
                            name: "3D Surround Open OWS Bluetooth-Kopfhörer",
                            description: "",
                            sku: "Schwarz-orange",
                            quantity: 1,
                            unit_amount: {
                                currency_code: "USD",
                                value: "25.99",
                            },
                            category: "PHYSICAL_GOODS",
                        },
                    ],
                    amount: {
                        currency_code: "USD",
                        value: "33.98",
                        breakdown: {
                            item_total: {
                                currency_code: "USD",
                                value: "25.99",
                            },
                            tax_total: {
                                currency_code: "USD",
                                value: "0.00",
                            },
                            shipping: {
                                currency_code: "USD",
                                value: "7.99",
                            },
                            handling: {
                                currency_code: "USD",
                                value: 0,
                            },
                            insurance: {
                                currency_code: "USD",
                                value: 0,
                            },
                            discount: {
                                currency_code: "USD",
                                value: "0.00",
                            },
                        },
                    },
                    // shipping: {
                    //     name: {
                    //         full_name: "John Lawrence",
                    //     },
                    //     address: {
                    //         address_line_1: "4135 Kimberly Way",
                    //         admin_area_1: "Montana",
                    //         admin_area_2: "WINIFRED",
                    //         postal_code: "847-651-6837",
                    //         country_code: "US",
                    //     },
                    // },
                },
            ],
            application_context: {
                brand_name: "txgsyr",
                cancel_url:
                    "https://local.zuochang.top/checkout/payment/f5a23f70a42c294a5b9178e18c516a9b?step=payment&pay_method=pay",
                return_url:
                    "https://local.zuochang.top/checkout/payment/f5a23f70a42c294a5b9178e18c516a9b?step=payment&pay_method=pay",
                // shipping_preference: "SET_PROVIDED_ADDRESS",
                user_action: "PAY_NOW",
            },
            // "processing_instruction": "ORDER_COMPLETE_ON_PAYMENT_APPROVAL"
        };
        const accessToken = await generateAccessToken();
        // console.log(accessToken)

        const PayPalRequestHeader = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        };
        if (IS_3rd_Party_F) {
            const PayPal_Auth_Assertion = generatePayPalAuthAssertion(
                window.clientID,
                "JASJ9YWJXPAHY"
            );

            console.log("PayPal_Auth_Assertion:", PayPal_Auth_Assertion);
            PayPalRequestHeader["PayPal-Auth-Assertion"] = PayPal_Auth_Assertion
        }

        /* Create Order */
        console.log("[10]Order V2 -- Create Order is called!");
        const { id } = await fetch(
            "https://api.sandbox.paypal.com/v2/checkout/orders",
            {
                method: "POST",
                headers: PayPalRequestHeader,
                body: JSON.stringify(order),
            }
        ).then((res) => res.json());

        console.log("paymentData:");
        console.log(JSON.stringify(paymentData, null, "  "));

        console.log("PayPal order id:", id);

        // paymentData.paymentMethodData.info.billingAddress.email =
        //     paymentData.email;

        // debugger;
        const googleConfirmRes = await window.paypal.Googlepay().confirmOrder({
            orderId: id,
            paymentMethodData: paymentData.paymentMethodData,
            // shippingAddress: paymentData.shippingAddress,
            email: paymentData.email,
        });
        console.log("googleConfirmRes:");
        console.log(JSON.stringify(googleConfirmRes, null, "  "));

        const { status } = googleConfirmRes;

        console.log("Status: google pay confirm order:", status);

        //Get Order Detail
        const getOrderDetail = await fetch(
            `https://api.sandbox.paypal.com/v2/checkout/orders/${id}`,
            {
                method: "GET",
                headers: PayPalRequestHeader,
            }
        ).then((res) => res.json());

        console.log(JSON.stringify(getOrderDetail, null, "  "));

        //TODO
        //这里是做Strong Customer Authentication (SCA)的验证, 但是我还没有试出来如何让状态变为PAYER_ACTION_REQUIRED
        if (status === "PAYER_ACTION_REQUIRED") {
            console.log(
                "==== Confirm Payment Completed Payer Action Required ====="
            );
            window.paypal
                .Googlepay()
                .intiatePayerAction({ orderId: id })
                .then(async () => {
                    console.log("===== Payer Action Completed =====");
                    /** GET Order */
                    const orderResponse = await fetch(`/orders/${id}`, {
                        method: "GET",
                    }).then((res) => res.json());
                    console.log("===== 3DS Contingency Result Fetched =====");
                    console.log(
                        orderResponse?.payment_source?.google_pay?.card
                            ?.authentication_result
                    );
                    /* CAPTURE THE ORDER*/
                    const captureResponse = await fetch(
                        `/orders/${id}/capture`,
                        {
                            method: "POST",
                            headers: PayPalRequestHeader,
                        }
                    ).then((res) => res.json());
                    console.log(" ===== Order Capture Completed ===== ");
                });
        } else if (status === "APPROVED") {
            /* Capture the Order */
            console.log("[11]Order V2 -- Capture Order is called!");

            const captureResponse = await fetch(
                `https://api.sandbox.paypal.com/v2/checkout/orders/${id}/capture`,
                {
                    method: "POST",
                    headers: PayPalRequestHeader,
                }
            ).then((res) => res.json());

            console.log("Success!");

            // console.log("captureResponse:");
            // console.log(JSON.stringify(captureResponse, null, "  "));

            if(handleFnType = "ShowSuccess"){
                handleCallBackFunction(captureResponse);
            }


            return { transactionState: "SUCCESS" };
        } else {
            return { transactionState: "ERROR" };
        }
    } catch (err) {
        return {
            transactionState: "ERROR",
            error: {
                message: err.message,
            },
        };
    }
}
//------------------------------------------------------------------------------------------

async function generateAccessToken() {
    const url = "https://api.sandbox.paypal.com/v1/oauth2/token";

    let accessToken = btoa(`${clientID}:${secretKey}`);

    let params = {
        grant_type: "client_credentials",
    };
    let formData = new URLSearchParams(params);

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Basic ${accessToken}`,
        },
        body: formData,
    });
    const data = await response.json();
    // console.log(data)
    console.log(data.access_token);
    return data.access_token;
}

const generatePayPalAuthAssertion = (clientID, merchantID) => {
    let PayPal_Auth_Assertion;
    let to_encode = {
        iss: clientID,
        payer_id: merchantID,
    };

    let to_encode_str = JSON.stringify(to_encode);
    let encoded_str = btoa(to_encode_str);
    PayPal_Auth_Assertion = `eyJhbGciOiJub25lIn0=.${encoded_str}.`;
    return PayPal_Auth_Assertion;
};
