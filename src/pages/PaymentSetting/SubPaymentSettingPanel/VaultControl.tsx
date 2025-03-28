import {
    getOneTimeFlag,
    getRecurringFlag,
    getSaveACDCFlag,
    getSavePayPalWalletFlag,
    getUseACDCFlag,
    getUsePayPalWalletFlag,
    setOneTimeFlag,
    setRecurringFlag,
    setSaveACDCFlag,
    setSavePayPalWalletFlag,
    setUseACDCFlag,
    setUsePayPalWalletFlag,
} from "@/reducer/reducers/vaultReducer";
import { useAppDispatch, useAppSelector } from "@/typeHooks";
import { Box, Checkbox, FormControlLabel, Switch } from "@mui/material";
import { FC, useState } from "react";

const VaultControl: FC = () => {
    const dispatch = useAppDispatch();
    const [displayOneTime, setDisplayOneTime] = useState(
        useAppSelector((store) => getOneTimeFlag(store))
    );

    const [displayRecurringFlag, setDisplayRecurringFlag] = useState(
        useAppSelector((store) => getRecurringFlag(store))
    );

    const [displaySavePayPalWalletFlag, setDisplaySavePayPalWalletFlag] =
        useState(useAppSelector((store) => getSavePayPalWalletFlag(store)));

    const [displaySaveACDCFlag, setDisplaySaveACDCFlag] = useState(
        useAppSelector((store) => getSaveACDCFlag(store))
    );

    const [displayUsePayPalWalletFlag, setDisplayUsePayPalWalletFlag] =
        useState(useAppSelector((store) => getUsePayPalWalletFlag(store)));

    const [displayUseACDCFlag, setDisplayUseACDCFlag] = useState(
        useAppSelector((store) => getUseACDCFlag(store))
    );

    const handleSaveVaultSwitchClick = (
        event: React.ChangeEvent<HTMLInputElement> | undefined,
        isInDom: boolean,
        setValue?: boolean
    ) => {
        let targetValue: boolean;
        if (isInDom) {
            targetValue = event!.target.checked;
        } else {
            if (setValue === true) {
                targetValue = true;
            } else {
                targetValue = false;
            }
        }

        if (targetValue) {
            setDisplayOneTime(targetValue);
            dispatch(setOneTimeFlag(targetValue));
            turnOffUseVault();
        } else {
            turnOffSaveVault();
        }
    };

    const turnOffSaveVault = () => {
        setDisplayOneTime(false);
        dispatch(setOneTimeFlag(false));
        handleSavePayPalWalletClick(true, false);
        handleSaveACDCClick(true, false);
    };

    const turnOffUseVault = () => {
        setDisplayRecurringFlag(false);
        dispatch(setRecurringFlag(false));
        handleUsePayPalWalletFlag(true, false);
        handleUseACDCFlag(true, false);
    };

    const turnOnSaveVault = () => {
        handleSaveVaultSwitchClick(undefined, false, true);
    };
    const turnOnUseVault = () => {
        handleUseVaultSwitchClick(undefined, false, true);
    };

    const checkTurnOffSaveVault = (targetValue: boolean) => {
        if (
            (targetValue === false && displaySaveACDCFlag === false) ||
            (targetValue === false && displaySavePayPalWalletFlag === false)
        ) {
            setDisplayOneTime(false);
            dispatch(setOneTimeFlag(false));
        }
    };
   

    const checkTurnOffUseVault = (targetValue: boolean) => {
        if (
            (targetValue === false && displayUseACDCFlag === false) ||
            (targetValue === false && displayUsePayPalWalletFlag === false)
        ) {
            setDisplayRecurringFlag(false);
            dispatch(setRecurringFlag(false));
        }
    };



    const handleSavePayPalWalletClick = (
        isSetValue?: boolean,
        setValue?: boolean
    ) => {
        let targetValue: boolean;
        if (isSetValue) {
            targetValue = setValue!;
        } else {
            targetValue = !displaySavePayPalWalletFlag;
        }

        setDisplaySavePayPalWalletFlag(targetValue);
        dispatch(setSavePayPalWalletFlag(targetValue));

        if (targetValue === true) {
            turnOnSaveVault();
            turnOffUseVault();
        }
        checkTurnOffSaveVault(targetValue);
    };

    const handleSaveACDCClick = (isSetValue?: boolean, setValue?: boolean) => {
        let targetValue: boolean;
        if (isSetValue) {
            targetValue = setValue!;
        } else {
            targetValue = !displaySaveACDCFlag;
        }
        setDisplaySaveACDCFlag(targetValue);
        dispatch(setSaveACDCFlag(targetValue));
        if (targetValue === true) {
            turnOnSaveVault();
            turnOffUseVault();
        }
        checkTurnOffSaveVault(targetValue);
    };

    const handleUseVaultSwitchClick = (
        event: React.ChangeEvent<HTMLInputElement> | undefined,
        isInDom: boolean,
        setValue?: boolean
    ) => {
        let targetValue: boolean;
        if (isInDom) {
            targetValue = event!.target.checked;
            
        } else {
            if (setValue === true) {
                targetValue = true;
            } else {
                targetValue = false;
            }
        }

        if (targetValue) {
            setDisplayRecurringFlag(targetValue);
            dispatch(setRecurringFlag(targetValue));
            turnOffSaveVault();
        } else {
            turnOffUseVault();
        }
        
    };

    const handleUsePayPalWalletFlag = (
        isSetValue?: boolean,
        setValue?: boolean
    ) => {
        let targetValue: boolean;
        if (isSetValue) {
            targetValue = setValue!;
        } else {
            targetValue = !displayUsePayPalWalletFlag;
        }

        setDisplayUsePayPalWalletFlag(targetValue);
        dispatch(setUsePayPalWalletFlag(targetValue));


        if (targetValue === true) {
            turnOnUseVault();
            turnOffSaveVault();
        }
        checkTurnOffUseVault(targetValue);
    };

    const handleUseACDCFlag = (isSetValue?: boolean, setValue?: boolean) => {
        let targetValue: boolean;
        if (isSetValue) {
            targetValue = setValue!;
        } else {
            targetValue = !displayUseACDCFlag;
        }

        setDisplayUseACDCFlag(targetValue);
        dispatch(setUseACDCFlag(targetValue));

        if (targetValue === true) {
            turnOnUseVault();
            turnOffSaveVault();
        }
        checkTurnOffUseVault(targetValue);
    };

    return (
        <div className=" pt-4">
            <p className=" font-extrabold  text-2xl">Make your Vault Setting</p>
            
            {/* <p>(ACDC Vault feature is not developed yet)</p> */}
            <div className="flex items-center">
                <div className="m-2 rounded-lg border-2 border-dotted">
                    <FormControlLabel
                        control={
                            <Switch
                                checked={displayOneTime}
                                name={"one-time"}
                                onChange={(
                                    event: React.ChangeEvent<HTMLInputElement>
                                ) => {
                                    handleSaveVaultSwitchClick(event, true);
                                }}
                            />
                        }
                        label={
                            "Save Vault (Vault your Payment Method at one-time)"
                        }
                        className=" m-2 p-2"
                    ></FormControlLabel>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            ml: 3,
                        }}
                    >
                        <FormControlLabel
                            label="Save PayPal wallet"
                            control={
                                <Checkbox
                                    checked={displaySavePayPalWalletFlag}
                                    onChange={() => {
                                        handleSavePayPalWalletClick();
                                    }}
                                />
                            }
                        />
                        <FormControlLabel
                            label="Save Debit and Credit Card(ACDC)"
                            control={
                                <Checkbox
                                    checked={displaySaveACDCFlag}
                                    onChange={() => {
                                        handleSaveACDCClick();
                                    }}
                                />
                            }
                        />
                    </Box>
                </div>
                <div className="m-2 rounded-lg border-2 border-dotted">
                    <FormControlLabel
                        control={
                            <Switch
                                checked={displayRecurringFlag}
                                name={"Use Your Vault at Checkout Page"}
                                onChange={(
                                    event: React.ChangeEvent<HTMLInputElement>
                                ) => {
                                    handleUseVaultSwitchClick(event, true);
                                }}
                            />
                        }
                        label={"Use Vault (Use Your Vault at Checkout Page)"}
                        className=" m-2 p-2"
                    />
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            ml: 3,
                        }}
                    >
                        <FormControlLabel
                            label="Use Saved PayPal wallet"
                            control={
                                <Checkbox
                                    checked={displayUsePayPalWalletFlag}
                                    onChange={() => {
                                        handleUsePayPalWalletFlag();
                                    }}
                                />
                            }
                        />
                        <FormControlLabel
                            label="Use Saved Debit and Credit Card(ACDC)"
                            control={
                                <Checkbox
                                    checked={displayUseACDCFlag}
                                    onChange={() => {
                                        handleUseACDCFlag();
                                    }}
                                />
                            }
                        />
                    </Box>
                </div>
            </div>
        </div>
    );
};

export default VaultControl;
