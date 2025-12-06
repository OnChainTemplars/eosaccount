export const NODE_URL = "https://eos.greymass.com"
export const NETWORK_ID = "aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906"

export const ACCOUNT_INFO = "account.info"

export type AccountURL = {
    website: string;
    telegram: string;
    twitter: string;
}

export type AccountData = {
    account_name: string;
    title: string;
    avatar: string;
    desc: string;
    modifier: string;
    url: AccountURL;
}
