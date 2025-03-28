import CaptureOrderAPILocal from "../../../service/OrderV2/ByExpressServer/CaptureOrderAPILocal";
import CreateOrderLocal from "../../../service/OrderV2/ByExpressServer/CreateOrderAPILocal";
import { toggleAPMButtons } from "../JSSDK/LoadAPMButton";

export const IDEALWord = "iDEAL is a payment method in the Netherlands that allows buyers to select their issuing bank from a list of options. The buyer experience, once they've been handed off to the issuing bank they selected, differs depending on the bank."

export const renderIDEALBtn = (
    redirectAfterApprove: Function
): void => {
    const createOrderObject = {
        intent: "CAPTURE",
        payment_source: {
            "ideal": {
                "country_code": "NL",
                "name": "John Doe",
                "bic": "INGBNL2A"
            }
        },
        // processing_instruction: "ORDER_COMPLETE_ON_PAYMENT_APPROVAL",
        purchase_units: [
            {

                amount: {
                    currency_code: "EUR",
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
            fundingSource: window.paypal.FUNDING.IDEAL,

        }).render('#mark-container')

        window.paypal.PaymentFields({
            fundingSource: window.paypal.FUNDING.IDEAL,
            style: {
                // style object (optional)
            },
            fields: {
                // fields prefill info (optional)
                name: {
                    value: "Test IDEAL buyer",
                },
                email: {
                    value: "jdoe@example.com",
                },
                country_code: "NL",
                "bic": "INGBNL2A"
            }
        })
            .render("#payment-fields-container");


        let button = window.paypal.Buttons({
            fundingSource: window.paypal.FUNDING.IDEAL,
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
            button.render("#paypal-button-container").then(() => {
                toggleAPMButtons(false)
            });
        }


    }
};