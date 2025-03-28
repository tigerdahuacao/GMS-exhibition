import {
    Button,
    FormHelperText,
    IconButton,
    MenuItem,
    Select,
    Tooltip,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../typeHooks";
import classNames from "classnames";
import { getIsMoreSpace } from "../../reducer/reducers/globalToggleReducer";
import {
    getCurrentShippingOption,
    getShippingOptionListConst,
    setCurrentShippingOption,
} from "../../reducer/reducers/shippingOptionReducer";
import { Shipping } from "../../interface/Shipping/Shipping";
import { getShoppingCart } from "../../reducer/reducers/shoppingCartReducer";

// interface childProps {
//     shippingOption: any;
//     onShippingOptionChange: Function;
// }

const ShippingMethod: FC = () => {
    const shoppingCartList = useAppSelector((state) => getShoppingCart(state));
    const dispatch = useAppDispatch();

    const isUseMoreSpace: boolean = useAppSelector((state) =>
        getIsMoreSpace(state)
    );

    const currentShippingMethod = useAppSelector((state) =>
        getCurrentShippingOption(state)
    );

    const [isFixed] = useState(true);

    const ShippingListConst = useAppSelector((state) =>
        getShippingOptionListConst(state)
    ) as Shipping[];

    const [isReadOnly, setIsReadOnly] = useState(true);

    function isUpperCase(char: string) {
        return char.charCodeAt(0) >= 65 && char.charCodeAt(0) <= 90;
    }

    function isLowerCase(char: string) {
        return char.charCodeAt(0) >= 97 && char.charCodeAt(0) <= 122;
    }

    const formatCarryItem = (name: string, price: number) => {
        const totalLength = 50;
        const s = String(price);
        let nameLen = 0;
        for (let index = 0; index < nameLen; index++) {
            if (isLowerCase(name[index])) nameLen += 2;
            if (isUpperCase(name[index])) nameLen += 1;
        }
        const contentLen = nameLen + s.length;
        const blankLength =
            contentLen < totalLength ? totalLength - contentLen : 1;
        let blank = "";
        let blankList = [];
        for (let index = 0; index < blankLength; index++) {
            // blank += <>&nbsp;</>;
            // blank += "&nbsp;";
            blankList.push(<>&nbsp;</>);
        }
        // debugger;

        return blankList;
        // return blankLength;
    };

    let toDispatchObj = {
        Id: "None",
        Price: 0,
    };

    useEffect(() => {
        dispatch(setCurrentShippingOption(toDispatchObj));
    }, [isFixed]);

    function renderSelectList() {
        if (isFixed) {
            //In Fixed contact mode, change default shipping carrier to USPS
            const targetItem = ShippingListConst.find(
                (item) => item.Id === "USPS"
            );
            toDispatchObj = {
                Id: targetItem?.Id || "None",
                Price: Number(targetItem?.Value),
            };

            return (
                <p className="ml-4 my-2">
                    <code className="text-sm font-bold text-gray-900">
                        {targetItem?.Label} &nbsp; &nbsp; &nbsp; Price:{" "}
                        {targetItem?.Value}
                    </code>
                </p>
            );
        } else {
            return (
                <>
                    <Select
                        disabled={shoppingCartList.length == 0}
                        value={currentShippingMethod.Id}
                        onChange={(event) => {
                            const id = event.target.value;
                            const targetItem = ShippingListConst.find(
                                (item) => item.Id === id
                            );

                            let obj = {
                                Id: id,
                                Price: Number(targetItem?.Value),
                            };
                            dispatch(setCurrentShippingOption(obj));
                        }}
                        // inputProps={{ readOnly: isReadOnly }}
                        className=" my-2"
                    >
                        <MenuItem value="none" key="-1">
                            <em>None</em>
                        </MenuItem>
                        {/* <MenuItem value="none" key="-2">
                            <em>
                                1 <>&nbsp;</> <>&nbsp;</> <>&nbsp;</>1
                            </em>
                        </MenuItem> */}
                        {ShippingListConst.map((shippingOption, index) => {
                            return (
                                <MenuItem value={shippingOption.Id} key={index}>
                                    {shippingOption.Label}
                                    {formatCarryItem(
                                        shippingOption.Label,
                                        shippingOption.Value
                                    ).map((item, key) => {
                                        return item;
                                    })}
                                    Price:
                                    {shippingOption.Value}
                                </MenuItem>
                            );
                        })}
                    </Select>
                    <FormHelperText>
                        {shoppingCartList.length == 0
                            ? "Please Add your favorite Products!"
                            : "Please change default shipping method!"}
                    </FormHelperText>
                </>
            );
        }
    }

    return (
        <div>
            <div
                className={classNames({
                    "text-base  leading-7 relative": true,
                    "space-y-6 py-8": isUseMoreSpace,
                })}
            >
                <p className="text-gray-400 font-extrabold">Shipping Method</p>
                <div>
                    <p className="item-center text-gray-400 font-normal">
                        Carrier
                    </p>
                </div>

                {renderSelectList()}

                {/* <div className="top-1 right-1 absolute ">
                    <Tooltip
                        title="修改运输方式"
                        placement="bottom"
                        className="text-sky-500 hover:text-sky-600"
                    >
                        
                        <Button
                            onClick={() => {
                                setIsReadOnly(!isReadOnly);
                            }}
                        >
                            Modify
                        </Button>
                    </Tooltip>
                </div> */}
            </div>
        </div>
    );
};
export default ShippingMethod;
