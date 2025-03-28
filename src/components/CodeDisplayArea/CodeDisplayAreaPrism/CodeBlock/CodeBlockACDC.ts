export const CodeBlockACDC: string = 
`<script src="https://unpkg.com/@paypal/
        paypal-js@8.0.0/dist/iife/paypal-js.min.js">
</script>
<div>
  <div id="card-form" class="ui attached">
      <div id="card-number-field-container"></div>
      <div id="card-expiry-field-container"></div>
      <div id="card-cvv-field-container"></div>
      <div id="card-name-field-container"></div>
  </div>
   <button id="multi-card-field-button">Pay now with Card]</button>
</div>
<script>
    import { loadScript } from "@paypal/paypal-js";
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
            components: ["card-fields"],
        });
    } catch (error) {
        console.error("failed to load the PayPal JS SDK script", error);
    }

    const cardField = window.paypal.CardFields({
            createOrder: createOrderCallback,
            onApprove: approveCallBack,
        });


    if (cardField.isEligible()) {
        nameField = cardField.NameField({
            style:{ 'input': {
                'font-size': '16px',
                'font-family': 'courier, monospace',
                'font-weight': 'lighter',
                'color': '#ccc',
            }}
        });
        nameField.render("#card-name-field-container");
        cardField.NumberField().render("#card-number-field-container");
        cardField.CVVField().render("#card-cvv-field-container");
        cardField.ExpiryField().render("#card-expiry-field-container");
        // Add click listener to submit button and call the submit function on the CardField component
        document
            .getElementById("multi-card-field-button")
            .addEventListener("click", () => {
                cardField.submit().catch((error) => {
                    console.log(error)
                });
            });
    } else {
        // Hides card fields if the merchant isn't eligible
        document.querySelector("#card-form").style = "display: none";
    }
</script>`
