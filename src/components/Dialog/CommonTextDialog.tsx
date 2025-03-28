import {
    Dialog,
    DialogContent,
    Alert,
    AlertTitle,
    DialogActions,
    Button,
} from "@mui/material";
import {
    FC,
    useEffect,
    useState,
    forwardRef,
    useImperativeHandle,
} from "react";

export type DialogAlertSeverity = "success" | "info" | "warning" | "error";

export type CommonDialogProps = {
    defaultDialogTitle?: string;
    defaultDialogContent?: string;
    defaultDialogSeverity?: DialogAlertSeverity;
};

export type DialogRef = {
    openDialog: () => void;
    openDialogWithCustomizedContent: (
        dialogTitle: string,
        dialogSeverity: DialogAlertSeverity,
        dialogContent?: string
    ) => void;
    openDialogWithTxnData: () => void;
};

const CommonTextDialog = forwardRef<DialogRef, CommonDialogProps>(
    (props, ref) => {
        const {
            defaultDialogTitle = "This is title",
            defaultDialogSeverity = "info",
            defaultDialogContent = "This is content",
        } = props;

        const [dialogOpenF, setDialogOpenF] = useState<boolean>(false);

        const [dialogTitle, setDialogTitle] =
            useState<string>(defaultDialogTitle);
        const [dialogSeverity, setDialogSeverity] =
            useState<DialogAlertSeverity>(defaultDialogSeverity);
        const [dialogContent, setDialogContent] =
            useState<string>(defaultDialogContent);

        const handleClose = () => {
            setDialogOpenF(false);
        };

        // 暴露给父组件的属性
        useImperativeHandle(ref, () => ({
            openDialog: () => {
                setDialogOpenF(true);
            },
            openDialogWithCustomizedContent: (
                dialogTitle,
                dialogSeverity,
                dialogContent
            ) => {
                if (dialogTitle) setDialogTitle(dialogTitle);
                if (dialogSeverity) setDialogSeverity(dialogSeverity);
                if (dialogContent) setDialogContent(dialogContent);
                setDialogOpenF(true);
            },
            openDialogWithTxnData: () => {
                setDialogOpenF(true);
            },
        }));

        return (
            <>
                <Dialog open={dialogOpenF} onClose={handleClose}>
                    <DialogContent>
                        <Alert severity={dialogSeverity}>
                            <AlertTitle>{dialogTitle}</AlertTitle>
                            {dialogContent}
                        </Alert>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Close</Button>
                    </DialogActions>
                </Dialog>
            </>
        );
    }
);

export default CommonTextDialog;
