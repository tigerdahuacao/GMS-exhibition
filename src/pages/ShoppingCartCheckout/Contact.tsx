import { User } from "../../interface/user/User";
import { Address } from "../../interface/address/Address";
import {
    BuyerInfo,
    setBuyerInfoContactPhone,
    setBuyerInfoContactEmailAddress,
    setBuyerInfoContactFirstName,
    setBuyerInfoContactLastName,
    setBuyerInfoContactGender,
    setBuyerInfoAddressAddress1,
    setBuyerInfoAddressAddress2,
    setBuyerInfoAddressCity,
    setBuyerInfoAddressCountry,
    setBuyerInfoAddressProvince,
    setBuyerInfoAddressPostalCode,
} from "../../reducer/reducers/buyerInfoReducer";
// import user_data from "../../Mock/Person/Tom.json";
// import address_data from "../../Mock/Address/TomAddress.json";
import { FC, useState } from "react";
import classNames from "classnames";
import UseMoreSpace from "../../components/Toggles/UseMoreSpaceToggle";
import { useAppDispatch, useAppSelector } from "../../typeHooks";
import {
    Alert,
    AlertTitle,
    Backdrop,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    FormControl,
    Input,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from "@mui/material";
import {
    getBuyerInfo,
    setBuyerInfo,
} from "../../reducer/reducers/buyerInfoReducer";
import { getIsMoreSpace } from "../../reducer/reducers/globalToggleReducer";
import countryCodeList from "../../service/Geography/GetCountryCode";
import { setAPMMethod } from "../../reducer/reducers/APMReducer";
import APM_METHOD_ENUM from "../APM/APM_METHOD_ENUM";

//[2023-10-08 BCDB 一定要下拉式的]
const Contact: FC = () => {
    const dispatch = useAppDispatch();
    const user: User = useAppSelector((state) => getBuyerInfo(state).Contact);
    const address: Address = useAppSelector(
        (state) => getBuyerInfo(state).Address
    );
    const [contactFormCountryValue, setContactFormCountryValue] = useState(
        address.Country
    );
    const isUseMoreSpace: boolean = useAppSelector((state) =>
        getIsMoreSpace(state)
    );

    const NationCityDivClassName = "w-20 mt-2 mb-1";

    const handleChange = (event: any) => {
        const attributeID = event.target.id;
        console.log(attributeID);
        const value = event.target.value;
        console.log(value);

        let oContact = user;
        // @ts-ignore
        oContact[attributeID] = value;

        let oAddress = address;
        let oBuyerInfo: BuyerInfo = {
            Contact: oContact,
            Address: oAddress,
        };

        // dispatch(event.target.value);
    };

    const [alertStatus, setAlertStatus] = useState(false);
    const handleCountryAlertOpen = () => {
        setAlertStatus(true);
    };
    const handleCountryAlertClose = () => {
        setAlertStatus(false);
    };

    const setAPMCountry = (countryCode: string) => {
        if (countryCode === "BE") {
            dispatch(setAPMMethod(APM_METHOD_ENUM.Bancontact));
        }
        if (countryCode === "PL") {
            dispatch(setAPMMethod(APM_METHOD_ENUM.Przelewy24));
        }

        if (countryCode === "AT") {
            dispatch(setAPMMethod(APM_METHOD_ENUM.eps));
        }

        if (countryCode === "DE") {
            dispatch(setAPMMethod(APM_METHOD_ENUM.giropay));
        }
        if (countryCode === "IT") {
            dispatch(setAPMMethod(APM_METHOD_ENUM.MyBank));
        }

        if (countryCode === "NL") {
            dispatch(setAPMMethod(APM_METHOD_ENUM.iDEAL));
        }
    };

    // handle events after country list is change
    const handleCountryChange = (event: any) => {
        handleCountryAlertOpen();
        const value = event.target.value as string;
        setContactFormCountryValue(value);
        dispatch(setBuyerInfoAddressCountry(value));
        setAPMCountry(value);
    };

    return (
        <div>
            <Backdrop
                sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open={alertStatus}
                onClick={handleCountryAlertClose}
            ></Backdrop>

            <UseMoreSpace />
            {/* <p>当前的值:{` ${isUseMoreSpace}`}</p> */}

            <div
                className={classNames({
                    "text-base leading-7 text-gray-600": true,
                    "space-y-6 py-8": isUseMoreSpace,
                })}
            >
                <p className="text-gray-400 font-extrabold">Contact</p>
                {/* ------------- Name--------------*/}
                <div>
                    <p className="item-center text-gray-400 font-normal">
                        Name
                    </p>
                    <div className="flex flex-wrap">
                        <div className="ml-4">
                            <TextField
                                id="FirstName"
                                value={user.FirstName}
                                color="secondary"
                                size="small"
                                className="w-24"
                                label="FirstName"
                                onChange={(event) => {
                                    // const attributeID = event.target.id;
                                    // console.log(attributeID);
                                    const value = event.target.value;

                                    // console.log(value);
                                    dispatch(
                                        setBuyerInfoContactFirstName(value)
                                    );
                                }}
                            ></TextField>
                        </div>
                        <div className="ml-4">
                            <TextField
                                id="LastName"
                                value={user.LastName}
                                color="secondary"
                                size="small"
                                className=" w-28"
                                label="LastName"
                                onChange={(event) => {
                                    // const attributeID = event.target.id;
                                    // console.log(attributeID);
                                    const value = event.target.value;

                                    // console.log(value);
                                    dispatch(
                                        setBuyerInfoContactLastName(value)
                                    );
                                }}
                            ></TextField>
                        </div>
                    </div>
                </div>
                {/* ------------- 电话--------------*/}
                <div>
                    <p className="item-center text-gray-400 font-normal">
                        Phone Number
                    </p>
                    <div className="ml-4">
                        <TextField
                            id="Phone"
                            value={user.Phone}
                            color="secondary"
                            size="small"
                            className="text-sm font-bold text-gray-900"
                            onChange={(event) => {
                                // const attributeID = event.target.id;
                                // console.log(attributeID);
                                const value = event.target.value;

                                // console.log(value);
                                dispatch(setBuyerInfoContactPhone(value));
                            }}
                        ></TextField>
                    </div>
                </div>
                {/* ------------- 邮箱 --------------*/}
                <div>
                    <p className="item-center text-gray-400 font-normal">
                        Email Address
                    </p>
                    <div className="ml-4">
                        <TextField
                            id="EmailAddress"
                            value={user.EmailAddress}
                            size="small"
                            fullWidth
                            className="text-sm font-bold text-gray-900"
                            onChange={(event) => {
                                // const attributeID = event.target.id;
                                // console.log(attributeID);
                                const value = event.target.value;

                                // console.log(value);
                                dispatch(
                                    setBuyerInfoContactEmailAddress(value)
                                );
                            }}
                        ></TextField>
                    </div>
                </div>

                <p className="text-gray-400 font-extrabold">Ship To</p>

                <ul
                    className={classNames({
                        "space-y-4": isUseMoreSpace,
                    })}
                >
                    {/* ------------- 第一行 --------------*/}
                    <li className="flex flex-col ">
                        <p className="item-center text-gray-400 font-normal">
                            Address Line 1
                        </p>
                        <div className="ml-4">
                            <TextField
                                id="Address1"
                                value={address.Address1}
                                size="small"
                                fullWidth
                                className="text-sm font-bold text-gray-900"
                                onChange={(event) => {
                                    // const attributeID = event.target.id;
                                    // console.log(attributeID);
                                    const value = event.target.value;

                                    // console.log(value);
                                    dispatch(
                                        setBuyerInfoAddressAddress1(value)
                                    );
                                }}
                            ></TextField>
                        </div>
                    </li>
                    {/* ------------- 第二行 --------------*/}
                    <li className="flex flex-col ">
                        <p className="item-center text-gray-400 font-normal">
                            Address Line 2
                        </p>
                        <div className="ml-4">
                            <TextField
                                id="Address2"
                                value={address.Address2}
                                size="small"
                                fullWidth
                                className="text-sm font-bold text-gray-900"
                                onChange={(event) => {
                                    // const attributeID = event.target.id;
                                    // console.log(attributeID);
                                    const value = event.target.value;

                                    // console.log(value);
                                    dispatch(
                                        setBuyerInfoAddressAddress2(value)
                                    );
                                }}
                            ></TextField>
                        </div>
                    </li>
                    {/* ------------- 第三行 --------------*/}
                    <li className="flex flex-col ">
                        <p className="item-center text-gray-400 font-normal">
                            Nation and City
                        </p>
                        <div className="ml-4 pb-2 pt-1 flex flex-wrap">
                            <div className={NationCityDivClassName}>
                                <TextField
                                    id="Address1"
                                    value={address.City}
                                    size="small"
                                    label="City"
                                    className="text-sm font-bold text-gray-900 w-20 m-2"
                                    onChange={(event) => {
                                        // const attributeID = event.target.id;
                                        // console.log(attributeID);
                                        const value = event.target.value;

                                        // console.log(value);
                                        dispatch(
                                            setBuyerInfoAddressCity(value)
                                        );
                                    }}
                                ></TextField>
                            </div>
                            <p className="mt-2 mb-1"> &nbsp; - &nbsp; </p>
                            <div className={NationCityDivClassName}>
                                <TextField
                                    id="Province"
                                    value={address.Province}
                                    size="small"
                                    label="Province"
                                    className="text-sm font-bold text-gray-900 w-20 m-2"
                                    onChange={(event) => {
                                        // const attributeID = event.target.id;
                                        // console.log(attributeID);
                                        const value = event.target.value;

                                        // console.log(value);
                                        dispatch(
                                            setBuyerInfoAddressProvince(value)
                                        );
                                    }}
                                ></TextField>
                            </div>
                            <p className="mt-2 mb-1"> &nbsp; - &nbsp; </p>
                            {/* ------------- 国家 --------------*/}
                            <div
                                className={classNames({
                                    NationCityDivClassName: true,
                                })}
                                style={{
                                    marginTop: "0.5rem",
                                }}
                            >
                                <FormControl size="small">
                                    <InputLabel id="country-select-label">
                                        Country
                                    </InputLabel>
                                    <Select
                                        autoFocus
                                        labelId="country-select-label"
                                        value={contactFormCountryValue}
                                        label="country"
                                        onChange={handleCountryChange}
                                    >
                                        {countryCodeList.map((value) => {
                                            return (
                                                <MenuItem
                                                    value={value.countryCode}
                                                    key={value.countryCode}
                                                >
                                                    {value.countryName}
                                                </MenuItem>
                                            );
                                        })}
                                    </Select>
                                </FormControl>
                                <Dialog
                                    open={alertStatus}
                                    onClose={handleCountryAlertClose}
                                >
                                    <DialogContent>
                                        <Alert severity="info">
                                            <AlertTitle>Info</AlertTitle>
                                            Change Country will rerender PayPal
                                            Smart Payment Button base on your
                                            new country or area select.
                                        </Alert>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button
                                            onClick={handleCountryAlertClose}
                                        >
                                            Close
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                            </div>

                            <p className="mt-2 mb-1"> &nbsp; - &nbsp; </p>
                            <div className="mt-2 mb-1 w-24">
                                <TextField
                                    id="PostalCode"
                                    value={address.PostalCode}
                                    size="small"
                                    label="PostalCode"
                                    onChange={(event) => {
                                        // const attributeID = event.target.id;
                                        // console.log(attributeID);
                                        const value = event.target.value;

                                        // console.log(value);
                                        dispatch(
                                            setBuyerInfoAddressPostalCode(value)
                                        );
                                    }}
                                ></TextField>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
};
export default Contact;
