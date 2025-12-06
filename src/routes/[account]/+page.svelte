<script lang="ts">
    import { getAccountInfo } from "$lib/contract";
    import type { PageProps } from "./$types";
    import Account from "$lib/components/Account.svelte";

    let { data }: PageProps = $props();

    let promise = $state(getAccountInfo(data.account));
</script>

<div class="block">
    <h1>EOS Account</h1>
    <div>
        {#await promise}
            <div>...</div>
        {:then data}
            <Account {data} />
        {/await}
    </div>
</div>

<style>
    @import '$lib/styles/style.css';
</style>
