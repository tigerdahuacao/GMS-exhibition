import { FC, useState } from "react";
import CodeDisplayAreaPrismDisplay from "./PrismDisplay";
import {
    CODE_SNIPPET_NAME,
    PrismCodeDisplaySettingProvider,
    PrismThemeNAME,
} from "./PrismDisplayContextProvider";
import Wrapper from "./Wrapper";

interface CodeDisplayAreaPrismProps {
    codeSnippetName?: CODE_SNIPPET_NAME;
    prismTheme?: PrismThemeNAME;
    languageType?: string;
}

const CodeDisplayAreaPrism: FC<CodeDisplayAreaPrismProps> = (
    props: CodeDisplayAreaPrismProps
) => {
    const {
        codeSnippetName,
        prismTheme,
        languageType = "html",
    } = props;
    console.log("Hello CodeDisplayAreaPrism!");
    return (
        <PrismCodeDisplaySettingProvider
            value={{
                codeSnippetName:
                    codeSnippetName ?? CODE_SNIPPET_NAME.SPB_STANDARD,
                prismTheme: prismTheme ?? PrismThemeNAME.github,
                languageType: languageType
            }}
        >
            <Wrapper />
        </PrismCodeDisplaySettingProvider>
    );
};

export default CodeDisplayAreaPrism;
