import MyPanel from "@/components/Panel/MyPanel";

import { PaymentMethodList } from "./SubPaymentSettingPanel/PaymentMethodList";
import VaultControl from "./SubPaymentSettingPanel/VaultControl";

export default function PaymentSetting() {
    return (
        <>
            <div className=" space-y-2">
                <MyPanel>
                    <VaultControl />
                </MyPanel>
                <MyPanel>
                    <PaymentMethodList />
                </MyPanel>
            </div>
        </>
    );
}
