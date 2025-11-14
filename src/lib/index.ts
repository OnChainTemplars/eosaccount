import { Table } from "@wharfkit/contract"
import { APIClient } from "@wharfkit/antelope"

import abi from "./assets/abi.json"

type Data = {
    avatar: string,
    desc: string,
    title: string,
}

const table = new Table({
    abi,
    account: "account.info",
    name: "accounts",
    client: new APIClient({ url: "https://eos.greymass.com" }),
})

export async function getAccountInfo(account: string) {
    const result: Data = await table.get(account, { key_type: "name" })
    return result
}
