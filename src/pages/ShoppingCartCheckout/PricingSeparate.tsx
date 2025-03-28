import { useAppSelector } from "../../typeHooks";
import {
    ShoppingCartItem,
    getShoppingCart,
} from "../../reducer/reducers/shoppingCartReducer";
import { getCurrentShippingOption } from "../../reducer/reducers/shippingOptionReducer";

const PricingSeparate = () => {
    const currentShippingMethod = useAppSelector((state) =>
        getCurrentShippingOption(state)
    );
    const shoppingCartList = useAppSelector((state) => getShoppingCart(state));

    const productQuickViews = () => {
        if (shoppingCartList.length > 0) {
            return shoppingCartList.map(
                (item: ShoppingCartItem, index: number) => {
                    return (
                        <div className=" py-1" key={index}>
                            <div className="flex items-center">
                                <img
                                    src="https://cdn.pixabay.com/photo/2020/05/22/17/53/mockup-5206355_960_720.jpg"
                                    alt="Product Image"
                                    className="mr-4 w-20 h-20"
                                />
                                <div>
                                    <h2 className="font-normal">
                                        {item.ProductName}
                                    </h2>
                                </div>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-normal text-gray-400">
                                    Amount:
                                    <p className="text-gray-900">
                                        {item.count}
                                    </p>
                                </span>
                                <span className="font-normal text-gray-400">
                                    Single Price:
                                    <p className="text-gray-900">
                                        {item.value}
                                    </p>
                                </span>
                            </div>
                            <hr className="my-2" />
                        </div>
                    );
                }
            );
        }
    };

    return (
        <div>
            <div>
                <p className="item-center text-gray-400 font-extrabold text-left mb-2">
                    Item
                </p>

                {productQuickViews()}
            </div>

            <div>
                <p className="item-center text-gray-400 font-normal text-left">
                    Shipping
                </p>
                <p className="ml-4 text-right">
                    <code className="text-sm font-bold text-gray-900 ">
                        {currentShippingMethod.Price}
                    </code>
                </p>
            </div>
        </div>
    );
};

export default PricingSeparate;
