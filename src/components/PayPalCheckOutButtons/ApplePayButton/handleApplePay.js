import { getJsSDKClientIDSecretKey } from "@/service/OrderV2/ByOnlineFetch/API";
const IS_3rd_Party_F = false;

async function setupApplepay(callbackFunc) {
    const applepay = window.paypal.Applepay();
    const {
        isEligible,
        countryCode,
        currencyCode,
        merchantCapabilities,
        supportedNetworks,
    } = await applepay.config();

    if (!isEligible) {
        throw new Error("applepay is not eligible");
    }

    document.getElementById("applepay-container").innerHTML =
        '<apple-pay-button id="btn-appl" buttonstyle="black" type="buy" locale="en">';

    document.getElementById("btn-appl").addEventListener("click", onClick);

    async function onClick() {
        console.log({
            merchantCapabilities,
            currencyCode,
            supportedNetworks,
        });

        const paymentRequest = {
            countryCode: "CN",
            currencyCode: "USD",
            merchantCapabilities,
            supportedNetworks,
            requiredBillingContactFields: [
                "name",
                "phone",
                "email",
                "postalAddress",
            ],
            // requiredShippingContactFields: [
            //     "name",
            //     "phone",
            //     "email",
            //     "postalAddress",
            // ],
            total: {
                label: "Demo (Card is not charged)",
                amount: 100,
                type: "final",
            },
        };

        // eslint-disable-next-line no-undef
        let session = new ApplePaySession(4, paymentRequest);
        console.log("[1] Session Create");
        session.onvalidatemerchant = (event) => {
            applepay
                .validateMerchant({
                    validationUrl: event.validationURL,
                    displayName: "my Store",
                })
                .then((payload) => {
                    session.completeMerchantValidation(payload.merchantSession);
                })
                .catch((err) => {
                    console.error(err);
                    session.abort();
                });
        };
        console.log("[1] Merchant Validate Complete");
        session.onpaymentmethodselected = () => {
            session.completePaymentMethodSelection({
                newTotal: paymentRequest.total,
            });
        };
        console.log("[1]");
        const isVault = document.getElementById("is-vault").checked;
        const isReturning = document.getElementById("is-returning").checked;

        session.onpaymentauthorized = async (event) => {
            console.log(
                "Your billing address is:",
                event.payment.billingContact
            );
            console.log(
                "Your shipping address is:",
                event.payment.shippingContact
            );
            try {
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

                    console.log(
                        "PayPal_Auth_Assertion:",
                        PayPal_Auth_Assertion
                    );
                    PayPalRequestHeader["PayPal-Auth-Assertion"] =
                        PayPal_Auth_Assertion;
                }

                /* Create Order */
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
                console.log("[10]Order V2 -- Create Order is called!");
                const { id } = await fetch(
                    "https://api.sandbox.paypal.com/v2/checkout/orders",
                    {
                        method: "POST",
                        headers: PayPalRequestHeader,
                        body: JSON.stringify(order),
                    }
                ).then((res) => res.json());

                /**
                 * Confirm Payment
                 */
                debugger;
                await applepay.confirmOrder({
                    orderId: id,
                    token: event.payment.token,
                    billingContact: event.payment.billingContact,
                    //shippingContact: event.payment.shippingContact,
                    //email:event.payment.shippingContact.emailAddress,
                });
                debugger;
                /*
                 * Capture order (must currently be made on server)
                 */

                // email:event.payment.shippingContact.emailAddress,
                // console.log(
                //     event.payment.token,
                //     event.payment.billingContact,
                //     event.payment.shippingContact,
                //     event.payment.shippingContact.emailAddress
                // );

                const captureResponse = await fetch(
                    `https://api.sandbox.paypal.com/v2/checkout/orders/${id}/capture`,
                    {
                        method: "POST",
                        headers: PayPalRequestHeader,
                    }
                ).then((res) => res.json());

                console.log("Success!");
                callbackFunc(captureResponse);

                session.completePayment({
                    status: window.ApplePaySession.STATUS_SUCCESS,
                });
            } catch (err) {
                console.error(err);
                session.completePayment({
                    status: window.ApplePaySession.STATUS_FAILURE,
                });
            }
        };

        session.oncancel = () => {
            console.log("Apple Pay Cancelled !!");
        };

        session.begin();
    }
}

export const handleApplePay = (callbackFunc) => {
    console.log("handle Apple Pay Loaded!");
    if (
        window.ApplePaySession?.supportsVersion(4) &&
        window.ApplePaySession?.canMakePayments()
    ) {
        setupApplepay(callbackFunc).catch(console.error);
    } else {
        console.log("Apple Pay is not supported.");
    }
};

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

async function generateAccessToken() {
    const url = "https://api.sandbox.paypal.com/v1/oauth2/token";
    const { clientID, secretKey } = getJsSDKClientIDSecretKey();
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
