import { FC } from "react";
import { Link } from "react-router-dom";
import { Tooltip } from "@mui/material";
import { getProductName, getPrice } from "./reducer/reducers/productReducer";
import { useAppDispatch, useAppSelector } from "./typeHooks";
import { ShoppingCartItem, updateShoppingCart } from "./reducer/reducers/shoppingCartReducer";


const App: FC = () => {

    const dispatch = useAppDispatch();
    const productName: string = useAppSelector((state) =>
        getProductName(state)
    );
  
    const price: number = useAppSelector((state) => getPrice(state));

    const handleGoToLab = () => {
        let shoppingItem: ShoppingCartItem = {
            ProductName: productName,
            count: 1,
            value: price,
        };
        dispatch(updateShoppingCart(shoppingItem));
    };

    return (
        <div className=" m-auto">
            <div className=" w-auto px-2 m-4">
                <Tooltip
                    title="For Partner, external use"
                    placement="top-start"
                >
                    <button className="w-full bg-yellow-400 text-gray-800 py-2 px-4 rounded-full font-bold hover:bg-yellow-500">
                        <Link to="/display">Go To Display</Link>
                    </button>
                </Tooltip>
            </div>
            <div className="w-auto px-2 m-4">
                <Tooltip title="For internal use" placement="bottom-start">
                    <button className="w-full bg-blue-400 text-gray-800 py-2 px-4 rounded-full font-bold hover:bg-blue-500" 
                    onClick={handleGoToLab}>
                        <Link to="/lab">Go To Lab</Link>
                    </button>
                </Tooltip>
            </div>
        </div>
    );
};

export default App;
