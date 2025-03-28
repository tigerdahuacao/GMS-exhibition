import { getTransactionID } from './../../reducer/reducers/orderReducer';
import CaptureOrderFetchAPI from "@/service/OrderV2/ByOnlineFetch/CaptureOrderAPI";
import CreateOrderFetchAPI from "@/service/OrderV2/ByOnlineFetch/CreateOrderAPI";

//[2025-03-25](Feat) 这个方法实际上已经废弃了. 现在ACDC的createOrder已经不再使用这个方法了. 和SPB的支付使用同样的方法: getCreateOrderObjectFn
export async function createOrderCallback(data: any) {
    console.log("[checkout.js] createOrderCallback #1");
    console.log(
        "[checkout.js] createOrderCallback #2 | PaymentSource:",
        data.paymentSource
    );
    try {

        const payloadBody = {
            // application_context: {
            //     return_url: "https://www.bing.com",
            // },
            intent: "CAPTURE",
            payment_source: {
                card: {
                    attributes: {
                        verification: {
                            // method: "SCA_ALWAYS",
                            method: "SCA_WHEN_REQUIRED",
                        },
                    },
                    experience_context: {
                        shipping_preference: "NO_SHIPPING",
                        return_url: "https://example.com/returnUrl",
                        cancel_url: "https://example.com/cancelUrl",
                    },
                },
            },
            purchase_units: [
                {
                    amount: {
                        currency_code: "USD",
                        value: 100,
                    },
                },
            ],
        }


        const { orderID, httpStatusCode } = await CreateOrderFetchAPI(payloadBody);

        if (String(httpStatusCode).startsWith("2")) {
            console.log("Create Order Success: orderID:", orderID);
            return orderID;
        } else {
            const errorDetail = httpStatusCode?.details?.[0];
            const errorMessage = errorDetail
                ? `${errorDetail.issue} ${errorDetail.description} (${httpStatusCode.debug_id})`
                : JSON.stringify(httpStatusCode);

            throw new Error(errorMessage);
        }

    } catch (error) {
        console.error(error);
        resultMessage(`Could not initiate PayPal Checkout...<br><br>${error}`);
    }
}



export async function onApproveCallback(data: any, actions: any) {

    console.log("[checkout.js] onApproveCallback #1");
    try {
        const { transactionID, jsonResponse, httpStatusCode } = await CaptureOrderFetchAPI();


        const orderData = jsonResponse;
        // Three cases to handle:
        //   (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
        //   (2) Other non-recoverable errors -> Show a failure message
        //   (3) Successful transaction -> Show confirmation or thank you message

        const transaction = getTransaction(orderData);
        // debugger;
        const errorDetail = orderData?.details?.[0];

        // this actions.restart() behavior only applies to the Buttons component
        if (
            errorDetail?.issue === "INSTRUMENT_DECLINED" &&
            !data.card &&
            actions
        ) {
            // (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
            // recoverable state, per https://developer.paypal.com/docs/checkout/standard/customize/handle-funding-failures/
            return actions.restart();
        } else if (
            errorDetail ||
            !transaction ||
            transaction.status === "DECLINED"
        ) {
            // (2) Other non-recoverable errors -> Show a failure message
            let errorMessage;
            if (transaction) {
                errorMessage = `Transaction ${transaction.status}: ${transaction.id}`;
            } else if (errorDetail) {
                errorMessage = `${errorDetail.description} (${orderData.debug_id})`;
            } else {
                errorMessage = JSON.stringify(orderData);
            }

            throw new Error(errorMessage);
        } else {
            // (3) Successful transaction -> Show confirmation or thank you message
            // Or go to another URL:  actions.redirect('thank_you.html');
            setSuccessACDCResultMsg(transaction);
            return transaction;
        }
    } catch (error) {
        setFailACDCResultMsg(error);
    }
}

export const setSuccessACDCResultMsg = (transaction: any) => {
    resultMessage(
        `Transaction ${transaction.status}: ${transaction.id}<br><br>See console for all available details`
    );
    return transaction;
};

export const setFailACDCResultMsg = (error: any) => {
    console.error(error);
    resultMessage(
        `Sorry, your transaction could not be processed...<br><br>${error}`
    );
}

export function getTransaction(orderData: any) {
    const transaction =
        orderData?.purchase_units?.[0]?.payments?.captures?.[0] ||
        orderData?.purchase_units?.[0]?.payments?.authorizations?.[0];
    return transaction
}

export function resultMessage(message: string) {

    const container = document.querySelector("#result-message");
    if (container)
        container.innerHTML = message;
}

export function print_console_ACDC_btn() {
    console.log(
        `%c
          _____ _____   _____  
    /\\   / ____|  __ \\ / ____| 
   /  \\ | |    | |  | | |      
  / /\\ \\| |    | |  | | |      
 / ____ \\ |____| |__| | |____  
/_/    \\_\\_____|_____/ \\_____| 
  `,
        "color:blue"
    );
}
