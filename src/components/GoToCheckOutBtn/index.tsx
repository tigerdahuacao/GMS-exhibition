import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
} from "@mui/material";
import { FC, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getShoppingCart } from "../../reducer/reducers/shoppingCartReducer";
import { useAppSelector } from "../../typeHooks";

const GoToCheckOutBtn: FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const pathname = location.pathname;
    const shoppingCartList = useAppSelector((state) => getShoppingCart(state));

    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const getLink = () => {
        if (pathname.startsWith("/lab")) {
            return "/lab/CheckoutPage";
        } else if (pathname.startsWith("/display")) {
            return "/display/CheckoutPage";
        } else if (pathname.startsWith("/")) {
            return "/CheckoutPage";
        } else {
            return "/CheckoutPage";
        }
    };

    function handleClick() {
        if (shoppingCartList.length == 0) {
            handleClickOpen();
            return;
        }
        // debugger;
        navigate(getLink());
    }

    return (
        <div className="w-1/2 px-2">
            <button
                className="w-full bg-yellow-400 text-gray-800 py-2 px-4 rounded-full font-bold hover:bg-gray-300"
                onClick={handleClick}
            >
                Go To Checkout
            </button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Empty Shopping Cart
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Please add product to your shopping cart!
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>OK</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};
export default GoToCheckOutBtn;
