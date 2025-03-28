/// <reference types="vite/client" />
interface Window {
    paypal: any;
    clientID: any;
    secretKey: any;
    sellerID: any;
    google:any;
    ApplePaySession:any;
}

interface process {
    env: {
        REACT_APP_HAS_DEFAULT_ITEM_IN_LAB_ROUTE: string
    }
}


