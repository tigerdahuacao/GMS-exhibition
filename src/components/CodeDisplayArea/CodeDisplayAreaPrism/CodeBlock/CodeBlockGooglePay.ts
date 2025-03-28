export const CodeBlockGooglePay: string = 
` <script
    src="https://www.paypal.com/sdk/js?client-id=Aam3QqDEU73XYwbfy8iyKe2p2G9k6eiIMpsekTwwS2WVGANpv1dJiL8QNXAqDZWcj9MnI4dUJ_5D4_4M&buyer-country=US&currency=USD&components=googlepay"
    onload="console.log('PayPal SPB Script Loaded')"
></script>

<script
    src="https://pay.google.com/gp/p/js/pay.js"
    onload="console.log('Google Pay Script Loaded')"
></script>

 <script type="module">
    import { loadScript } from "@paypal/paypal-js";
    loadScript({
        clientId: "a-test-clientID",
        components: ["googlepay"],
    });
    document.addEventListener("DOMContentLoaded", (event) => {
        if (google && paypal.Googlepay) {
            onGooglePayLoaded().catch(console.log);
        }
    });
</script>

<script>
   /*
    * Define the version of the Google Pay API referenced when creating your configuration
    * 指定Google Pay 版本, 是必须的
    */
    const baseRequest = {
        apiVersion: 2,
        apiVersionMinor: 0,
    };

    let paymentsClient = null,
        allowedPaymentMethods = null,
        merchantInfo = null;

    /* Configure your site's support for payment methods supported by the Google Pay */
    // 参考Google Pay dev doc第6步
    function getGoogleIsReadyToPayRequest(allowedPaymentMethods) {
        console.log(
            "[5](getGoogleIsReadyToPayRequest): wrap a request object for isReadyToPay. 对象合并以提供一个符合规范的对象"
        );
        return Object.assign({}, baseRequest, {
            allowedPaymentMethods: allowedPaymentMethods,
        });
    }

    /* Fetch Default Config from PayPal via PayPal SDK */
    // 参考Google Pay dev doc第6步
    async function getGooglePayConfig() {
        console.log(
            "[3](getGooglePayConfig): Get isReadyToPay Object!确定是否能使用GooglePay进行付款"
        );
        if (allowedPaymentMethods == null || merchantInfo == null) {
            const googlePayConfig = await paypal.Googlepay().config();
            allowedPaymentMethods = googlePayConfig.allowedPaymentMethods;
            merchantInfo = googlePayConfig.merchantInfo;
        }
        return {
            allowedPaymentMethods,
            merchantInfo,
        };
    }

    /* Configure support for the Google Pay API */
    // 参考google pay dev第8步
    async function getGooglePaymentDataRequest() {
        //构建一个JS对象来说明当前网站对Google Pay API的支持情况
        const paymentDataRequest = Object.assign({}, baseRequest);
        //添加当前应用的付款方式, 在这里就是PayPal
        const { allowedPaymentMethods, merchantInfo } = await getGooglePayConfig();

        //卡相关参数
        // https://developers.google.com/pay/api/web/reference/request-objects#CardParameters
        const billingAddressParameters =
            allowedPaymentMethods?.[0]?.parameters?.billingAddressParameters;
        billingAddressParameters.phoneNumberRequired = true;
        paymentDataRequest.allowedPaymentMethods = allowedPaymentMethods;
        paymentDataRequest.transactionInfo = getGoogleTransactionInfo();
        paymentDataRequest.merchantInfo = merchantInfo;
        paymentDataRequest.merchantInfo.merchantName = "这是手动传入的Google Pay商户名";

        //使用回调 intent 加载付款数据
        paymentDataRequest.callbackIntents = ["PAYMENT_AUTHORIZATION"];
        paymentDataRequest.emailRequired = true;
        paymentDataRequest.shippingAddressRequired = true;
        paymentDataRequest.shippingAddressParameters = {
            allowedCountryCodes: ["US", "JP"],
            phoneNumberRequired: true,
        };
        paymentDataRequest.shippingOptionRequired = true;
        paymentDataRequest.shippingOptionParameters = {
            defaultSelectedOptionId: "shipping-001",
            shippingOptions: [
                {
                    id: "shipping-001",
                    label: "$0.00: Free shipping",
                    description: "Free Shipping delivered in 5 business days.",
                },
                {
                    id: "shipping-002",
                    label: "$1.99: Standard shipping",
                    description: "Standard shipping delivered in 3 business days.",
                },
                {
                    id: "shipping-003",
                    label: "$1000: Express shipping",
                    description: "Express shipping delivered in 1 business day.",
                },
            ],
        };
        return paymentDataRequest;
    }

    function onPaymentAuthorized(paymentData) {
        return new Promise(function (resolve, reject) {
            console.log("[9]The user authorized this transaction!");
            processPayment(paymentData)
                .then(function (data) {
                    resolve({ transactionState: "SUCCESS" });
                })
                .catch(function (errDetails) {
                    resolve({ transactionState: "ERROR" });
                });
        });
    }

    //初始化paymentClient  参照Google Pay Dev第五步
    function getGooglePaymentsClient() {
        console.log(
            "[2](getGooglePaymentsClient): Google Pay Client is initialize!"
        );
        if (paymentsClient === null) {
            paymentsClient = new google.payments.api.PaymentsClient({
                environment: "TEST",
                // environment: "PRODUCTION",
                paymentDataCallbacks: {
                    //注册: 在买家授权之后
                    //参考Dev Doc第11步 设置授权付款
                    onPaymentAuthorized: onPaymentAuthorized,

                    //这里还可以添加onPaymentDataChanged的回调函数, 用于解决运费/促销的问题
                    //参考Dev Doc第12步 设置授权付款
                },
            });
        }
        return paymentsClient;
    }

    // 主要方法, 当来自Google的脚本加载后做的事情
    async function onGooglePayLoaded() {
        console.log("[1](onGooglePayLoaded): Google Pay Script is loaded!");
        const paymentsClient = getGooglePaymentsClient();
        const { allowedPaymentMethods } = await getGooglePayConfig();
        console.log("[4](onGooglePayLoaded): execute isReadyToPay() function");
        paymentsClient
            .isReadyToPay(getGoogleIsReadyToPayRequest(allowedPaymentMethods))
            .then(function (response) {
                if (response.result) {
                    console.log(
                        "[6](onGooglePayLoaded.isReadyToPay): Congratulation! Google Pay is support!"
                    );
                    addGooglePayButton();
                }
            })
            .catch(function (err) {
                console.error(err);
            });
    }

    // Add button after everything goes well
    function addGooglePayButton() {
        console.log("[7](addGooglePayButton): Add Google Pay Button.");
        const paymentsClient = getGooglePaymentsClient();
        const button = paymentsClient.createButton({
            onClick: onGooglePaymentButtonClicked,
        });
        document.getElementById("button-container").appendChild(button);
    }

    function getGoogleTransactionInfo() {
        return {
            countryCode: "US",
            currencyCode: "USD",
            totalPriceStatus: "FINAL",
            totalPrice: "33.98",
            totalPriceLabel: "Total",
        };
    }

    // click事件的handler
    async function onGooglePaymentButtonClicked() {
        console.log(
            "[8](onGooglePaymentButtonClicked): Google Pay Button is Clicked!."
        );
        const paymentDataRequest = await getGooglePaymentDataRequest();
        paymentDataRequest.transactionInfo = getGoogleTransactionInfo();
        const paymentsClient = getGooglePaymentsClient();

        //参考Google Pay dev doc第10步
        console.log(JSON.stringify(paymentDataRequest, null, "  "));
        // debugger;
        paymentsClient.loadPaymentData(paymentDataRequest);
        //其他的支付网关比如使用银行卡之类的到这里可能就结束了, 从paymentsClient获取token并传给第三方支付机构
    }

    async function processPayment(paymentData) {
        try {
            const order = {
            ....
            };
            const accessToken = await generateAccessToken();
            // console.log(accessToken)

            /* Create Order */
            console.log("[10]Order V2 -- Create Order is called!");
            const { id } = await fetch(
                "https://api.sandbox.paypal.com/v2/checkout/orders",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: 'Bearer Token',
                    },
                    body: JSON.stringify(order),
                }
            ).then((res) => res.json());

            const googleConfirmRes = await paypal.Googlepay().confirmOrder({
                orderId: id,
                paymentMethodData: paymentData.paymentMethodData,
                // shippingAddress: paymentData.shippingAddress,
                email: paymentData.email,
            });
            const { status } = googleConfirmRes;
            console.log("Status: google pay confirm order:", status);

            //Get Order Detail
            const getOrderDetail = await fetch(
                'https://api.sandbox.paypal.com/v2/checkout/orders/{id}'
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: 'Bearer Token',
                    },
                }
            ).then((res) => res.json());

            if (status === "PAYER_ACTION_REQUIRED") {
                console.log(
                    "==== Confirm Payment Completed Payer Action Required ====="
                );
                paypal
                    .Googlepay()
                    .initiatePayerAction({ orderId: id })
                    .then(async () => {
                        console.log("===== Payer Action Completed =====");
                        /** GET Order */s
                        const orderResponse = await fetch('/orders/{id}', {
                            method: "GET",
                        }).then((res) => res.json());
                        console.log("===== 3DS Contingency Result Fetched =====");
                        console.log(
                            orderResponse?.payment_source?.google_pay?.card
                                ?.authentication_result
                        );
                        /* CAPTURE THE ORDER*/
                        const captureResponse = await fetch(
                            '/orders/{id}/capture',
                            {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                    Authorization: 'Bearer Token',
                                },
                            }
                        ).then((res) => res.json());
                        console.log(" ===== Order Capture Completed ===== ");
                    });
            } else if (status === "APPROVED") {
                /* Capture the Order */
                console.log("[11]Order V2 -- Capture Order is called!");

                const captureResponse = await fetch(
                    'https://api.sandbox.paypal.com/v2/checkout/orders/{id}/capture/',
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: 'Bearer Token',
                        },
                    }
                ).then((res) => res.json());
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

    async function generateAccessToken() {
        const url = "https://api.sandbox.paypal.com/v1/oauth2/token";
        let accessToken = btoa("client:Secret);
        let params = {
            grant_type: "client_credentials",
        };
        let formData = new URLSearchParams(params);
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: 'Basic Auth',
            },
            body: formData,
        });
        const data = await response.json();
        return data.access_token;
    }
</script>`
