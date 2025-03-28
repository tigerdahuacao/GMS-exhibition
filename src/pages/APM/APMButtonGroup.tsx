import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { FC, useState } from "react";
import { setAPMButtonsDisable } from "../../reducer/reducers/globalToggleReducer";
import { getAPMButtonsDisable } from "../../reducer/reducers/globalToggleReducer";
import { useAppSelector, useAppDispatch } from "../../typeHooks";
import { APMMethod } from "./index";
import { setAPMMethod } from "../../reducer/reducers/APMReducer";
import APM_METHOD_ENUM from "./APM_METHOD_ENUM";

const APMButtonGroup: FC<APMMethod> = (childrenProp: APMMethod) => {
    const { method, setMethod } = childrenProp;

    const APMMethodList = [
        APM_METHOD_ENUM.Bancontact,
        APM_METHOD_ENUM.BLIK,
        APM_METHOD_ENUM.eps,
        APM_METHOD_ENUM.giropay,
        APM_METHOD_ENUM.iDEAL,
        APM_METHOD_ENUM.MyBank,

        //Pay upon invoice 的方式先不做
        // "Pay upon invoice",
        APM_METHOD_ENUM.Przelewy24,
        APM_METHOD_ENUM.SOFORT,
    ];

    const children = APMMethodList.map((APMMethod) => {
        return (
            <ToggleButton
                value={APMMethod}
                key={APMMethod}
                //margin不手动为0话会被设为-1, 看起来很奇怪;加粗字体看起来更清楚些
                style={{ margin: "0px", fontWeight: 700 }}
            >
                {APMMethod}
            </ToggleButton>
        );
    });
    const dispatch = useAppDispatch();

    const isDisable: boolean = useAppSelector((state) =>
        getAPMButtonsDisable(state)
    );

    const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        newAPM: APM_METHOD_ENUM
    ) => {
        if (newAPM) {
            dispatch(setAPMButtonsDisable(true));
            console.log("当前的APM方式:", newAPM);
            setMethod(newAPM);
            dispatch(setAPMMethod(newAPM));
        }
    };

    return (
        <div>
            <ToggleButtonGroup
                size="large"
                color="primary"
                value={method}
                exclusive
                onChange={handleChange}
                disabled={isDisable}
            >
                {children}
            </ToggleButtonGroup>
        </div>
    );
};

export default APMButtonGroup;
