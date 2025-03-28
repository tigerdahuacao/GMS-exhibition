import { FC, useState } from "react";

import Contacts from "./Contact";
import ContactUnEditable from "./ContactReadOnly";
import ShippingMethod from "./ShippingMethod";
import PaymentTable from "./PaymentTable";
import { useAppSelector } from "../../typeHooks";
import classNames from "classnames";
import { getIsMoreSpace } from "../../reducer/reducers/globalToggleReducer";

// interface childProps {
//     shippingOption: any;
//     onShippingOptionChange: Function;
// }

// const LeftPart: FC<childProps> = ({
//     shippingOption,
//     onShippingOptionChange,
// }) => {

const LeftPart: FC = () => {
    const isUseMoreSpace: boolean = useAppSelector(
        (state) =>  getIsMoreSpace(state)
    );

    let [isInfoEditable, setIsInfoEditable] = useState(false);
    return (
        <div
            className={classNames({
                "relative bg-white px-6 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-3xl sm:rounded-lg sm:px-10":
                    true,
                "pt-10": isUseMoreSpace,
            })}
        >
            <div className="mx-auto max-w-2xl">
                {/* Divide line in each div */}
                <div className="divide-y divide-gray-300/50">
                    {isInfoEditable ? <Contacts /> : <ContactUnEditable />}
                    <ShippingMethod></ShippingMethod>
                    <PaymentTable />
                </div>
            </div>
        </div>
    );
};
export default LeftPart;
