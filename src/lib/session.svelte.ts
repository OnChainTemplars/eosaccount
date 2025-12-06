import { NODE_URL, NETWORK_ID, ACCOUNT_INFO } from "$lib"
import type { AccountData } from "$lib"
import { Session, SessionKit } from "@wharfkit/session"
import { WebRenderer } from "@wharfkit/web-renderer"
import { WalletPluginAnchor } from "@wharfkit/wallet-plugin-anchor"

const webRenderer = new WebRenderer()

const sessionKit = new SessionKit({
    appName: "eosaccount",
    chains: [
        {
            id: NETWORK_ID,
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
            account: ACCOUNT_INFO,
            name: "update",
            authorization: [session.permissionLevel],
            data: {
                ...accountData,
                modifier: session.actor.toString(),
                url: JSON.stringify(accountData.url)
            },
        }

        await session.transact({ action: data })
    }
}
