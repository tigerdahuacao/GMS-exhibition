import { ChangeEvent, FC, useState } from "react";
import { Tooltip, FormControlLabel, Switch } from "@mui/material";

export type CommonToggleProp = {
    handleChange: (
        event: ChangeEvent<HTMLInputElement>,
        checked: boolean
    ) => void;
    labelContent: string;
    tipContent: string;
    positionClass?: string;
};

export const CommonToggle: FC<CommonToggleProp> = ({
    handleChange,
    labelContent,
    tipContent,
    positionClass = "top-2 right-2 absolute ",
}) => {
    const [isChecked, setIsChecked] = useState(false);
    const [isDisable, setIsDisable] = useState(false);
    const wrapperHandleChange = (
        e: ChangeEvent<HTMLInputElement>,
        checked: boolean
    ) => {
        setIsDisable(true);
        setIsChecked(checked);
        handleChange(e, checked);
        setTimeout(()=>{
            setIsDisable(false);
        },800)
    };
    return (
        <div className={positionClass}>
            <Tooltip
                title={tipContent}
                placement="bottom"
                className="text-sky-500 hover:text-sky-600"
            >
                <FormControlLabel
                    control={
                        <Switch
                            checked={isChecked}
                            onChange={wrapperHandleChange}
                            disabled={isDisable}
                        />
                    }
                    label={labelContent}
                />
            </Tooltip>
        </div>
    );
};
