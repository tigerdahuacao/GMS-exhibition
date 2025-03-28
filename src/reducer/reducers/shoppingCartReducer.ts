import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";


export interface ShoppingCartItem {
    ProductName: string;
    count: number;
    value: number;
    totalValue?: number;
}

export interface ShoppingCartList {
    // [index:number]: ShoppingCartItem
    list: ShoppingCartItem[];
}

const hasDefaultItems = import.meta.env.VITE_REACT_APP_HAS_DEFAULT_ITEM_IN_LAB_ROUTE;

const initialState: Function = (): ShoppingCartList => {
    console.log("初始化shoppingCartReducer: VITE_REACT_APP_HAS_DEFAULT_ITEM_IN_LAB_ROUTE:", hasDefaultItems)
    if ( hasDefaultItems === "TRUE") {
        let shoppingItem: ShoppingCartItem = {
            ProductName: "Test Refresh default Product",
            count: 1,
            value: 100,
            totalValue: 100
        };
        return {
            list: [shoppingItem]
        }
    } else {
        return {
            list: []
        }
    }
}



export const shoppingCartSlice = createSlice({
    name: "shoppingCart",
    initialState: initialState(),
    reducers: {
        updateShoppingCart: (
            state,
            action: PayloadAction<ShoppingCartItem>
        ) => {
            let newList = [...state.list];

            let inputItem = action.payload;
            inputItem.totalValue =
                Math.floor(inputItem.count * inputItem.value * 100) / 100;
            let target = newList.find(
                (item) => item.ProductName === inputItem.ProductName
            );
            // debugger;

            //TODO//待完成
            //获取代理对象的指应该还有别的更优雅的办法
            if (target) {
                target.ProductName = inputItem.ProductName;
                target.count = inputItem.count;
                target.value = inputItem.value;
                target.totalValue = inputItem.totalValue;
            } else {
                newList.push(inputItem);
            }
            state.list = newList;
        },
    },
});

export const { updateShoppingCart } = shoppingCartSlice.actions;

export const getShoppingCart = (state: RootState) => state.shoppingCart.list;

export default shoppingCartSlice.reducer;
