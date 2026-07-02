<script lang="ts">
  // layout 
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';
  import unwantedFavicon from "$lib/assets/unwantedfavicon.svg";

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={unwantedFavicon} />
</svelte:head>

<ModeWatcher />

<div
  class="
  bg-(--customWhite) dark:bg-(--darkGray) rubikal
  flex flex-col items-center justify-center antialiased
  "
>
  {@render children?.()}
</div>
