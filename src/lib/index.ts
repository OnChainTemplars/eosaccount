import { Table } from "@wharfkit/contract"
import { APIClient } from "@wharfkit/antelope"

import abi from "./assets/abi.json"

const table = new Table({
    abi,
    account: "account.info",
    name: "accounts",
    client: new APIClient({ url: "https://eos.greymass.com" }),
})

enum Url {
    Website,
    Telegram,
    Twitter
}

export async function getAccountInfo(account: string) {
    const result = await table.get(account, { key_type: "name" })

    return {
        ...result,
        url: parseURL(result.url)
    }
}

function normalize(input: string, type: Url) {
    try {
        const url = URL.parse(input)
        if (url) {
            return url.href
        }

        const clean = input.replace(/[@\s]/g, '');
        if (!clean) return '';

        switch (type) {
            case Url.Website:
                return `https://${input}`
            case Url.Telegram:
                return `https://t.me/${clean}`
            case Url.Twitter:
                return `https://x.com/${clean}`
        }
    } catch (error) {
        console.error(error)
        return ""
    }
};

function parseURL(data: string) {
    let result = {
        website: '',
        telegram: '',
        twitter: ''
    }

    try {
        const json = JSON.parse(data)

        result.website = json.website ? normalize(json.website, Url.Website) : ''
        result.telegram = json.telegram ? normalize(json.telegram, Url.Telegram) : ''
        result.twitter = json.twitter ? normalize(json.twitter, Url.Twitter) : ''
    } catch (error) {
        console.log(error)
    }

    return result
}
