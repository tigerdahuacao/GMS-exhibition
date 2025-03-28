import { FC, useEffect } from "react";
import { APMMethod } from "./index";
import LoadAPMButton from "./JSSDK/LoadAPMButton";
import { renderBancontactBtn } from "./Bancontact/Bancontact";
import { useNavigate, useLocation } from "react-router-dom";
import { renderSOFORTBtn } from "./SOFORT/SOFORT";
import { renderIDEALBtn } from "./iDEAL/iDEAL";
import { renderBLIKBtn } from "./BLIK/BLIK";
import { renderEpsBtn } from "./eps/eps";
import { renderGiropayBtn } from "./giropay/giropay";
import { renderMyBankBtn } from "./MyBank/MyBank";
import { renderP24Btn } from "./Przelewy24/Przelewy24";
import classNames from "classnames";
import APM_METHOD_ENUM from "./APM_METHOD_ENUM";

const APMDisplayArea: FC<APMMethod> = (childrenProp: APMMethod) => {
    console.log("APMDisplayArea, APM按钮展示区域!");
    const navigate = useNavigate();
    const location = useLocation();

    console.table(childrenProp);

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

    const getNavFunction = () => {
        setTimeout(() => {
            // debugger;
            navigate(getLink());
        }, 3000);
    };

    useEffect(() => {
        if (childrenProp.method === APM_METHOD_ENUM.Bancontact) {
            (async () => {
                await LoadAPMButton(
                    APM_METHOD_ENUM.Bancontact,
                    "components=buttons,payment-fields,marks,funding-eligibility&enable-funding=bancontact&currency=EUR"
                    // "components=buttons,payment-fields,marks,funding-eligibility&enable-funding=bancontact,sofort,ideal,blik&currency=EUR"
                ).then(() => {
                    renderBancontactBtn(getNavFunction);
                });
            })();
        } else if (childrenProp.method === APM_METHOD_ENUM.SOFORT) {
            (async () => {
                await LoadAPMButton(
                    APM_METHOD_ENUM.SOFORT,
                    "components=buttons,payment-fields,marks,funding-eligibility&enable-funding=sofort&currency=EUR"
                ).then(() => {
                    renderSOFORTBtn(getNavFunction);
                });
            })();
        } else if (childrenProp.method === APM_METHOD_ENUM.iDEAL) {
            (async () => {
                await LoadAPMButton(
                    APM_METHOD_ENUM.iDEAL,
                    "components=buttons,payment-fields,marks,funding-eligibility&enable-funding=ideal&currency=EUR"
                ).then(() => {
                    renderIDEALBtn(getNavFunction);
                });
            })();
        } else if (childrenProp.method === APM_METHOD_ENUM.BLIK) {
            (async () => {
                await LoadAPMButton(
                    APM_METHOD_ENUM.BLIK,
                    "components=buttons,payment-fields,marks,funding-eligibility&enable-funding=blik&currency=PLN"
                ).then(() => {
                    renderBLIKBtn(getNavFunction);
                });
            })();
        } else if (childrenProp.method === APM_METHOD_ENUM.eps) {
            (async () => {
                await LoadAPMButton(
                    APM_METHOD_ENUM.eps,
                    "components=buttons,payment-fields,marks,funding-eligibility&enable-funding=eps&currency=EUR"
                ).then(() => {
                    renderEpsBtn(getNavFunction);
                });
            })();
        } else if (childrenProp.method === APM_METHOD_ENUM.giropay) {
            (async () => {
                await LoadAPMButton(
                    APM_METHOD_ENUM.giropay,
                    "components=buttons,payment-fields,marks,funding-eligibility&enable-funding=giropay&currency=EUR"
                ).then(() => {
                    renderGiropayBtn(getNavFunction);
                });
            })();
        } else if (childrenProp.method === APM_METHOD_ENUM.MyBank) {
            (async () => {
                await LoadAPMButton(
                    APM_METHOD_ENUM.MyBank,
                    "components=buttons,payment-fields,marks,funding-eligibility&enable-funding=mybank&currency=EUR"
                ).then(() => {
                    renderMyBankBtn(getNavFunction);
                });
            })();
        } else if (childrenProp.method === APM_METHOD_ENUM.Przelewy24) {
            (async () => {
                await LoadAPMButton(
                    APM_METHOD_ENUM.Przelewy24,
                    "components=buttons,payment-fields,marks,funding-eligibility&enable-funding=p24&currency=PLN"
                ).then(() => {
                    renderP24Btn(getNavFunction);
                });
            })();
        }
    });
    return (
        <div>
            {/* {childrenProp.method} */}
            <div
                className={classNames({
                    hidden: !childrenProp.showLabel,
                })}
            >
                <div id="mark-container"></div>
            </div>

            <div
                className={classNames({
                    hidden: !childrenProp.showField,
                })}
            >
                <div className=" mb-2">
                    <div id="payment-fields-container"></div>
                </div>
            </div>

            <div
                className={classNames({
                    hidden: !childrenProp.showButton,
                })}
            >
                <div id="paypal-button-container"></div>
            </div>
        </div>
    );
};
export default APMDisplayArea;
