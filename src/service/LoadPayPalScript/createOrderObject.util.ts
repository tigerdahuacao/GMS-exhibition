import { Shipping } from "@/interface/Shipping/Shipping";
import { BuyerInfo } from "@/reducer/reducers/buyerInfoReducer";
import { CurrentShippingOption } from "@/reducer/reducers/shippingOptionReducer";
import { ShoppingCartItem } from "@/reducer/reducers/shoppingCartReducer";
import store from "@/reducer/store";
import { NavigateFunction } from "react-router-dom";
import CaptureOrderFetchAPI from "../OrderV2/ByOnlineFetch/CaptureOrderAPI";
import CreateOrderFetchAPI from "../OrderV2/ByOnlineFetch/CreateOrderAPI";
import { VaultReducerType } from "@/reducer/reducers/vaultReducer";
import { getPaymentMethod } from "@/reducer/reducers/paymentMethodReducer";
import PAYMENT_METHOD from "@/enum/PAYMENT_METHOD";
import { getTransaction, onApproveCallback, setSuccessACDCResultMsg } from "@/components/ACDC/ACDCCallBack";


// let state;
// let buyerInfo: BuyerInfo;
// let isWithShipping: boolean;
// let currentShippingOption: CurrentShippingOption;
// let ShippingOptionList: Shipping[];
// let ShoppingCartList: ShoppingCartItem[];

// debugger;

interface ExtendedObj {
    [key: string]: any;
}

function getProductsTotalPrice(ShoppingCartList: ShoppingCartItem[], currentShippingOption: CurrentShippingOption) {
    let totalPrice = 0
    ShoppingCartList.forEach(item => {
        totalPrice += item.totalValue || 0
    })
    totalPrice += currentShippingOption.Price;
    return totalPrice
}

const assemblePayPalNormalObject = (createOrderObj: ExtendedObj, buyerInfo: BuyerInfo) => {

    (createOrderObj as any).payment_source = {
        'paypal': {
            name: {
                given_name: buyerInfo.Contact.LastName,
                surname: buyerInfo.Contact.FirstName,
            },
            address: {
                address_line_1: buyerInfo.Address.Address1,
                address_line_2: buyerInfo.Address.Address2,
                admin_area_2: "Manchester",
                admin_area_1: "Kent",
                postal_code: buyerInfo.Address.PostalCode,
                country_code: buyerInfo.Address.Country,
            },
            email_address: "petro-test01-us@cctest.com",
            password: "Qq111222333",
            phone: {
                phone_type: "MOBILE",
                phone_number: {
                    national_number: buyerInfo.Contact.Phone,
                },
            },

            "experience_context": {
                "return_url": "https://www.google.com/success",
                "cancel_url": "https://www.google.com/cancel"
            }
        }
    }
}

const assemblePayPalOneTimeObject = (createOrderObj: ExtendedObj, buyerInfo: BuyerInfo) => {

    (createOrderObj as any).payment_source = {
        'paypal': {
            name: {
                given_name: buyerInfo.Contact.LastName,
                surname: buyerInfo.Contact.FirstName,
            },
            address: {
                address_line_1: buyerInfo.Address.Address1,
                address_line_2: buyerInfo.Address.Address2,
                admin_area_2: "Manchester",
                admin_area_1: "Kent",
                postal_code: buyerInfo.Address.PostalCode,
                country_code: buyerInfo.Address.Country,
            },
            email_address: "petro-test01-us@cctest.com",
            password: "Qq111222333",
            phone: {
                phone_type: "MOBILE",
                phone_number: {
                    national_number: buyerInfo.Contact.Phone,
                },
            },
            "attributes": {
                "vault": {
                    store_in_vault: "ON_SUCCESS",
                    usage_type: "MERCHANT",
                    customer_type: "CONSUMER",
                }
            },
            // "stored_credential": {
            //     "payment_initiator": "CUSTOMER",
            //     "payment_type": "ONE_TIME",
            //     "usage": "FIRST"
            // },
            "experience_context": {
                "return_url": "https://www.google.com/success",
                "cancel_url": "https://www.google.com/cancel"
            }
        }
    }
}

const assemblePayPalRecurringObject = (createOrderObj: ExtendedObj) => {
    (createOrderObj as any).payment_source = {
        'paypal': {
            "experience_context": {
                shipping_preference: "NO_SHIPPING",
                // shipping_preference: "SET_PROVIDED_ADDRESS",
                "return_url": "https://www.google.com/success",
                "cancel_url": "https://www.google.com/cancel"
            }
        }
    }
}


const assembleACDCOneTimeObject = (createOrderObj: ExtendedObj, buyerInfo: BuyerInfo) => {

    (createOrderObj as any).payment_source = {
        'card': {
            name: `${buyerInfo.Contact.FirstName} ${buyerInfo.Contact.LastName}`,
            address: {
                address_line_1: buyerInfo.Address.Address1,
                address_line_2: buyerInfo.Address.Address2,
                admin_area_2: "Manchester",
                admin_area_1: "Kent",
                postal_code: buyerInfo.Address.PostalCode,
                country_code: buyerInfo.Address.Country,
            },
            email_address: "petro-test01-us@cctest.com",
            password: "Qq111222333",
            phone: {
                phone_type: "MOBILE",
                phone_number: {
                    national_number: buyerInfo.Contact.Phone,
                },
            },
            "attributes": {
                "vault": {
                    store_in_vault: "ON_SUCCESS",
                    usage_type: "MERCHANT",
                    customer_type: "CONSUMER",
                }
            },
            // "stored_credential": {
            //     "payment_initiator": "CUSTOMER",
            //     "payment_type": "ONE_TIME",
            //     "usage": "FIRST"
            // },
            "experience_context": {
                "return_url": "https://www.google.com/success",
                "cancel_url": "https://www.google.com/cancel"
            }
        }
    }
}

const assembleACDCRecurringObject = (createOrderObj: ExtendedObj, ACDCVaultID: string) => {
    (createOrderObj as any).payment_source = {
        'card': {
            "experience_context": {
                shipping_preference: "NO_SHIPPING",
                // shipping_preference: "SET_PROVIDED_ADDRESS",
                "return_url": "https://www.google.com/success",
                "cancel_url": "https://www.google.com/cancel"
            },
            "vault_id": ACDCVaultID
        }
    }
}


//2024-11-19, payer这个字段, 虽然能用, 但是有问题. 把payer信息放到payment_source字段下
//2025-01-22, 重构代码
function assembleCreateOrderOject(buyerInfo: BuyerInfo, ShoppingCartList: ShoppingCartItem[], currentShippingOption: CurrentShippingOption, vaultReducerSetting: VaultReducerType, paymentMethod: PAYMENT_METHOD) {
    //Count Total Price | 计算订单的总价
    const baseOrderAmount = getProductsTotalPrice(ShoppingCartList, currentShippingOption);

    //Init base Object | 初始化最开始的结构体
    let createOrderObj: ExtendedObj = {
        intent: "CAPTURE",
        purchase_units: [
            {
                amount: {
                    value: baseOrderAmount,
                    // currency_code: "EUR",
                    currency_code: "USD",
                },
            },
        ],
    };


    //[2025-03-26]适用于 PayPal Wallet, PayLater, BCDC的支付选项
    // if(paymentMethod === PAYMENT_METHOD.PAYPAL_STANDARD || paymentMethod === PAYMENT_METHOD.PAYPAL_BNPL || paymentMethod === PAYMENT_METHOD.PAYPAL_BCDC) {
    if (paymentMethod === PAYMENT_METHOD.PAYPAL_STANDARD) {
        if (vaultReducerSetting.vaultSetting.oneTime.isOneTime) {
            if (vaultReducerSetting.vaultSetting.oneTime.oneTimeSetting.isSavePayPalWallet) {
                //PayPal Wallet - One Time
                assemblePayPalOneTimeObject(createOrderObj, buyerInfo);
            }

        } else if (vaultReducerSetting.vaultSetting.recurring.isRecurring) {
            if (vaultReducerSetting.vaultSetting.recurring.recurringSetting.isUsePayPalWallet) {
                //PayPal Wallet - Recurring
                assemblePayPalRecurringObject(createOrderObj);
            }
        }
    }

    //[2025-03-27] BCDC和 BNPL 好像不能vault了
    if (paymentMethod === PAYMENT_METHOD.PAYPAL_BCDC || paymentMethod === PAYMENT_METHOD.PAYPAL_BNPL) {
        //[2025-03-27] BCDC预填出问题
        // 不是oneTime, 不是recurring 也要做处理
        assemblePayPalNormalObject(createOrderObj, buyerInfo)
    }

    //适用于 ACDC的支付选项
    if (paymentMethod === PAYMENT_METHOD.PAYPAL_ACDC) {
        if (vaultReducerSetting.vaultSetting.oneTime.isOneTime) {
            if (vaultReducerSetting.vaultSetting.oneTime.oneTimeSetting.isSaveACDC) {
                //ACDC - One Time
                assembleACDCOneTimeObject(createOrderObj, buyerInfo);
            }

        }
        if (vaultReducerSetting.vaultSetting.recurring.isRecurring) {
            if (vaultReducerSetting.vaultSetting.recurring.recurringSetting.isUseACDC) {
                //ACDC - Recurring
                const ACDCVaultID = vaultReducerSetting.vaultData.acdc.vaultId;
                assembleACDCRecurringObject(createOrderObj, ACDCVaultID);
            }
        }
    }


    return createOrderObj;
}

type CreateOrderObjectFnParamType = {
    navigate: NavigateFunction,
    getLink: Function,
    isOpenDialog: boolean,
    openDialogFn: Function
}

const getCreateOrderObjectFn = (callbackFnSet: CreateOrderObjectFnParamType) => {
    const { navigate, getLink, isOpenDialog, openDialogFn } = callbackFnSet;
    // debugger;

    const state = store.getState();
    const buyerInfo = state.buyerInfo;
    const isWithShipping: boolean = state.withShippingOption.isWithShipping;
    const currentShippingOption: CurrentShippingOption = state.withShippingOption.CurrentShippingOption;
    const ShippingOptionList: Shipping[] = state.withShippingOption.ShippingOptionList;
    const ShoppingCartList: ShoppingCartItem[] = state.shoppingCart.list;
    const vaultReducerSetting: VaultReducerType = state.vault;

    const paymentMethod: PAYMENT_METHOD = getPaymentMethod(state)

    // debugger;
    const createOrderObj = assembleCreateOrderOject(buyerInfo, ShoppingCartList, currentShippingOption, vaultReducerSetting, paymentMethod);


    //查看请求体
    console.log("%c[Create Order Request Body]:", "color:blue");
    console.log(`%c${JSON.stringify(createOrderObj, null, "  ")}`, "color:green");
    // debugger;


    const afterApprove: Function = (transactionID: string) => {
        // debugger;
        if (isOpenDialog) {
            // a Dialog to PopUp transaction ID;
            openDialogFn(transactionID);
            return;
        }
        setTimeout(() => {
            navigate(getLink())
        }, 1800)
    }


    let paypalObject: ExtendedObj = {};

    if (PAYMENT_METHOD.PAYPAL_BCDC === paymentMethod || PAYMENT_METHOD.PAYPAL_STANDARD === paymentMethod || PAYMENT_METHOD.PAYPAL_BNPL === paymentMethod) {
        const onApprove = async function (data: any, actions: any) {
            const { transactionID, jsonResponse, httpStatusCode } = await CaptureOrderFetchAPI();
            afterApprove(transactionID);
        };

        paypalObject = {
            createOrder: async function () {
                return (await CreateOrderFetchAPI(createOrderObj)).orderID;
            },
            onApprove: onApprove,
            onCancel: function (data: any) {
                // window.alert("Cancel!")
                // window.close();
                // Show a cancel page, or return to cart
            },
        };
    }

    if (PAYMENT_METHOD.PAYPAL_ACDC === paymentMethod) {
        const onApproveACDC = async function (data: any, actions: any) {
            // debugger;

            const transactionID = await onApproveCallback(data, actions);
            afterApprove(transactionID.id);
        }

        paypalObject = {
            createOrder: async function () {
                return (await CreateOrderFetchAPI(createOrderObj)).orderID;
            },
            onApprove: onApproveACDC,

        };
    }


    //TODO//待完成
    //物流运费功能还没搞定, 会报错
    if (isWithShipping) {
        paypalObject.onShippingChange = function (data: any, actions: any) {
            debugger;
            data.amount.value =
                (
                    getProductsTotalPrice(ShoppingCartList, currentShippingOption) + parseFloat(data.selected_shipping_option.amount.value)
                ).toFixed(2);
            console.log("[onShippingChange]data.amount.value", data.amount.value);

            let patchObject = actions.order.patch([
                {
                    op: "replace",
                    path: "/purchase_units/@reference_id=='default'/amount",
                    value: {
                        value: data.amount.value,
                        currency_code: "USD",
                    },
                },
            ]);
            debugger;
            return patchObject;
        };
    }

    if (PAYMENT_METHOD.PAYPAL_ACDC === paymentMethod && vaultReducerSetting.vaultSetting.recurring.recurringSetting.isUseACDC) {
        paypalObject = {
            createOrder: async () =>
                await CreateOrderFetchAPI(createOrderObj)
            ,
            onSuccess: (orderData: any) => {
                const transaction = getTransaction(orderData);
                const transactionID = transaction.id;
                setSuccessACDCResultMsg(transaction);
                afterApprove(transactionID);
            }
        }
        return paypalObject;

    }

    return paypalObject;
};

export default getCreateOrderObjectFn;


// ************************* EOF *************************

//[2024-02-20 payer这个属性已经不维护了, 要重新组织, 我这里只有shipping address, 没有billing address, billing address要配合页面展示一起修改]
// function assembleCreateOrderOject() {
//     const baseOrderAmount = getProductsTotalPrice();

//     let payer_info;

//     //[2024-02-20] 这里payment source应该为动态的, 但是还没空来做
//     let payment_source_item = "paypal"
//     let payment_source = {
//         payment_source_item: {

//         }
//     }
//     if (buyerInfo) {
//         payer_info = {
//             name: {
//                 given_name: buyerInfo.Contact.LastName,
//                 surname: buyerInfo.Contact.FirstName,
//             },
//             address: {
//                 address_line_1: buyerInfo.Address.Address1,
//                 address_line_2: buyerInfo.Address.Address2,
//                 admin_area_2: "San Jose",
//                 admin_area_1: "CA",
//                 postal_code: buyerInfo.Address.PostalCode,
//                 country_code: buyerInfo.Address.Country,
//             },
//             email_address: "petro-test01-us@cctest.com",
//             password: "Qq111222333",
//             phone: {
//                 phone_type: "MOBILE",
//                 phone_number: {
//                     national_number: buyerInfo.Contact.Phone,
//                 },
//             },
//         };
//     }

//     let create_order_obj: ExtendedObj = {
//         intent: "CAPTURE",
//         purchase_units: [
//             {
//                 amount: {
//                     value: baseOrderAmount,
//                     // currency_code: "EUR",
//                     currency_code: "USD",
//                 },
//             },
//         ],
//     };

//     // let reformatShippingOption: { id: string; label: string; type: string; selected: boolean; amount: { value: number; currency_code: string; }; }[] = [];
//     let reformatShippingOption: any[] = [];


//     //TODO//待完成
//     //这里有bug
//     ShippingOptionList.forEach(item => {
//         reformatShippingOption.push({
//             id: item.Id,
//             label: item.Label,
//             type: item.Type,
//             selected: item.Id === currentShippingOption.Id ? true : false,
//             amount: {
//                 value: item.Value,
//                 currency_code: item.CurrencyCode,
//             },
//         })
//     })

//     if (isWithShipping) {
//         create_order_obj.shipping = {
//             options: reformatShippingOption
//         };
//     }

//     if (buyerInfo) {
//         //这是不正确的
//         // create_order_obj = Object.assign(create_order_obj, payer_info);

//         //正确的
//         (create_order_obj as any).payer = payer_info;
//     }
//     return create_order_obj;
// }

// function assembleCreateOrderOjectWIthPayerInfoAttr() {
//     const baseOrderAmount = getProductsTotalPrice();

//     let payer_info;
//     if (buyerInfo) {
//         payer_info = {
//             name: {
//                 given_name: buyerInfo.Contact.LastName,
//                 surname: buyerInfo.Contact.FirstName,
//             },
//             address: {
//                 address_line_1: buyerInfo.Address.Address1,
//                 address_line_2: buyerInfo.Address.Address2,
//                 admin_area_2: "Austin",
//                 admin_area_1: "TX",
//                 postal_code: buyerInfo.Address.PostalCode,
//                 country_code: buyerInfo.Address.Country,
//             },
//             email_address: "petro-test01-us@cctest.com",
//             password: "Qq111222333",
//             phone: {
//                 phone_type: "MOBILE",
//                 phone_number: {
//                     national_number: buyerInfo.Contact.Phone,
//                 },
//             },
//         };
//     }

//     let create_order_obj: ExtendedObj = {
//         intent: "CAPTURE",
//         purchase_units: [
//             {
//                 amount: {
//                     value: baseOrderAmount,
//                     // currency_code: "EUR",
//                     currency_code: "USD",
//                 },
//             },
//         ],
//     };

//     if (buyerInfo) {

//         //正确的
//         (create_order_obj as any).payer = payer_info;
//     }
//     return create_order_obj;
// }