import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./reducer/store";

// 在整个应用中使用，而不是简单的使用 `useDispatch` 和 `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// export const tmpDispatch: () => AppDispatch = useDispatch;
