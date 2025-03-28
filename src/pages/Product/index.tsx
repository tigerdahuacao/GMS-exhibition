import { FC } from "react";

import ShoppingCartSummary from "../../components/ShoppingCartSummary";
import { Bars3Icon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import Drawer from "../../components/ShoppingCartDraw";
import ProductDetail from "./productDetail";
import classNames from "classnames";
import { Tooltip } from "@mui/material";


const Product: FC = () => {
    const content = (
        <div>
            <div className="flex flex-col  min-h-screen">
                <div className="bg-gray-100 rounded-lg shadow-lg p-6">
                    <ShoppingCartSummary />
                </div>
            </div>
        </div>
    );

   
    const icon = (
        <Tooltip title="View Shopping Cart" placement="left">
        <div
            id="Bar3IconContainer"
            className=" bg-blue-600 absolute top-4 right-4 rounded-full h-16 w-16 pt-2 pl-2"
        >
            <ShoppingCartIcon className=" h-12" />
            {/* <Bars3Icon className=" h-12" /> */}
        </div>
        </Tooltip>
    );

    return (
        <div className={classNames({ " w-full mx-auto": true, " mt-4": true })}>
            <Drawer position={"right"} icon={icon} content={content} />

           

            <div className="bg-gray-100 py-8 rounded-2xl shadow-xl" >
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <ProductDetail />
                </div>
            </div>
        </div>
    );
};

export default Product;
