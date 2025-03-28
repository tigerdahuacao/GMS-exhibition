import { FC, useEffect, useRef, useState } from "react";
import CodeDisplayAreaPrism from "@/components/CodeDisplayArea/CodeDisplayAreaPrism/CodeDisplayAreaPrism";
import { CommonToggle } from "@/components/Toggles/CommonToggle";
import CommonTextDialog, { DialogRef } from "@/components/Dialog/CommonTextDialog";
import { Button } from "@mui/material";


const SinglePageTest: FC = () => {
    
    const dialogRef = useRef<DialogRef>(null);
    return (
        <div>
           <Button
                onClick={() => {
                    dialogRef.current?.openDialogWithCustomizedContent(
                        "This is my title",
                        "error",
                        "This is my Content"
                    );
                }}
            >Open Dialog</Button>
            <CommonTextDialog ref={dialogRef} />
        </div>
    );
};

export default SinglePageTest;
