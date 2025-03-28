import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import PAYMENT_METHOD from "@/enum/PAYMENT_METHOD";

export interface PaymentState {
  method: PAYMENT_METHOD;
  displayMethodsInCheckoutPagePaymentTable: { paymentMethod: PAYMENT_METHOD, isDisplay: boolean }[]
}

//默认的支付方式是1
const initialState: PaymentState = {
  method: PAYMENT_METHOD.PAYPAL_STANDARD,
  displayMethodsInCheckoutPagePaymentTable: Object.values(PAYMENT_METHOD).map(
    (item: PAYMENT_METHOD) => {
      return {
        paymentMethod: item,
        // 默认的选项就只保留Standard，BCDC，AP 和 GP，其他的3个都默认不选中
        isDisplay: [PAYMENT_METHOD.PAYPAL_BNPL, PAYMENT_METHOD.PAYPAL_ACDC, PAYMENT_METHOD.PAYPAL_APM].includes(item) ? false : true,
      };
    }
  )
} as PaymentState;

export const paymentSlice = createSlice({
  name: "payment_method",
  initialState,
  reducers: {
    //改变store中的支付方式
    setPaymentMethod: (state, action: PayloadAction<PAYMENT_METHOD>) => {
      state.method = action.payload;
    },

    //改变Checkout Page中Payment Table要展示的支付方式
    updateDisplayMethodsInCheckoutPagePaymentTable: (state, action: PayloadAction<{ paymentMethod: PAYMENT_METHOD, isDisplay: boolean }[]>) => {
      state.displayMethodsInCheckoutPagePaymentTable = action.payload;
    },
  },
});

export const { setPaymentMethod, updateDisplayMethodsInCheckoutPagePaymentTable } = paymentSlice.actions;

//获取当前的支付方式
export const getPaymentMethod = (state: RootState) =>
  state.paymentMethod.method;

//改变Checkout Page中Payment Table要展示的支付方
export const getDisplayMethodsInCheckoutPagePaymentTable = (state: RootState) =>
  state.paymentMethod.displayMethodsInCheckoutPagePaymentTable;

export default paymentSlice.reducer;
