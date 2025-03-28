import CaptureOrderAPILocal from "../../../service/OrderV2/ByExpressServer/CaptureOrderAPILocal";
import CreateOrderLocal from "../../../service/OrderV2/ByExpressServer/CreateOrderAPILocal";

import { toggleAPMButtons } from "../JSSDK/LoadAPMButton";

export const BLIKWord = "BLIK is a payment method in Poland."

export const renderBLIKBtn = (
    redirectAfterApprove: Function
): void => {
    const createOrderObject = {
        intent: "CAPTURE",
        payment_source: {
            "blik": {
                "country_code": "PL",
                "name": "John Doe",
                "email": "buyer@example.com"
            }
        },
        // processing_instruction: "ORDER_COMPLETE_ON_PAYMENT_APPROVAL",
        purchase_units: [
            {

                amount: {
                    currency_code: "PLN",
                    value: "1.00",
                },
                "payee": {
                    "merchant_id": "CMHAMMNAXCMGA"
                }
            },
        ],
        application_context: {
            locale: "en-BE",
            return_url: "https://example.com/returnUrl",
            cancel_url: "https://example.com/cancelUrl",
        },
    };
    if (window.paypal) {
        let mark = document.getElementById('mark-container');
        if (mark) mark.innerHTML = "";
        window.paypal.Marks({
            fundingSource: window.paypal.FUNDING.BLIK,

        }).render('#mark-container')

        window.paypal.PaymentFields({
            fundingSource: window.paypal.FUNDING.BLIK,
            style: {
                // style object (optional)
            },
            fields: {
                // fields prefill info (optional)
                name: {
                    value: "Test BLIK buyer",
                },
                email: {
                    value: "jdoe@example.com",
                }
            }
        })
            .render("#payment-fields-container");


        let button = window.paypal.Buttons({
            fundingSource: window.paypal.FUNDING.BLIK,
            style: {
                label: "pay",
            },
            createOrder: function () {
                return CreateOrderLocal(createOrderObject);
            },
            onApprove: async function (data: any, actions: any) {
                await CaptureOrderAPILocal();
                redirectAfterApprove();
            }, onCancel: function (data: any) {
                // window.alert("Cancel!")
                // window.close();
                // Show a cancel page, or return to cart
            },
        });
        if (button.isEligible()) {
            button.render("#paypal-button-container").then(toggleAPMButtons(false));
        }
    }
};