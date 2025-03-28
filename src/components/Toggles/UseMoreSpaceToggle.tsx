import { FC } from "react";
import { Tooltip, Button, FormControlLabel, Switch } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../typeHooks";
import { getIsMoreSpace, setIsMoreSpace } from "../../reducer/reducers/globalToggleReducer";

const UseMoreSpace: FC = () => {
    const dispatch = useAppDispatch();
    const isUseMoreSpace: boolean = useAppSelector(
        (state) => getIsMoreSpace(state)
    );
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // console.log("[handleChange]event?.target?.checked:", event?.target?.checked)
        dispatch(setIsMoreSpace(event?.target?.checked));
    };
    return (
        <div className="top-2 right-2 absolute ">
            <Tooltip
                title="点击这个按钮用以切换右侧部分的间距"
                placement="bottom"
                className="text-sky-500 hover:text-sky-600"
            >
                <FormControlLabel
                    control={
                        <Switch
                            checked={isUseMoreSpace}
                            onChange={handleChange}
                        />
                    }
                    label="切换大间距"
                />
            </Tooltip>
        </div>
    );
};

export default UseMoreSpace;
