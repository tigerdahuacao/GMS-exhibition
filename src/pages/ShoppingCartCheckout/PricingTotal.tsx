import { useAppSelector } from "../../typeHooks";
import {
    ShoppingCartItem,
    getShoppingCart,
} from "../../reducer/reducers/shoppingCartReducer";
import { getCurrentShippingOption } from "../../reducer/reducers/shippingOptionReducer";

const PricingTotal = () => {
    const currentShippingMethod = useAppSelector((state) =>
        getCurrentShippingOption(state)
    );
    const shoppingCartList = useAppSelector((state) => getShoppingCart(state));
    const totalPrice =
        shoppingCartList.reduce(
            (sum: number, item: ShoppingCartItem) =>
                sum + Number(item.totalValue || 0),
            0
        ) + currentShippingMethod.Price;
    return (
        <div>
            <p className="item-center text-gray-400 font-extrabold text-left">
                Total
            </p>
            <p className="ml-4 text-right">
                <code className="text-sm font-bold text-gray-900 ">
                    {totalPrice}
                </code>
            </p>
        </div>
    );
};

export default PricingTotal;
