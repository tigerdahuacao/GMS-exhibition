
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import APM_METHOD_ENUM from '@/pages/APM/APM_METHOD_ENUM';


//默认的支付方式
const initialState = {
    selectedMethod: APM_METHOD_ENUM.Bancontact
}

export const paymentSlice = createSlice({
    name: "APM_Method",
    initialState,
    reducers: {
        setAPMMethod: (state, action: PayloadAction<APM_METHOD_ENUM>) => {
            // debugger;
            state.selectedMethod = action.payload;
        },
    },
});

export const { setAPMMethod } = paymentSlice.actions;

//获取当前的支付方式
export const getAPMMethod = (state: RootState): APM_METHOD_ENUM =>
    state.APMMethod.selectedMethod;

export default paymentSlice.reducer;
