
import store from "@/reducer/store";
// import { v4 as uuidv4 } from 'uuid';
import { base, generatePayPalAuthAssertion, getJsSDKClientIDSecretKey, getBearerAccessToken, handleResponse } from './API';
import { orderSlice } from "@/reducer/reducers/orderReducer";


const CreateOrderFetchAPI = async (requestBody: any) => {
    console.log("[OrderV2.ByOnlineFetch.CreateOrderAPI] CreateOrder #1, <Start>")
    const { clientID, secretKey } = getJsSDKClientIDSecretKey();

    console.log("clientID:", clientID)
    console.log("secretKey:", secretKey)
    const bearerToken = await getBearerAccessToken()
    // debugger;
    console.log("bearerToken:", bearerToken);

    // console.log(JSON.stringify(requestBody, null, "  "))
    const response = fetch(`${base}/v2/checkout/orders`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "PayPal-Partner-Attribution-Id": "PP-Test-Petro",
            Authorization: bearerToken,
            "PayPal-Auth-Assertion": generatePayPalAuthAssertion(clientID, "CMHAMMNAXCMGA"),
            // "PayPal-Request-Id": uuidv4()
            "PayPal-Request-Id": generateRandomPayPalRequestID()
        },

        body: JSON.stringify(requestBody),
    })

    const { jsonResponse, httpStatusCode } = await handleResponse(response)
    console.log("[OrderV2.ByOnlineFetch.CreateOrderAPI] CreateOrder #2, \r\n<ResponseCode>\r\n", httpStatusCode, " \r\n<Response>:\r\n", JSON.stringify(jsonResponse, null, "  "))
    let orderID = jsonResponse?.id

    //等效
    store.dispatch(orderSlice.actions.setOrderID(orderID))
    // store.dispatch(setOrderID(orderID))

    // debugger;
    return { orderID, httpStatusCode, jsonResponse }
};


const generateRandomPayPalRequestID = () => {
    let PayPal_Request_Id = (Math.random() * 100000000).toString(
        36
    );
    PayPal_Request_Id = Date.now().toString(32);
    return PayPal_Request_Id;
};

export default CreateOrderFetchAPI;
