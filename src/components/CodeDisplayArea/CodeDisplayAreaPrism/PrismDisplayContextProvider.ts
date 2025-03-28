import { createContext } from "react"

export enum CODE_SNIPPET_NAME {
    SPB_STANDARD = "SPB_STANDARD",
    ACDC = "ACDC",
    SPB_BNPL = "SPB_BNPL",
    GOOGLEPAY = "GOOGLEPAY",
    APPLEPAY = "APPLEPAY",
    APM_IDEAL = "APM_IDEAL",
    BackEndAPI = "BackEndAPI",
    CREATE_ORDER_REQUEST_1 = "CREATE_ORDER_REQUEST_1"
}

export enum PrismThemeNAME {
    dracula = "dracula",
    duotoneDark = "duotoneDark",
    duotoneLight = "duotoneLight",
    github = "github",
    jettwaveDark = "jettwaveDark",
    jettwaveLight = "jettwaveLight",
    nightOwl = "nightOwl",
    nightOwlLight = "nightOwlLight",
    oceanicNext = "oceanicNext",
    okaidia = "okaidia",
    oneDark = "oneDark",
    oneLight = "oneLight",
    palenight = "palenight",
    shadesOfPurpl = "shadesOfPurpl",
    synthwave84 = "synthwave84",
    ultramin = "ultramin",
    vsDark = "vsDark",
    vsLight = "vsLight"
}

interface IPrismCodeDisplaySetting {
    codeSnippetName: CODE_SNIPPET_NAME,
    prismTheme: PrismThemeNAME,
    languageType:string
}

const prismCodeDisplaySettingDefaultValue: IPrismCodeDisplaySetting = {
    codeSnippetName: CODE_SNIPPET_NAME.SPB_STANDARD,
    prismTheme: PrismThemeNAME.github,
    languageType:"html"
}

export const PrismDisplayContext = createContext<IPrismCodeDisplaySetting>(prismCodeDisplaySettingDefaultValue)

const { Consumer: PrismCodeDisplaySettingConsumer, Provider: PrismCodeDisplaySettingProvider } = PrismDisplayContext;
export { PrismCodeDisplaySettingConsumer, PrismCodeDisplaySettingProvider }