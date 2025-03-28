
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
// import ShippingListConst from "../../Mock/Shipping/ShippingList.json";
import ShippingListConst from "@/Mock/Shipping/ShippingListWithPrice.json";
import { Shipping } from "@/interface/Shipping/Shipping";

interface WithShipping {
    isWithShipping: boolean;
    ShippingOptionList: Shipping[];
    CurrentShippingOption: CurrentShippingOption;
}

export interface CurrentShippingOption {
    Id: string;
    Price: number;
}

const initialState: WithShipping = {
    isWithShipping: false,
    ShippingOptionList: ShippingListConst as unknown as Shipping[],
    CurrentShippingOption: {
        Id: "none",
        Price: 0,
        
    },
} as WithShipping;

export const isShippingOptionSlice = createSlice({
    name: "shippingOption",
    initialState,
    reducers: {
        setShippingOptionInCreateOrder: (
            state,
            action: PayloadAction<boolean>
        ) => {
            // console.log("来自toggle的值:", action.payload);
            state.isWithShipping = action.payload;
        },
        setCurrentShippingOption: (
            state,
            action: PayloadAction<CurrentShippingOption>
        ) => {
            state.CurrentShippingOption = action.payload;
        },
    },
});

export const { setShippingOptionInCreateOrder } = isShippingOptionSlice.actions;
export const {setCurrentShippingOption} = isShippingOptionSlice.actions;

export const getIsSetShippingOptionInCreateOrder = (state: RootState) =>
    state.withShippingOption.isWithShipping;


export const getShippingOptionListConst = (state: RootState) =>
    state.withShippingOption.ShippingOptionList;

export const getCurrentShippingOption = (state: RootState) =>
    state.withShippingOption.CurrentShippingOption;

export default isShippingOptionSlice.reducer;
