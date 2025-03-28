import CountryCodeJSONData from "../../Constant/CountryCode.json";

let countryCodeList: { countryName: string; countryCode: string; }[] = [];

Object.entries(CountryCodeJSONData).forEach((value, index) => {
    countryCodeList.push({
        countryName: value[1],
        countryCode: value[0]
    })
})

countryCodeList.sort((a, b) => {
    return a.countryName.localeCompare(b.countryName)
})

export default countryCodeList;