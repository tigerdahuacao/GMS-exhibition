import { FC } from "react";
import { BancontactWord } from "./Bancontact/Bancontact";
import { SOFORTWord } from "./SOFORT/SOFORT";
import { IDEALWord } from "./iDEAL/iDEAL";
import { BLIKWord } from "./BLIK/BLIK";
import { APMMethod } from "./index";
import { epsWord } from "./eps/eps";
import { giropayWord } from "./giropay/giropay";
import { MyBankWord } from "./MyBank/MyBank";
import { P24Word } from "./Przelewy24/Przelewy24";
import APM_METHOD_ENUM from "./APM_METHOD_ENUM";

const APMInstructionArea: FC<APMMethod> = (childrenProp: APMMethod) => {
    console.log("APMInstructionArea, APM文章说明区域!");
    const getInstructionWords = () => {
        let instructionWords;
        if (childrenProp.method === APM_METHOD_ENUM.Bancontact) {
            instructionWords = BancontactWord;
            return <div>{instructionWords}</div>;
        } else if (childrenProp.method === APM_METHOD_ENUM.SOFORT) {
            instructionWords = SOFORTWord;
            return <div>{instructionWords}</div>;
        } else if (childrenProp.method === APM_METHOD_ENUM.iDEAL) {
            instructionWords = IDEALWord;
            return <div>{instructionWords}</div>;
        } else if (childrenProp.method === APM_METHOD_ENUM.BLIK) {
            instructionWords = BLIKWord;
            return <div>{instructionWords}</div>;
        } else if (childrenProp.method === APM_METHOD_ENUM.eps) {
            instructionWords = epsWord;
            return <div>{instructionWords}</div>;
        } else if (childrenProp.method === APM_METHOD_ENUM.giropay) {
            instructionWords = giropayWord;
            return <div>{instructionWords}</div>;
        } else if (childrenProp.method === APM_METHOD_ENUM.MyBank) {
            instructionWords = MyBankWord;
            return <div>{instructionWords}</div>;
        } else if (childrenProp.method === APM_METHOD_ENUM.PUI) {
            instructionWords = BLIKWord;
            return <div>{instructionWords}</div>;
        } else if (childrenProp.method === APM_METHOD_ENUM.Przelewy24) {
            instructionWords = P24Word;
            return <div>{instructionWords}</div>;
        }
        return <div>{childrenProp.method}</div>;
    };
    return <div>{getInstructionWords()}</div>;
};
export default APMInstructionArea;
