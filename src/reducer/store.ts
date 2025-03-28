import { combineReducers, configureStore } from "@reduxjs/toolkit";
import paymentMethodReducer from "./reducers/paymentMethodReducer";
import globalToggleReducer from "./reducers/globalToggleReducer";
import buyerInfoReducer from "./reducers/buyerInfoReducer";
import shippingOptionReducer from "./reducers/shippingOptionReducer";
import productReducer from "./reducers/productReducer";
import shoppingCartReducer from "./reducers/shoppingCartReducer";
import orderReducer from "./reducers/orderReducer";
import APMReducer from "./reducers/APMReducer";
import VaultReducer from './reducers/vaultReducer';
import ClientSecretReducer from './reducers/clientSecretReducer';
// 持久化配置
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // 默认使用 localStorage

const persistConfig = {
    key: "root", // 存储的键名
    storage, // 存储引擎，默认使用 localStorage
    whitelist: ["paymentMethod", "vault"] // 需要持久化的 reducer 名称
};

const rootReducer = combineReducers({
    paymentMethod: paymentMethodReducer,
    globalToggle: globalToggleReducer,
    buyerInfo: buyerInfoReducer,
    withShippingOption: shippingOptionReducer,
    productInfo: productReducer,
    shoppingCart: shoppingCartReducer,
    orderInfo: orderReducer,
    APMMethod: APMReducer,
    vault: VaultReducer,
    JsSDKInfo: ClientSecretReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // 禁用序列化检查
        }),

});

export const persistor = persistStore(store);

// 从 store 本身推断 `RootState` 和 `AppDispatch` 类型
export type RootState = ReturnType<typeof store.getState>;
// 推断类型：{posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
