import CaptureOrderAPILocal from "../../../service/OrderV2/ByExpressServer/CaptureOrderAPILocal";
import CreateOrderLocal from "../../../service/OrderV2/ByExpressServer/CreateOrderAPILocal";

import { toggleAPMButtons } from "../JSSDK/LoadAPMButton";

export const P24Word = "Przelewy24 is a payment method in Poland.";

export const renderP24Btn = (
    redirectAfterApprove: Function
): void => {
    const createOrderObject = {
        intent: "CAPTURE",
        payment_source: {
            p24: {
                country_code: "PL",
                name: "John Doe",
                "email": "john.doe@example.com"
            },
            "experience_context": {
                "return_url": "https://example.com/returnUrl",
                "cancel_url": "https://example.com/cancelUrl",
                "name": {
                    "given_name": "PayPal",
                    "surname": "Test Customer"
                },
                "address": {
                    "address_line_1": "King avuene",
                    "admin_area_1": "Texas",
                    "postal_code": "78710",
                    "country_code": "US"
                },
                "email_address": "petro-test01-us@cctest.com",
                "password": "Qq111222333",
                "phone": {
                    "phone_type": "MOBILE",
                    "phone_number": {
                        "national_number": "3225551212"
                    }
                }
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
                ,
                "shipping": {
                    "name": {
                        "full_name": "Jane Doe"
                    }, "address": {
                        "address_line_1": "floor 870",
                        "address_line_2": "Gyeongin-ro, Yeongdeungpo-gu",
                        "admin_area_2": "Seoul",
                        "admin_area_1": "Seoul",
                        "postal_code": "36300",
                        "country_code": "KR"
                    }
                },
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
            fundingSource: window.paypal.FUNDING.P24,
        }).render('#mark-container')


        window.paypal.PaymentFields({
            fundingSource: window.paypal.FUNDING.P24,
            style: {
                // style object (optional)
            },
            fields: {
                // fields prefill info (optional)
                name: {
                    value: "Test P24 buyer",
                },
                email: {
                    value: "jdoe@example.com",
                }
            }
        })
            .render("#payment-fields-container");


        let button = window.paypal.Buttons({
            fundingSource: window.paypal.FUNDING.P24,
            style: {
                label: "pay",
            },

            createOrder: function () {
                return CreateOrderLocal(createOrderObject);

                // return "2B3622168Y845200E"
            },

            onApprove: async function (data: any, actions: any) {
                // debugger;
                await CaptureOrderAPILocal();
                redirectAfterApprove();
            },
            onCancel: function (data: any) {
                // window.alert("Cancel!")
                // window.close();
                // Show a cancel page, or return to cart
            },
        });
        if (button.isEligible()) {
            button.render("#paypal-button-container").then(() => {
                toggleAPMButtons(false)
            })
            // console.clear()

            // let count = 0;

            // let interval = setInterval(() => {
            //     console.log(button);
            //     console.log(button.state)
            //     count++
            //     if (count >= 10) clearInterval(interval)
            // }, 300)
        }

        //渲染多个
        // var FUNDING_SOURCES = [
        //     window.paypal.FUNDING.P24,
        //     window.paypal.FUNDING.BLIK,
        //     window.paypal.FUNDING.IDEAL,
        //     window.paypal.FUNDING.SOFORT,
        // ];

        // FUNDING_SOURCES.forEach(function (fundingSource) {
        //     // Initialize the buttons
        //     var button = window.paypal.Buttons({
        //         fundingSource: fundingSource,
        //         style: {
        //             label: "pay",
        //         },
        //         createOrder: function () {
        //             return CreateOrderLocal(createOrderObject);
        //             // return "2B3622168Y845200E"
        //         },
        //         onApprove: async function (data: any, actions: any) {
        //             // debugger;
        //             await CaptureOrderAPILocal();
        //             redirectAfterApprove();
        //         }, onCancel: function (data: any) {

        //         },
        //     });

        //     // Check if the button is eligible
        //     if (button.isEligible()) {
        //         // Render the standalone button for that funding source
        //         button.render("#paypal-button-container");
        //     }
        // });



    }
};