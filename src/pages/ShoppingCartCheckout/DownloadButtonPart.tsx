import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from "@mui/material";
import SliderCaptcha from "rc-slider-captcha";
import { FC, useState } from "react";
import { useAppSelector } from "../../typeHooks";
import { getPaymentMethod } from "../../reducer/reducers/paymentMethodReducer";
import PAYMENT_METHOD from "../../enum/PAYMENT_METHOD";

const downloadFile = (url: string, filename: string) => {
    const downloadElement = document.createElement("a");
    downloadElement.style.display = "none";
    downloadElement.href = url;

    downloadElement.rel = "noopener noreferrer";
    if (filename) {
        downloadElement.download = filename;
    }
    document.body.appendChild(downloadElement);
    downloadElement.click();
    document.body.removeChild(downloadElement);
};

const DownloadButtonPart: FC = () => {
    const [open, setOpen] = useState(false);
    const paymentMethod: PAYMENT_METHOD = useAppSelector((state) =>
        getPaymentMethod(state)
    );

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const verifyCaptcha = async (data: { x: number }) => {
        if (data?.x && data.x >= 250) {
            handleDownload();

            setTimeout(() => {
                handleClose();
            }, 500);
            return Promise.resolve();
        }
        return Promise.reject();
    };

    const handleDownload = () => {
        if (paymentMethod === PAYMENT_METHOD.PAYPAL_BCDC) downloadBCDCSDD();
        if (paymentMethod === PAYMENT_METHOD.PAYPAL_APM) downloadAPMSDD();
    };

    const downloadBCDCSDD = () => {
        const url = `/resources/BCDC-CN.pdf`;
        downloadFile(
            url,
            "SPB inline guest integration guide - standalone button_V2_CN.pdf"
        );
    };

    const downloadAPMSDD = () => {
        const url = `${process.env.PUBLIC_URL}/resources/APM-SDD.txt`;
        downloadFile(url, "APM-SDD.txt");
    };

    return (
        <div className="relative bg-white px-6 pb-8 pt-10 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10 mt-8">
            <div className="mx-auto max-w-md">
                <Button variant="outlined" onClick={handleClickOpen}>
                    点击下载技术文档
                </Button>
                <Dialog onClose={handleClose} open={open}>
                    <DialogTitle className=" pb-2">
                        请把完成验证以下载资源
                    </DialogTitle>
                    <DialogContent>
                        <SliderCaptcha
                            mode="slider"
                            tipText={{
                                default: "向右拖动完成验证",
                                loading: "载入中...",
                                moving: "向右拖动至底端",
                                verifying: "验证中...",
                                error: "验证失败",
                            }}
                            onVerify={async (data) => {
                                console.log(data);
                                // verify data
                                return verifyCaptcha(data);
                            }}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Close</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    );
};

export default DownloadButtonPart;
