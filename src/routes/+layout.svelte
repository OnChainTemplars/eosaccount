<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<title>EOS Account | Decentralized Identity</title>
	<link rel="icon" href={favicon} />
	<style>
		html {
			background-color: ghostwhite;
			font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, Fira, Sans, "Droid Sans", "Helvetica Neue", sans-serif;
		}
	</style>
</svelte:head>

{@render children()}
