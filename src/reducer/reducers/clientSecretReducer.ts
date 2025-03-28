import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";



const initialState = {
    // JsSDKClientID: "AfT9T73YOOVSPXNJb8pd9E4WkuwFl1NDM5naClS9HwORvc7mlppOzVHMqzSMAo3oZ7-zyqLgo5SbHPV2",
    // JsSDKSecretKey: "ECFSfdTPHh5qezz-5nTWYSNTtmIxke64jVJkDZINSYVNCp0zOkZ2tQAKDQlQ8WYwm9iHwQ13jrQPHUiQ",

    // HK
    // JsSDKClientID: "AeXVkMQsPC_sbV7MD2EfkBllpZcUBurkdHu5covhklTso79p7A8q9ctrk6fSxL_2lFVoZkaCtBrnxsdz",
    // JsSDKSecretKey: "EP1OPaCj1AGVNGcN5LD1K7RkWocfXoSUNTkZ7wNTzNIW0YTVst60KPH8H-gWwsSr6463nrMFsvXScKT2",

    // Vault
    JsSDKClientID: "AaB-X2CM2jf9k-DU-sWSaNbpfKnHeRLHa84MppXHdBpv36uWUqGui9ldOk6SeET9Os5Hc4J5puUTetXo",
    JsSDKSecretKey: "EAwyCjl9UrSmRqV4h6E_xoZdt3CVdJof6P9_1c8IY-jUca_m7g9oCAuMiw5vJ-MyhJzopPiRwbTaqUYy",
    isCustomizedClient: true,
    accessToken: ""
}

export const JsSDKInfoSlice = createSlice({
    name: "JsSDKInfo",
    initialState,
    reducers: {
        setJsSDKClientID: (state, action: PayloadAction<string>) => {
            state.JsSDKClientID = action.payload;
        },
        setJsSDKSecretKey: (state, action: PayloadAction<string>) => {
            state.JsSDKSecretKey = action.payload;
        },
        setIsCustomizedClient: (state, action: PayloadAction<boolean>) => {
            state.isCustomizedClient = action.payload;
        },
        setAccessToken: (state, action: PayloadAction<string>) => {
            state.accessToken = action.payload;
        }
    },
});

export const { setJsSDKClientID, setJsSDKSecretKey, setIsCustomizedClient } = JsSDKInfoSlice.actions;

export const getJsSDKClientID = (state: RootState) => state.JsSDKInfo.JsSDKClientID;
export const getJsSDKSecretKey = (state: RootState) =>
    state.JsSDKInfo.JsSDKSecretKey;
export const getIsCustomizedClient = (state: RootState) =>
    state.JsSDKInfo.isCustomizedClient;
export const getAccessToken = (state: RootState) => state.JsSDKInfo.accessToken;

export default JsSDKInfoSlice.reducer;
