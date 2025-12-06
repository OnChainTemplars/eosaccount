export const NODE_URL = "https://eos.greymass.com"

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
