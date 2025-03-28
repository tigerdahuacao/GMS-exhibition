export const CodeBlockSPBStandard: string = 
`<script src="https://unpkg.com/@paypal/
             paypal-js@8.0.0/dist/iife/paypal-js.min.js">
</script>
<script>
    import { loadScript } from "@paypal/paypal-js";
    let paypal;

    async function createOrderCallback() {
        let orderID = await fetch("/payment-api/createOrder", request)
            .then((data) => data.json())
            .then((jsonData) => jsonData.id);
        return orderID;
    }
    async function approveCallBack() {
        let captureResponse = await fetch("/payment-api/captureOrder", request)
            .then((data) => data.json())
            .then((jsonData) => jsonData);
        //Your code here;
    }

    try {
        paypal = await loadScript({
            clientId: "a-test-clientID",
            components: ["buttons"],
        });

        await paypal
            .Buttons({
                createOrder: createOrderCallback,
                onApprove: approveCallBack,
                style: {
                    color: "blue",
                    shape: "pill",
                },
            })
            .render("#paypal-button-container");
    } catch (error) {
        console.error("failed to load the PayPal JS SDK script", error);
    }
</script>`
