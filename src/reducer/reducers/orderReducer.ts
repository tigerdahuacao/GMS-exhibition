
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";


interface OrderInfo {
    orderID: string,
    transactionID: string
}



const initialState: OrderInfo = {
    orderID: "",
    transactionID: ""
}

export const orderSlice = createSlice({
    name: "orderInfo",
    initialState,
    reducers: {
        setOrderID: (
            state,
            action: PayloadAction<string>
        ) => {

            state.orderID = action.payload;
        },
        setTransactionID: (
            state,
            action: PayloadAction<string>
        ) => {
            state.transactionID = action.payload;
        },
    },
});


export const {
    setOrderID, setTransactionID
} = orderSlice.actions


export const getOrderID = (state: RootState) =>
    state.orderInfo.orderID;

export const getTransactionID = (state: RootState) =>
    state.orderInfo.transactionID;

export default orderSlice.reducer;
