<script lang="ts">
    import { appState } from "../../state.svelte";
    import { update } from "$lib/session.svelte";

    let { data } = $props();
</script>

<div class="edit">
    <div class="item">
        <div class="name">Title:</div>
        <input bind:value={data.title} />
    </div>
    <div class="item">
        <div class="name">Avatar:</div>
        <input bind:value={data.avatar} />
    </div>
    <div class="item">
        <div class="name">Description:</div>
        <input bind:value={data.desc} />
    </div>
    <div class="item">
        <div class="name">Website:</div>
        <input bind:value={data.url.website} />
    </div>
    <div class="item">
        <div class="name">Telegram:</div>
        <input bind:value={data.url.telegram} />
    </div>
    <div class="item">
        <div class="name">Twitter:</div>
        <input bind:value={data.url.twitter} />
    </div>
    <div class="buttons">
        <button onclick={() => update(data)}>Update</button>
        <button onclick={() => (appState.isEdit = false)}>Close</button>
    </div>
</div>

<style>
    .edit {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin-top: 20px;
    }

    .edit > .item {
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        margin: 5px 0px;
        padding: 0 35px;
    }

    .edit button {
        background-color: black;
        color: white;
        padding: 5px;
        border: 0;
        border-radius: 10px;
    }

    .item > input {
        padding: 5px;
        border: 0;
        border-radius: 10px;
        background: #f3f6f4;
        text-align: center;
    }

    .buttons {
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        width: 100%;
        margin-top: 20px;
        padding: 0 35px;
    }
</style>
