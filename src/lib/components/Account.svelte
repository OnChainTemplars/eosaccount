<script lang="ts">
    import { Icon } from "svelte-icons-pack";
    import { SiTelegram, SiTwitter } from "svelte-icons-pack/si";
    import { TrOutlineWorldHeart } from "svelte-icons-pack/tr";

    let { data } = $props();
</script>

<div class="account">
    <h3>
        {data.title}
    </h3>
    <div class="avatar">
        <img alt="Avatar" src={data.avatar} />
    </div>
    <div>
        <p>{data.desc}</p>
    </div>
    {#if data.url}
        <div class="url">
            {#if data.url.website}
                <a href={data.url.website} target="_blank">
                    <Icon src={TrOutlineWorldHeart} size="32" color="black" />
                </a>
            {/if}
            {#if data.url.telegram}
                <a href={data.url.telegram} target="_blank">
                    <Icon src={SiTelegram} size="32" color="black" />
                </a>
            {/if}
            {#if data.url.twitter}
                <a href={data.url.twitter} target="_blank">
                    <Icon src={SiTwitter} size="32" color="black" />
                </a>
            {/if}
        </div>
    {/if}
</div>

<style>
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
