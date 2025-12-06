import { ACCOUNT_INFO, NODE_URL } from "$lib"
import type { AccountData, AccountURL } from "$lib"
import { Table } from "@wharfkit/contract"
import { APIClient } from "@wharfkit/antelope"

import abi from "./assets/abi.json"

const table = new Table({
    abi,
    account: ACCOUNT_INFO,
    name: "accounts",
    client: new APIClient({ url: NODE_URL }),
})

enum TypeURL {
    Website,
    Telegram,
    Twitter
}

export async function getAccountInfo(account: string): Promise<AccountData> {
    const result = await table.get(account, { key_type: "name" })
    return {
        ...result,
        url: parseURL(result.url)
    }
}

function normalize(input: string, type: TypeURL) {
    try {
        const url = URL.parse(input)
        if (url) {
            return url.href
        }

        const clean = input.replace(/[@\s]/g, '');
        if (!clean) return '';

        switch (type) {
            case TypeURL.Website:
                return `https://${input}`
            case TypeURL.Telegram:
                return `https://t.me/${clean}`
            case TypeURL.Twitter:
                return `https://x.com/${clean}`
        }
    } catch (error) {
        console.error(error)
        return ""
    }
};

function parseURL(data: string) {
    let result: AccountURL = {
        website: '',
        telegram: '',
        twitter: ''
    }

    try {
        const json = JSON.parse(data)

        result.website = json.website ? normalize(json.website, TypeURL.Website) : ''
        result.telegram = json.telegram ? normalize(json.telegram, TypeURL.Telegram) : ''
        result.twitter = json.twitter ? normalize(json.twitter, TypeURL.Twitter) : ''
    } catch (error) {
        console.log(error)
    }

    return result
}
