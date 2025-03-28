import React, { FC, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../typeHooks";
import {
    getPrice,
    getProductDescription,
    getProductName,
} from "../../reducer/reducers/productReducer";
import GoToCheckOutBtn from "../GoToCheckOutBtn";
import {
    ShoppingCartItem,
    getShoppingCart,
    updateShoppingCart,
} from "../../reducer/reducers/shoppingCartReducer";
import FakeSPBButton from "../FakeSPBButton/FakeSPBButton";

const ShoppingCartSummary: FC = () => {
    const dispatch = useAppDispatch();
    const productName: string = useAppSelector((state) =>
        getProductName(state)
    );
    const productDescription: string = useAppSelector((state) =>
        getProductDescription(state)
    );
    const price: number = useAppSelector((state) => getPrice(state));
    const shoppingCartList = useAppSelector((state) => getShoppingCart(state));

    let [count, setCount] = useState(
        shoppingCartList.find(
            (item: ShoppingCartItem) => item.ProductName === productName
        )?.count
    );
    // let [totalValue, setTotalValue] = useState(
    //     shoppingCartList.find((item) => item.ProductName === productName)
    //         ?.totalValue
    // );

    const totalValue = shoppingCartList.find(
        (item: ShoppingCartItem) => item.ProductName === productName
    )?.totalValue;

    const handleChange = (event: any) => {
        let mValue = event.target.value;

        if (count === undefined) count = 0;
        setCount(mValue);

        let shoppingItem: ShoppingCartItem = {
            ProductName: productName,
            count: mValue,
            value: price,
        };
        dispatch(updateShoppingCart(shoppingItem));
        // setTotalValue(Math.floor(mValue * price * 100) / 100);
    };
    return (
        <div>
            <div className="flex justify-between mb-4">
                <div className="flex items-center">
                    <img
                        src="https://cdn.pixabay.com/photo/2020/05/22/17/53/mockup-5206355_960_720.jpg"
                        alt="Product Image"
                        className="mr-4 w-40 h-40"
                    />
                    <div>
                        <h2 className="font-bold">{productName}</h2>
                        <p className="text-gray-700 max-w-xs">
                            {productDescription}
                        </p>
                    </div>
                </div>
                <div className="flex items-center">
                    <div className="mx-4">
                        <input
                            type="number"
                            value={count}
                            className="w-16 text-center"
                            onChange={handleChange}
                        />
                    </div>
                    <span className="font-bold">${price}</span>
                </div>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between items-center">
                <span className="font-bold">Subtotal:</span>
                <span className="font-bold">${totalValue}</span>
            </div>
            {/* <div className="flex justify-between items-center mt-4">
                <span>Taxes:</span>
                <span>$1.00</span>
            </div> */}
            <hr className="my-4" />
            <div className="flex justify-between items-center">
                <span className="font-bold">Total:</span>
                <span className="font-bold">${totalValue}</span>
            </div>
            <hr className="my-4" />

            <div>
                <GoToCheckOutBtn />
                <div className="w-1/2 px-2 mt-4">
                    <FakeSPBButton styleOptions={{ layout: "vertical" }} />
                </div>
            </div>
        </div>
    );
};

export default ShoppingCartSummary;
