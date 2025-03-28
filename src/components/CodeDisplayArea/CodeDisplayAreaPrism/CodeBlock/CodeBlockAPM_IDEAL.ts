export const CodeBlockAPM_IDEAL: string = 
`<script src="https://unpkg.com/@paypal/
    paypal-js@8.0.0/dist/iife/paypal-js.min.js"></script>
<div id="mark-container"></div>
<div id="payment-fields-container"></div>
<div id="paypal-button-container"></div>

<script>
    await window.paypalLoadScript({
        clientId: clientID,
        components: ["buttons","payment-fields",
            "marks","funding-eligibility","enable-funding=ideal"],
        currency:"EUR"
    });
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
                // Show a cancel page, or return to cart
            },
        });
</script>`
