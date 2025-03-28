import { FC, useState } from "react";
import GoToCheckOutBtn from "../../components/GoToCheckOutBtn";
import { useAppSelector, useAppDispatch } from "../../typeHooks";
import {
    getPrice,
    getProductDescription,
    getProductName,
} from "../../reducer/reducers/productReducer";

import {
    ShoppingCartItem,
    updateShoppingCart,
} from "../../reducer/reducers/shoppingCartReducer";
import classNames from "classnames";
import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormHelperText,
} from "@mui/material";

import FakeSPBButton from "../../components/FakeSPBButton/FakeSPBButton";

const ProductDetail: FC = () => {
    const dispatch = useAppDispatch();
    const productName: string = useAppSelector((state) =>
        getProductName(state)
    );
    const productDescription: string = useAppSelector((state) =>
        getProductDescription(state)
    );
    const price: number = useAppSelector((state) => getPrice(state));

    let [count, setCount] = useState(0);

    const handleAddToCart = () => {
        setCount(++count);
        let shoppingItem: ShoppingCartItem = {
            ProductName: productName,
            count: count,
            value: price,
        };
        dispatch(updateShoppingCart(shoppingItem));
    };

    const [selectColor, setSelectColor] = useState("");
    const [selectSize, setSelectSize] = useState("");
    const colors = ["gray", "red", "blue", "yellow"];
    const sizes = ["S", "M", "L", "XL", "XXL"];

    function handleColorClickItem(event: any) {
        // (
        //     document.getElementById("color-select-helper-label") as Element
        // ).innerHTML = "Color";

        setSelectColor(event.target.value);
    }

    function handleColorClickBtn(event: any) {
        // (
        //     document.getElementById("color-select-helper-label") as Element
        // ).innerHTML = "";
        setSelectColor(event.target.value);
    }
    function handleSizeClick(event: any) {
        // debugger;
        setSelectSize(event.target.value);
        // console.log(event.target.value)
    }

    function renderColors() {
        // debugger;
        // return colors.map((color) => {
        //     const cl = `w-6 h-6 rounded-full bg-${color}-500 mr-2 hover:bg-${color}-600`;
        //     return (
        //         <button
        //             // className={classNames({
        //             //     [cl]: true,
        //             // })}
        //             className={cl}
        //             onClick={handleColorClickBtn}
        //             value={color}
        //             key={color}
        //         ></button>
        //     );
        // });
        return (
            <>
                <button
                    className="w-6 h-6 rounded-full bg-gray-500 mr-2 hover:bg-gray-600"
                    onClick={handleColorClickBtn}
                    value="gray"
                ></button>
                <button
                    className="w-6 h-6 rounded-full bg-red-500 mr-2 hover:bg-red-600"
                    onClick={handleColorClickBtn}
                    value="red"
                ></button>
                <button
                    className="w-6 h-6 rounded-full bg-blue-500 mr-2 hover:bg-blue-600"
                    onClick={handleColorClickBtn}
                    value="blue"
                ></button>
                <button
                    className="w-6 h-6 rounded-full bg-yellow-500 mr-2 hover:bg-yellow-600"
                    onClick={handleColorClickBtn}
                    value="yellow"
                ></button>
            </>
        );
    }

    return (
        <div className="flex flex-col md:flex-row -mx-4">
            <div className="md:flex-1 px-4">
                <div className="h-[460px] rounded-lg bg-gray-300 mb-4">
                    <img
                        className="w-full h-full object-cover"
                        src="https://cdn.pixabay.com/photo/2020/05/22/17/53/mockup-5206355_960_720.jpg"
                        alt="Product Image"
                    />
                </div>
                <div className="flex -mx-2 mb-4">
                    <div className="w-1/2 px-2">
                        <button
                            className="w-full bg-gray-900 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800"
                            onClick={handleAddToCart}
                        >
                            Add to Cart
                        </button>
                    </div>
                    <GoToCheckOutBtn />
                </div>
                <div className="">
                    <FakeSPBButton />
                </div>
            </div>
            <div className="md:flex-1 px-4">
                <h2 className="text-2xl font-bold mb-2">Product Name</h2>
                <p className="text-gray-600 text-sm mb-4">{productName}</p>
                <div className="flex mb-4">
                    <div className="mr-4">
                        <span className="font-bold text-gray-700">Price:</span>
                        <span className="text-gray-600">${price}</span>
                    </div>
                    <div>
                        <span className="font-bold text-gray-700">
                            Availability:
                        </span>
                        <span className="text-gray-600">In Stock</span>
                    </div>
                </div>
                <div className="mb-4">
                    <span className="font-bold text-gray-700">
                        Select Color:
                    </span>
                    <div>
                        <FormControl sx={{ m: 1, minWidth: 120 }}>
                            <Select
                                value={selectColor}
                                onChange={handleColorClickItem}
                                displayEmpty
                                inputProps={{ "aria-label": "Without label" }}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {colors.map((color) => {
                                    return (
                                        <MenuItem
                                            onClick={handleColorClickItem}
                                            value={color}
                                            key={color}
                                        >
                                            {color}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                            <FormHelperText>Select Color</FormHelperText>
                        </FormControl>
                    </div>
                    <div className="flex items-center mt-2">
                        {/* <button className=" bg-blue-500"> </button> */}
                        {renderColors()}
                    </div>
                </div>
                <div className="mb-4">
                    <span className="font-bold text-gray-700">
                        Select Size:
                    </span>
                    <div className="flex items-center mt-2">
                        {sizes.map((size) => {
                            const cl =
                                "bg-gray-300 text-gray-700 py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400";
                            return (
                                <button
                                    className={classNames({
                                        [cl]: true,
                                        "bg-gray-400": selectSize == size,
                                    })}
                                    onClick={handleSizeClick}
                                    key={size}
                                    value={size}
                                >
                                    {size}
                                </button>
                            );
                        })}
                    </div>
                </div>
                <div>
                    <span className="font-bold text-gray-700">
                        Product Description:
                    </span>
                    <p className="text-gray-600 text-sm mt-2">
                        {productDescription}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
