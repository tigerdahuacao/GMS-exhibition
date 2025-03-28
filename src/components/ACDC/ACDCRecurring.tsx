import { FC, useEffect, useRef, useState } from "react";
import CommonTextDialog, { DialogRef } from "../Dialog/CommonTextDialog";
import { useAppDispatch, useAppSelector } from "@/typeHooks";
import { useLocation, useNavigate } from "react-router-dom";
import { print_console_ACDC_btn } from "./ACDCCallBack";
import getCreateOrderObjectFn from "@/service/LoadPayPalScript/createOrderObject.util";
import { getVaultData } from "@/reducer/reducers/vaultReducer";

const ACDCRecurring: FC = () => {
    const vaultData = useAppSelector((store) => getVaultData(store));
    const dialogRef = useRef<DialogRef>(null);

    const openDialogFn = (transactionID: string) => {
        setTimeout(() => {
            dialogRef.current?.openDialogWithCustomizedContent(
                "Congratulation!",
                "success",
                `Your transaction ${transactionID} is Completed!`
            );
        }, 500);
    };

    const navigate = useNavigate();
    const location = useLocation();
    const pathname = location.pathname;

    const getLink = () => {
        if (pathname.startsWith("/lab")) {
            return "/lab/thankyou";
        } else if (pathname.startsWith("/display")) {
            return "/display/thankyou";
        } else {
            return "";
        }
    };

    const submitOnClick = async () => {
        print_console_ACDC_btn();
        const { createOrder, onSuccess } = getCreateOrderObjectFn({
            navigate,
            getLink,
            isOpenDialog: true,
            openDialogFn: openDialogFn,
        });

        const { jsonResponse } = await createOrder();
        // console.log(jsonResponse)
        // debugger;
        onSuccess(jsonResponse);
    };

    const renderPayCardButtonDetail = (): string => {
        const cardLast4 = vaultData.acdc.cardInfo.last4;
        const brand = vaultData.acdc.cardInfo.brand;
        return `Pay with ${brand} ****${cardLast4}`;
    };

    return (
        <>
            <button
                id="ACDC-vault-Card_btn"
                type="button"
                onClick={submitOnClick}
                style={{fontFamily: "monospace"}}
                className="standard-btn"
            >
                {renderPayCardButtonDetail()}
            </button>

            <p id="result-message"></p>
            <CommonTextDialog ref={dialogRef} />
        </>
    );
};

export default ACDCRecurring;
