<script lang="ts">
    import { ACCOUNT_INFO } from "$lib";
    import { appState } from "../state.svelte";
    import { getAccountInfo } from "$lib/contract";
    import { isLoggedIn, restoreSession, login, logout } from "$lib/session.svelte";
    import Account from "$lib/components/Account.svelte";
    import Edit from "$lib/components/Edit.svelte";

    let account: string = $state(ACCOUNT_INFO);
    let promise = $state(getAccountInfo(ACCOUNT_INFO));
</script>

<div class="block" onload={restoreSession}>
    <div class="head">
        <h1>EOS Account</h1>
        {#if isLoggedIn()}
            <button onclick={logout}>Logout</button>
        {:else}
            <button onclick={login}>Login</button>
        {/if}
    </div>
    <div class="search">
        <input
            placeholder="Search EOS Account"
            bind:value={account}
            onchange={() => (promise = getAccountInfo(account))}
        />
    </div>
    <div>
        {#await promise}
            <div>...</div>
        {:then data}
            {#if appState.isEdit}
                <Edit {data} />
            {:else}
                <Account {data} />
            {/if}
        {/await}
    </div>
</div>

<style>
    @import "$lib/styles/style.css";

    .block input {
        width: 100%;
    }

    .head,
    .search {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 35px;
    }
</style>
