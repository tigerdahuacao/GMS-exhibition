import {
    Button,
    FormControl,
    FormControlLabel,
    FormLabel,
    Icon,
    Radio,
    RadioGroup,
    Switch,
    Tooltip,
} from "@mui/material";
import React, { useEffect, useState } from "react";
// import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { useAppDispatch, useAppSelector } from "../../typeHooks";
import {
    getPaymentMethod,
    getDisplayMethodsInCheckoutPagePaymentTable,
    setPaymentMethod,
} from "../../reducer/reducers/paymentMethodReducer";

import PAYMENT_METHOD from "../../enum/PAYMENT_METHOD";
import classNames from "classnames";
import { getIsMoreSpace } from "../../reducer/reducers/globalToggleReducer";
import { getAPMMethod } from "../../reducer/reducers/APMReducer";
import APMDisplayArea from "../APM/APMDisplayArea";
import APM_METHOD_ENUM from "../APM/APM_METHOD_ENUM";

const PaymentTable = () => {
    const dispatch = useAppDispatch();

    const displayedPaymentMethodList = useAppSelector((store) =>
        getDisplayMethodsInCheckoutPagePaymentTable(store)
    );

    const APMMethod = useAppSelector((state) => {
        return getAPMMethod(state);
    });

    // const paymentMethodRD = useAppSelector(
    //     (state) => state.paymentMethod.method
    // );

    //用以控制支付方式变化的默认值
    const [useRadioOnChange, setUseRadioOnChange] = useState(true);

    const paymentMethodRD = useAppSelector((state) =>
        getPaymentMethod(state)
    );
    const [radio_value, setRadioValue] =
        useState<PAYMENT_METHOD>(paymentMethodRD);

    //setTimeOut用的, 以防误触
    const [radioBtnDisable, setRadioBtnDisable] = useState(false);

    //radio btn change 事件, 仅仅改变当前页面的value值, 不改变redux中的值
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRadioValue(event?.target?.value as PAYMENT_METHOD);
        // dispatch(setPaymentMethod(event?.target?.value));
    };

    //radio btn change 事件, 不仅仅改变当前页面的value值, 也改变redux中的值
    const handleChange_ChangePaymentMethod = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setRadioBtnDisable(true);
        setRadioValue(event?.target?.value as PAYMENT_METHOD);
        dispatch(setPaymentMethod(event?.target?.value as PAYMENT_METHOD));

        //相当于防抖
        setTimeout(() => {
            setRadioBtnDisable(false);
        }, 800);
    };

    const isUseMoreSpace: boolean = useAppSelector((state) =>
        getIsMoreSpace(state)
    );

    //PayPal wallet Logo
    const paypal_logo = (
        <img
            className="  h-8  object-contain inline-block"
            src={ "/image/paypal-logo.svg"}
        />
    );

    //Debit or Credit Card Logo
    const paypal_BCDC = (
        <>
            {/* <img
                className=" w-1/2 h-10 object-contain  inline-block"
                src={process.env.PUBLIC_URL + "/image/paypal-used.svg"}
            /> */}
            <img
                className="  h-8 object-contain  inline-block "
                src={"/image/card.svg"}
            />
        </>
    );

    const payLater_logo = (
        <>
            {/* <img
                className="  h-8 object-contain  inline-block justify-start ml-2"
                src={process.env.PUBLIC_URL + "/image/pay-later.png"}
            /> */}

            <div
                style={{
                    display: "inline-block",
                    padding: "5px",
                    borderRadius: "3px",
                    position: "relative",
                    border: "1px solid #dcdcdc",
                    // height:"2rem",
                    objectFit: "contain",
                }}
            >
                <img
                    src="https://www.paypalobjects.com/js-sdk-logos/2.2.7/pp-default.svg"
                    style={{
                        lineHeight: 0,
                        display: "inline-block",
                        height: "1.5rem",
                    }}
                ></img>
                <span
                    style={{
                        display: "inline-block",
                        lineHeight: 0,
                        width: "2px",
                    }}
                />
                <span
                    style={{
                        fontFamily:
                            "PayPalOpen-Regular, Helvetica, Arial, 'Liberation Sans', sans-serif",
                        height: "1.25rem",
                    }}
                >
                    Pay Later
                </span>
            </div>
        </>
    );

    const ACDC_logo = (
        <>
            <div className="  h-10 object-contain  inline-block justify-start">
                <img
                    className="h-10 object-contain  inline-block "
                    src={"/image/visa.svg"}
                />
                <img
                    className="h-10 object-contain  inline-block ml-2"
                    src={"/image/mastercard.svg"}
                />
            </div>
        </>
    );

    const GOOGLE_PAY_logo = (
        <>
            <img
                className="  h-12 object-contain  inline-block "
                src={"/image/google-pay.svg"}
            />
        </>
    );

    const APPLE_PAY_logo = (
        <>
            <img
                className="  h-12 object-contain  inline-block"
                src={ "/image/apple-pay.svg"}
            />
        </>
    );

    const APM_logo = () => {
        let imgUrl;
        if (APMMethod === APM_METHOD_ENUM.Bancontact) {
            imgUrl =
                "https://www.paypalobjects.com/js-sdk-logos/2.2.7/bancontact-black.svg";
        } else if (APMMethod === APM_METHOD_ENUM.SOFORT) {
            imgUrl =
                "https://www.paypalobjects.com/js-sdk-logos/2.2.7/sofort-black.svg";
        } else if (APMMethod === APM_METHOD_ENUM.iDEAL) {
            imgUrl =
                "https://www.paypalobjects.com/js-sdk-logos/2.2.7/ideal-black.svg";
        } else if (APMMethod === APM_METHOD_ENUM.BLIK) {
            imgUrl =
                "https://www.paypalobjects.com/js-sdk-logos/2.2.7/blik-black.svg";
        } else if (APMMethod === APM_METHOD_ENUM.eps) {
            imgUrl =
                "https://www.paypalobjects.com/js-sdk-logos/2.2.7/eps-black.svg";
        } else if (APMMethod === APM_METHOD_ENUM.giropay) {
            imgUrl =
                "https://www.paypalobjects.com/js-sdk-logos/2.2.7/giropay-black.svg";
        } else if (APMMethod === APM_METHOD_ENUM.MyBank) {
            imgUrl =
                "https://www.paypalobjects.com/js-sdk-logos/2.2.7/mybank-black.svg";
        } else if (APMMethod === APM_METHOD_ENUM.PUI) {
        } else if (APMMethod === APM_METHOD_ENUM.Przelewy24) {
            imgUrl =
                "https://www.paypalobjects.com/js-sdk-logos/2.2.7/p24-black.svg";
        }

        return (
            <>
                <img
                    src={imgUrl}
                    className=" h-5 object-contain  inline-block "
                />
            </>
        );
    };

    const buttonTables = function () {
        const rawLists = [
            {
                value: PAYMENT_METHOD.PAYPAL_STANDARD,
                label: "PayPal",
                logo: paypal_logo,
                additionalInfo: null,
            },

            {
                value: PAYMENT_METHOD.PAYPAL_BCDC,
                label: "Debit or Credit Card",
                logo: paypal_BCDC,
                additionalInfo: "Debit or Credit Card",
            },

            {
                value: PAYMENT_METHOD.PAYPAL_GOOGLEPAY,
                label: "Google Pay",
                logo: GOOGLE_PAY_logo,
                additionalInfo: null,
            },

            {
                value: PAYMENT_METHOD.PAYPAL_APPLEPAY,
                label: "Apple Pay",
                logo: APPLE_PAY_logo,
                additionalInfo: null,
            },
            {
                value: PAYMENT_METHOD.PAYPAL_BNPL,
                label: "Pay later",
                logo: payLater_logo,
                additionalInfo: null,
            },

            {
                value: PAYMENT_METHOD.PAYPAL_APM,
                label: APMMethod,
                // [2024-08-27 金松说不要这个APM的label了]
                // label: `APM - ${APMMethod}`,
                logo: APM_logo(),
                additionalInfo: null,
            },

            {
                value: PAYMENT_METHOD.PAYPAL_ACDC,
                label: "Credit and Debit Card",
                logo: ACDC_logo,
                additionalInfo: null,
            },
        ];

        // 2024-11-22
        // 使用label会导致文字在图标的前面
        // const handleBCDCLabel = (label: string, index: number) => {
        //     return index === 1 ? label : "";
        // };

        const lists = [];
        for (let index = 0; index < rawLists.length; index++) {
            const element = rawLists[index];
            if (
                displayedPaymentMethodList
                    .filter((item) => item.isDisplay)
                    .find((item) => item.paymentMethod === element.value)
            )
                lists.push(element);
        }

        if (useRadioOnChange) {
            /* [2023-10-09]radio button的点击事件来变动支付方式而不是按钮 */
            // [2023-12-26]代码优化, 把一个一个写死的项目改变为数组遍历渲染
            return (
                <div>
                    <RadioGroup
                        value={radio_value}
                        onChange={handleChange_ChangePaymentMethod}
                    >
                        {lists.map((item, index) => {
                            return (
                                <div className="pl-2 w-full" key={index}>
                                    <FormControlLabel
                                        value={item.value}
                                        control={<Radio color="primary" />}
                                        // label={item.label}

                                        //2024-08-28 不要Label了 只要图标
                                        label={""}
                                        //2024-11-22
                                        //BCDC需要label
                                        // label={handleBCDCLabel(
                                        //     item.label,
                                        //     index
                                        // )}

                                        disabled={radioBtnDisable}
                                        className=" inline-block"
                                    />
                                    {item.logo && item.logo}
                                    <span className=" ml-2">
                                        {item.additionalInfo &&
                                            item.additionalInfo}
                                    </span>
                                </div>
                            );
                        })}
                    </RadioGroup>
                </div>
            );
        } else {
            return (
                <div>
                    <RadioGroup value={radio_value} onChange={handleChange}>
                        {lists.map((item, index) => {
                            return (
                                <div className="pl-2 w-full" key={index}>
                                    <FormControlLabel
                                        value={item.value}
                                        control={<Radio color="primary" />}
                                        label={item.label}
                                    />
                                    {item.logo && item.logo}
                                    {item.additionalInfo && item.additionalInfo}
                                </div>
                            );
                        })}
                    </RadioGroup>

                    <Button
                        variant="contained"
                        color="primary"
                        // endIcon={<ArrowForwardIosIcon />}
                        // endIcon={<Icon>send</Icon>}
                        onClick={() => {
                            // console.clear();
                            console.log(
                                "[OnClick事件]当前radio value:",
                                radio_value,
                                "| typeof radio_value:",
                                typeof radio_value
                            );

                            dispatch(
                                setPaymentMethod(radio_value as PAYMENT_METHOD)
                            );
                        }}
                    >
                        更改支付方式
                    </Button>
                </div>
            );
        }
    };

    const changePaymentMethodComponent = () => {
        if (
            import.meta.env.VITE_REACT_APP_SHOW_PAYMENT_METHOD_TOGGLE &&
            import.meta.env.VITE_REACT_APP_SHOW_PAYMENT_METHOD_TOGGLE === "TRUE"
        ) {
            return (
                <div className="top-1 right-1 absolute ">
                    <Tooltip
                        title="点击这个按钮用以切换支付方式的选择方式"
                        placement="bottom"
                        className="text-sky-500 hover:text-sky-600"
                    >
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={useRadioOnChange}
                                    onChange={() => {
                                        setUseRadioOnChange(!useRadioOnChange);
                                    }}
                                />
                            }
                            label={
                                useRadioOnChange
                                    ? "选中radio button"
                                    : "点击按钮"
                            }
                        />
                    </Tooltip>
                </div>
            );
        }
    };
    return (
        <div
            className={classNames({
                "text-base  leading-7 relative": true,
                "space-y-6 py-8": isUseMoreSpace,
            })}
        >
            {
                //显示 点击这个按钮用以切换支付方式的选择方式 的toggle按钮
                //[文字 选中radio button]方便搜索
                // changePaymentMethodComponent()
            }

            {/* ----------------------------------------------------------------------- */}

            {/* [2023-10-09]添加文字头 */}
            <p className="text-gray-400 font-extrabold">Payment Method</p>

            {/* [2023-10-09]为了控制台不报 validateDOMNesting(...) 错, 把表格去掉 */}
            {buttonTables()}
        </div>
    );
};

export default PaymentTable;
