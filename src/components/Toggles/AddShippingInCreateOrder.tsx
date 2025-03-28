import { FC } from "react";
import { Tooltip, Button, FormControlLabel, Switch } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../typeHooks";
import { setShippingOptionInCreateOrder } from "../../reducer/reducers/shippingOptionReducer";

const AddShippingInCreateOrder: FC = () => {
    const dispatch = useAppDispatch();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(
            "[handleChange]event?.target?.checked:",
            event?.target?.checked
        );
        dispatch(setShippingOptionInCreateOrder(event?.target?.checked));
    };

    const toggleCheck = useAppSelector(
        (state) => state.withShippingOption.isWithShipping
    );

    return (
        <div className=" m-2 p-2">
            <Tooltip
                title="Add"
                placement="bottom"
                className="text-sky-500 hover:text-sky-600"
            >
                <FormControlLabel
                    control={
                        <Switch checked={toggleCheck} onChange={handleChange} />
                    }
                    label="是否在create order中使用物流运输地址参数, 这会导致BCDC按钮的表现不一样"
                />
            </Tooltip>
        </div>
    );
};

export default AddShippingInCreateOrder;
