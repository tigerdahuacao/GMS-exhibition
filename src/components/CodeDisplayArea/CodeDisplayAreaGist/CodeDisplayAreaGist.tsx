import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import classNames from "classnames";
import { FC, useState } from "react";
import ReactEmbedGist from "react-embed-gist";
import PAYMENT_METHOD from "@/enum/PAYMENT_METHOD";

const CodeDisplayAreaGist: FC = () => {
    const [codeType, setCodeType] = useState(PAYMENT_METHOD.PAYPAL_STANDARD);

    const CodeSampleConstantList: PAYMENT_METHOD[] = [
        PAYMENT_METHOD.PAYPAL_APM,
        PAYMENT_METHOD.PAYPAL_STANDARD,
        PAYMENT_METHOD.PAYPAL_BCDC,
        PAYMENT_METHOD.PAYPAL_BNPL,
    ];

    const children = CodeSampleConstantList.map(
        (CodeSampleConstant: PAYMENT_METHOD) => {
            return (
                <ToggleButton
                    value={CodeSampleConstant}
                    key={CodeSampleConstant}
                    //margin不手动为0话会被设为-1, 看起来很奇怪;加粗字体看起来更清楚些
                    style={{ margin: "0px", fontWeight: 700 }}
                >
                    {CodeSampleConstant}
                </ToggleButton>
            );
        }
    );

    const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        newCodeType: PAYMENT_METHOD
    ) => {
        setCodeType(newCodeType);
    };

    const renderGistCodePart = () => {
        let mGistMap = new Map<PAYMENT_METHOD, `${string}/${string}`>();
        mGistMap.set(
            PAYMENT_METHOD.PAYPAL_STANDARD,
            "user-q123/ee71b914500f57517ce0af83e11bab9c"
        );
        mGistMap.set(
            PAYMENT_METHOD.PAYPAL_BCDC,
            "user-q123/fe334df0fd5286a532f144708c734754"
        );
        mGistMap.set(
            PAYMENT_METHOD.PAYPAL_BNPL,
            "user-q123/36cf7b698b062902393e9a73b535c0ce"
        );
        mGistMap.set(
            PAYMENT_METHOD.PAYPAL_ACDC,
            "PPGMS-Test/b1167d20d8d110ccf8ef78f18b1c631d"
        );

        let gistUrl: `${string}/${string}` =
            mGistMap.get(codeType) ??
            "user-q123/ee71b914500f57517ce0af83e11bab9c";
            
        return (
            <>
                {/* https://www.npmjs.com/package/react-embed-gist */}
                <ReactEmbedGist
                    gist={gistUrl}
                    // wrapperClass="gist__bash"
                    // loadingClass="loading__screen"
                    // titleClass="gist__title"
                    // errorClass="gist__error"
                    // contentClass="gist__content"
                    // file=".bash_profile.sh"
                    // loadingFallback={<Loading />}
                />
            </>
        );
    };

    return (
        <div
            className={classNames({
                "relative bg-white px-6 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-3xl sm:rounded-lg sm:px-10":
                    true,
                "pt-10": true,
            })}
        >
            <div className="mx-auto max-w-2xl">
                {/* Divide line in each div */}
                <div className="divide-y divide-gray-300/50">
                    <div>
                        <ToggleButtonGroup
                            size="large"
                            color="primary"
                            value={codeType}
                            exclusive
                            onChange={handleChange}
                            // disabled={isDisable}
                        >
                            {children}
                        </ToggleButtonGroup>
                    </div>
                    {renderGistCodePart()}
                </div>
            </div>
        </div>
    );
};

export default CodeDisplayAreaGist;
