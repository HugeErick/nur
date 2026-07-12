<script lang="ts">
  // layout 
	import '$lib/../app.css';
  import { Button } from "$lib/components/ui/button/index.js";
  import { goto } from '$app/navigation';

	let { children } = $props();
</script>

<div class="w-full h-full">
  {@render children?.()}
  <Button
    variant="secondary"
    class="absolute top-1 left-1 mt-1 ml-0.5 font-semibold text-lg rounded-md w-14 h-12"
    onclick={() => goto("/home")}
  >
    Nur
  </Button>
</div>
