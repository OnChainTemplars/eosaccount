<script lang="ts">
    import { getAccountInfo } from "$lib/index"

    const accountInfo = "account.info"

    let account = $state(accountInfo)
    let promise = $state(getAccountInfo(accountInfo))
</script>

<div class="block">
    <h1>EOS Account</h1>
    <div>
        <input
            placeholder="Search EOS Account"
            bind:value={account}
            onchange={() => promise = getAccountInfo(account)}
        >
    </div>
    <div>
        {#await promise}
            <div>...</div>
        {:then data} 
            <div>
                <h3>
                    {data.title}
                </h3>
            </div>
            <div class="avatar">
                <img alt="Avatar" src={data.avatar}>
            </div>
            <div>
                <p>{data.desc}</p>
            </div>
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
    background: #F3F6F4;
    padding: 5px;
    border: 0;
    border-radius: 10px;
}

.avatar {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
    max-width: 300px;
    max-height: 300px;
    overflow: hidden;
}

.avatar img {
    max-height: 300px;
}
</style>
