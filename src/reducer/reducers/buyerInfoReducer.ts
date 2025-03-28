import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { User } from "@/interface/user/User";


import user_data from '@/Mock/Person/US_Tom.json'
import address_data from '@/Mock/Address/USAddress.json'
import { Address } from "@/interface/address/Address";


export interface BuyerInfo {
    Contact: User;
    Address: Address;
}

const initialState: BuyerInfo = {
    Contact: user_data,
    Address: address_data,
};

export const buyerInfoSlice = createSlice({
    name: "buyerInfo",
    initialState,
    reducers: {
        setBuyerInfo: (state, action: PayloadAction<BuyerInfo>) => {
            state.Address = action.payload.Address;
            state.Contact = action.payload.Contact;
        },
        setBuyerInfoContactPhone: (state, action: PayloadAction<string>) => {
            state.Contact.Phone = action.payload;
        },
        setBuyerInfoContactEmailAddress: (
            state,
            action: PayloadAction<string>
        ) => {
            state.Contact.EmailAddress = action.payload;
        },
        setBuyerInfoContactFirstName: (
            state,
            action: PayloadAction<string>
        ) => {
            state.Contact.FirstName = action.payload;
        },
        setBuyerInfoContactLastName: (state, action: PayloadAction<string>) => {
            state.Contact.LastName = action.payload;
        },
        setBuyerInfoContactGender: (state, action: PayloadAction<string>) => {
            state.Contact.Gender = action.payload;
        },
        // --------------------------------
        setBuyerInfoAddressAddress1: (state, action: PayloadAction<string>) => {
            state.Address.Address1 = action.payload;
        },
        setBuyerInfoAddressAddress2: (state, action: PayloadAction<string>) => {
            state.Address.Address2 = action.payload;
        },
        setBuyerInfoAddressCity: (state, action: PayloadAction<string>) => {
            state.Address.City = action.payload;
        },
        setBuyerInfoAddressCountry: (state, action: PayloadAction<string>) => {
            state.Address.Country = action.payload;
        },
        setBuyerInfoAddressProvince: (state, action: PayloadAction<string>) => {
            state.Address.Province = action.payload;
        },
        setBuyerInfoAddressPostalCode: (
            state,
            action: PayloadAction<string>
        ) => {
            state.Address.PostalCode = action.payload;
        },
    },
});

export const {
    setBuyerInfo,
    setBuyerInfoContactPhone,
    setBuyerInfoContactEmailAddress,
    setBuyerInfoContactFirstName,
    setBuyerInfoContactLastName,
    setBuyerInfoContactGender,
    setBuyerInfoAddressAddress1,
    setBuyerInfoAddressAddress2,
    setBuyerInfoAddressCity,
    setBuyerInfoAddressCountry,
    setBuyerInfoAddressProvince,
    setBuyerInfoAddressPostalCode,
} = buyerInfoSlice.actions;

export const getBuyerInfo = (state: RootState) => state.buyerInfo;

export default buyerInfoSlice.reducer;
