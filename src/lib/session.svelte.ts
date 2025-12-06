import { NODE_URL } from "$lib"
import type { AccountData } from "$lib"
import { Session, SessionKit } from "@wharfkit/session"
import { WebRenderer } from "@wharfkit/web-renderer"
import { WalletPluginAnchor } from "@wharfkit/wallet-plugin-anchor"

const webRenderer = new WebRenderer()

const sessionKit = new SessionKit({
    appName: "eosaccount",
    chains: [
        {
            id: "aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906",
            url: NODE_URL,
        },
    ],
    ui: webRenderer,
    walletPlugins: [new WalletPluginAnchor()],
})

let session: Session | undefined = $state(undefined)

export function isLoggedIn() {
    return session ? true : false
}

export async function restoreSession() {
    session = await sessionKit.restore()
}

export async function login() {
    const response = await sessionKit.login()
    session = response.session
}

export async function logout() {
    await sessionKit.logout(session)
    session = undefined
}

export async function update(accountData: AccountData) {
    if (session) {
        const data = {
            account: "account.info",
            name: "update",
            authorization: [session.permissionLevel],
            data: {
                ...accountData,
                url: JSON.stringify(accountData.url)
            },
        }

        await session.transact({ action: data })
    }
}
