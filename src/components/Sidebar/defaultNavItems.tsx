import {
    ClipboardDocumentIcon,
    HomeIcon,
    ArrowUturnLeftIcon,
    WalletIcon,
    BeakerIcon,
    ShoppingBagIcon,
    QuestionMarkCircleIcon,
    CubeTransparentIcon,
} from "@heroicons/react/24/outline";
import { NavItem } from "./Sidebar";
import {
    CurrencyEuroIcon,
    CurrencyPoundIcon,
    ShoppingCartIcon,
    CurrencyDollarIcon,
    CreditCardIcon,
} from "@heroicons/react/20/solid";

const productEnvItemList: NavItem[] = [
    {
        label: "Dashboard",
        href: "/lab",
        icon: <HomeIcon className="w-6 h-6" />,
    },
    {
        label: "Payment Setting",
        href: "/lab/PaymentSetting",
        icon: <ClipboardDocumentIcon className="w-6 h-6" />,
    },
    {
        label: "Products",
        href: "/lab/product",
        icon: <ShoppingBagIcon className="w-6 h-6" />,
    },
    {
        label: "Checkout",
        href: "/lab/CheckoutPage",
        icon: <ShoppingCartIcon className="w-6 h-6" />,
    },
    {
        label: "APM",
        href: "/lab/APM",
        icon: <WalletIcon className="w-6 h-6" />,
    },
];

const localDevelopmentEnvItemList: NavItem[] = [
    {
        label: "GooglePay",
        href: "/lab/googlePay",
        icon: <CurrencyDollarIcon className="w-6 h-6" />,
    },
    {
        label: "ApplePay",
        href: "/lab/applePay",
        icon: <CurrencyEuroIcon className="w-6 h-6" />,
    },

    {
        label: "Venmo",
        href: "/lab/venmo",
        icon: <CurrencyPoundIcon className="w-6 h-6" />,
    },

    {
        label: "Vault",
        href: "/lab/vault",
        icon: <CubeTransparentIcon className="w-6 h-6" />,
    },

    {
        label: "ACDC",
        href: "/lab/ACDC",
        icon: <CreditCardIcon className="w-6 h-6" />,
    },

    {
        label: "SinglePageTest",
        href: "/lab/singlePageTest",
        icon: <BeakerIcon className="w-6 h-6" />,
    },
    {
        label: "Tooltips",
        href: "/lab/tooltips",
        icon: <QuestionMarkCircleIcon className="w-6 h-6" />,
    },
];

//prod env
let defaultNavItems: NavItem[] = [...productEnvItemList];

//add local test env 
// VITE_REACT_APP_SHOW_SIDEBAR_TEST
// 用于在侧边栏显示一些不存在和还未做好的
const showSidebarTest = import.meta.env.VITE_REACT_APP_SHOW_SIDEBAR_TEST;

if( showSidebarTest && showSidebarTest === "TRUE"){
    defaultNavItems = [...defaultNavItems,...localDevelopmentEnvItemList]
}

export default defaultNavItems;
