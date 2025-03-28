import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import product_data from "@/Mock/Product/ChildrenWear.json";

export interface Product {
    ProductName: string;
    Price: number;
    ProductDescription: string;
}

const initialState: Product = product_data as Product;

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setPrice: (state, action: PayloadAction<number>) => {
            state.Price = action.payload;
        },
    },
});

export const { setPrice } = productSlice.actions;

export const getPrice = (state: RootState) => state.productInfo.Price;
export const getProductName = (state: RootState) =>
    state.productInfo.ProductName;
export const getProductDescription = (state: RootState) =>
    state.productInfo.ProductDescription;

export default productSlice.reducer;
