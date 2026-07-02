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
    class="absolute top-1 left-1 font-semibold text-lg rounded-md w-16 h-14"
    onclick={() => goto("/home")}
  >
    Nur
  </Button>
</div>
