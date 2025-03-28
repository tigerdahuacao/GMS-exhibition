import React from "react";
import ShoppingCartSummary from "../ShoppingCartSummary";

import { Button, Drawer } from "@mui/material";
// import AddIcon from '@material-ui/icons/Add';

export type Anchor = "top" | "left" | "bottom" | "right";

export interface DrawerProps {
    position: Anchor;
    // icon: any;
    [key: string]: any;
}

export default function TemporaryDrawer(props: DrawerProps) {
    const mPosition = props.position;
    const mIcon = props.icon;
    const mContent = props.content;

    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer =
        (anchor: Anchor, open: boolean) =>
        (event: React.KeyboardEvent | React.MouseEvent) => {
            if (
                event.type === "keydown" &&
                ((event as React.KeyboardEvent).key === "Tab" ||
                    (event as React.KeyboardEvent).key === "Shift")
            ) {
                return;
            }

            setState({ ...state, [anchor]: open });
        };

    return (
        <div>
            {([mPosition] as Anchor[]).map((anchor) => (
                <React.Fragment key={anchor}>
                   

                    <div onClick={toggleDrawer(anchor, true)}>
                    {mIcon}

                    </div>
                    <Drawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                    >
                        {mContent}
                    </Drawer>
                </React.Fragment>
            ))}
        </div>
    );
}
