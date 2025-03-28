import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import { Tooltip } from "@mui/material";
import { FunctionComponent } from "react";
import "./fake-apple-pay.css";

const FakeApplePayButton: FunctionComponent = () => {
    return (
        <>
            <div className=" border-dotted border-2 border-sky-500 hover:border-solid pt-2">
                {/* <img
                    className=" w-auto h-20 object-contain  inline-block "
                    src={
                        process.env.PUBLIC_URL + "/image/apple-pay-fake-btn.png"
                    }
                /> */}

                <div className="apple-pay-button-with-text  apple-pay-button-black-with-text">
                    <span className="text-right">Buy with</span>
                    <img
                        className="  h-8  object-contain inline-block ml-2"
                        src={"/image/apple-pay-in-btn.svg"}
                    />
                    <span className="text">Pay</span>
                </div>

                <div>
                    <Tooltip
                        title="This button is a image! (Not actual working) Apple Pay feature is under development"
                        placement="right-end"
                    >
                        <QuestionMarkCircleIcon className="w-6 h-6" />
                    </Tooltip>
                </div>
            </div>
        </>
    );
};

export default FakeApplePayButton;
