import { FC, useEffect } from "react";

// https://www.npmjs.com/package/@paypal/react-paypal-js
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import Tooltip from "@mui/material/Tooltip";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";

interface FakeSPBButtonInitOption {
    scriptProviderOptions?: any;
    styleOptions?: any;
}

const FakeSPBButton: FC<FakeSPBButtonInitOption> = ({
    scriptProviderOptions,
    styleOptions,
}) => {
    useEffect(() => {});

    const renderFakeButton = () => {
        const clientId = window.clientID;
        const buyerCountry = scriptProviderOptions?.buyerCountry ?? "US";
        const disableFunding = scriptProviderOptions?.buyerCountry ?? ["card"];
        const layout = styleOptions?.layout ?? "horizontal";
        const shape = styleOptions?.shape ?? "pill";
        const label = styleOptions?.label ?? "checkout";
        const tagline = styleOptions?.tagline ?? false;
        const height = styleOptions?.height ?? 40;
        const styleObject = {
            layout: layout,
            shape: shape,
            label: label,
            tagline: tagline,
        };

        if (height) {
            const heightObj = { height: height };
            Object.assign(styleObject, heightObj);
        }
        return (
            // <div style={{
            //    borderStyle:"dashed",
            //    borderWidth:"2px",
            //    borderColor:"red",
            //    paddingTop:"1px"
            // }}>

            <div className=" border-dotted border-2 border-sky-500 hover:border-solid pt-2">
                <PayPalScriptProvider
                    options={{
                        clientId: clientId,
                        buyerCountry: buyerCountry,
                        disableFunding: disableFunding,
                    }}
                    // options={{ clientId: clientId, buyerCountry: "US" ,disableFunding:["card"]}}
                >
                    {/* <PayPalButtons /> */}

                    <PayPalButtons style={styleObject} />
                </PayPalScriptProvider>
                <div>
                    <Tooltip title="This button set is only for display!(Not actual working)" placement="right-end">
                        <QuestionMarkCircleIcon className="w-6 h-6" />
                    </Tooltip>
                </div>
            </div>
        );
    };

    return <>{renderFakeButton()}</>;
};

export default FakeSPBButton;
