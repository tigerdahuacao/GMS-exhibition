import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface ToggleParam {
    useMoreSpace: boolean;
    APMButtonsDisable: boolean;
}

const initialState: ToggleParam = {
    useMoreSpace: false,
    APMButtonsDisable: false
};

export const globalToggleSlice = createSlice({
    name: "globalToggle",
    initialState,
    reducers: {
        setIsMoreSpace: (state, action: PayloadAction<boolean>) => {
            console.log('来自toggle的值:', action.payload)
            state.useMoreSpace = action.payload;
        },
        setAPMButtonsDisable: (state, action: PayloadAction<boolean>) => {
            state.APMButtonsDisable = action.payload;
        }
    },
});

export const { setIsMoreSpace } = globalToggleSlice.actions;
export const { setAPMButtonsDisable } = globalToggleSlice.actions;

export const getIsMoreSpace = (state: RootState) =>
    state.globalToggle.useMoreSpace;

export const getAPMButtonsDisable = (state: RootState) =>
    state.globalToggle.APMButtonsDisable;

export default globalToggleSlice.reducer;
