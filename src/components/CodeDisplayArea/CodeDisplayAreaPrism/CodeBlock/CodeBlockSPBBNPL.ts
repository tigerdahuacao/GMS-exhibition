export const CodeBlockSPBBNPL: string = 
`<script src="https://unpkg.com/@paypal/
             paypal-js@8.0.0/dist/iife/paypal-js.min.js">
</script>
<script>
    await window.paypalLoadScript({
                clientId: clientID,
                components: ["buttons"],
            });

    await paypal
        .Buttons({
            fundingSource: window.paypal.FUNDING.PAYLATER,
            createOrder: createOrderCallback,
            onApprove: approveCallBack,
        })
        .render("#paypal-button-container");
</script>`
