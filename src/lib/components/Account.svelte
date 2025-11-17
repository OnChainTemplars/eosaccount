<script lang="ts">
    let { data } = $props();
</script>

<div class="account">
    <div>
        <h3>
            {data.title}
        </h3>
        <div class="avatar">
            <img alt="Avatar" src={data.avatar} />
        </div>
        <div>
            <p>{data.desc}</p>
        </div>
    </div>
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
