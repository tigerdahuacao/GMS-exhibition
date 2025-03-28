import { ToggleButtonGroup, ToggleButton } from "@mui/material";
import { FC, useState } from "react";
import APMInstructionArea from "./APMInstructionArea";
import APMDisplayArea from "./APMDisplayArea";
import APMButtonGroup from "./APMButtonGroup";
import APM_METHOD_ENUM from "./APM_METHOD_ENUM";
import { useAppSelector } from "@/typeHooks";
import { getAPMMethod } from "@/reducer/reducers/APMReducer";

export interface APMMethod {
    method: APM_METHOD_ENUM;
    setMethod: Function;
    showLabel: boolean;
    showField: boolean;
    showButton: boolean;
}

const APM: FC = () => {
    const selectMethod: APM_METHOD_ENUM = useAppSelector((state) => {
        return getAPMMethod(state);
    });
    const [APMMethod, setAPMMethod] = useState(selectMethod);
    console.log("APM页面!");

    return (
        <div>
            <APMButtonGroup
                method={APMMethod}
                setMethod={setAPMMethod}
                showLabel={true}
                showField={true}
                showButton={true}
            />
            <APMInstructionArea
                method={APMMethod}
                setMethod={setAPMMethod}
                showLabel={true}
                showField={true}
                showButton={true}
            />
            <div>
                <APMDisplayArea
                    method={APMMethod}
                    setMethod={setAPMMethod}
                    showLabel={true}
                    showField={true}
                    showButton={true}
                />
            </div>
        </div>
    );
};

export default APM;
