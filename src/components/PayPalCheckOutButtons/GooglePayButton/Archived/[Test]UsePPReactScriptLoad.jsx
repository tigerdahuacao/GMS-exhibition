// 因为发现Google Pay的按钮不是PayPal渲染的, 是Google 渲染的

import { FC, useEffect, useState } from "react";

import {
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer,
} from "@paypal/react-paypal-js";

const style = { layout: "vertical" };

async function createOrder() {
    // replace this url with your server
    const response = await fetch(
        "https://react-paypal-js-storybook.fly.dev/api/paypal/create-order",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            // use the "body" param to optionally pass additional order information
            // like product ids and quantities
            body: JSON.stringify({
                cart: [
                    {
                        sku: "1blwyeo8",
                        quantity: 2,
                    },
                ],
            }),
        }
    );
    const order = await response.json();
    return order.id;
}
async function onApprove(data) {
    // replace this url with your server
    const response = await fetch(
        "https://react-paypal-js-storybook.fly.dev/api/paypal/capture-order",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                orderID: data.orderID,
            }),
        }
    );
    const orderData = await response.json();
}

const ButtonWrapper = ({ showSpinner }) => {
    const [{ isPending }] = usePayPalScriptReducer();

    return (
        <>
            {showSpinner && isPending && <div className="spinner" />}
            <PayPalButtons
                style={style}
                disabled={false}
                forceReRender={[style]}
                fundingSource={undefined}
                createOrder={createOrder}
                onApprove={onApprove}
            />
        </>
    );
};

const GooglePayButton = () => {
    const [isRenderFlag, setIsRenderFlag] = useState(false);

    useEffect(() => {
        console.log("useEffect is called!");
        setTimeout(() => {
            console.log("setIsRenderFlag => true");
            setIsRenderFlag(true);
        }, 2000);
    });

    const renderGooglePayButton = () => {
        return (
            <>
                <div style={{ maxWidth: "750px", minHeight: "200px" }}>
                    <PayPalScriptProvider
                        options={{
                            clientId: "test",
                            components: "buttons",
                            currency: "USD",
                        }}
                    >
                        <ButtonWrapper showSpinner={false} />
                    </PayPalScriptProvider>
                </div>
            </>
        );
    };

    return <>{isRenderFlag && renderGooglePayButton()}</>;
};

// export default GooglePayButton;
