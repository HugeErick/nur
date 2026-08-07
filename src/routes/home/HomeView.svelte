<script lang="ts">
  // Homeview.svelte
  import { Button } from "$lib/components/ui/button/index.js";

</script>

<div class="border-2 border-red-500 w-full flex flex-col justify-center align-middle">
  <div>
    <div class="my-20">
      <div class="flex gap-4 align-middle justify-center">
        <form method="POST" action="/home?/logout">
          <Button type="submit" variant="outline">
            <span>
              Log out
            </span>
          </Button>
        </form>

      </div>
      <h1>
        Home Nur 
      </h1>
    </div>
  </div>
</div>
