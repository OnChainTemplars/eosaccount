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
    .block {
        max-width: 400px;
        margin-left: auto;
        margin-right: auto;
        padding: 5px 15px;
        border-radius: 10px;
        text-align: center;
        background-color: white;
    }

    .block input {
        width: 100%;
        padding: 5px;
        border: 0;
        border-radius: 10px;
        text-align: center;
        background: #f3f6f4;
    }

    .block button {
        padding: 5px;
        border: 0;
        border-radius: 10px;
        background-color: black;
        color: white;
    }

    .block button:hover {
        cursor: pointer;
    }

    .head {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 35px;
    }

    .search {
        display: flex;
        justify-content: space-around;
        padding: 0 35px;
    }
</style>
