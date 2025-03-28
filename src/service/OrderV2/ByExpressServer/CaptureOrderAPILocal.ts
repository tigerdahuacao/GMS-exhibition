import store from "../../../reducer/store";
import { orderSlice } from '../../../reducer/reducers/orderReducer';

const CaptureOrderAPI = () => {
    // debugger;
    const orderID = store.getState().orderInfo.orderID;
    return fetch("http://localhost:23009/captureOrder", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            orderID: orderID
        })
    }).then(res => res.json()).then(data => {
        try {
            const transactionID = data["purchase_units"][0]["payments"]["captures"][0].id;
            console.log(transactionID)
            store.dispatch(orderSlice.actions.setTransactionID(transactionID))
            return transactionID
        } catch (error) {
            // debugger;
            console.log("发生错误了")
            // throw error
        }

    });
};

export default CaptureOrderAPI;
