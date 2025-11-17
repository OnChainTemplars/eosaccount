<script lang="ts">
    import { getAccountInfo } from "$lib/index";
    import Account from "$lib/components/Account.svelte";

    const accountInfo = "account.info";

    let account = $state(accountInfo);
    let promise = $state(getAccountInfo(accountInfo));
</script>

<div class="block">
    <h1>EOS Account</h1>
    <div>
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
            <Account {data} />
        {/await}
    </div>
</div>

<style>
    .block {
        margin-left: auto;
        margin-right: auto;
        background-color: white;
        max-width: 400px;
        padding: 5px 15px;
        border-radius: 10px;
        text-align: center;
    }

    .block input {
        background: #f3f6f4;
        padding: 5px;
        border: 0;
        border-radius: 10px;
    }
</style>
