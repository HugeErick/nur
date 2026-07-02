<script lang="ts">
  // login page
  import * as z from "zod";
  import { Button } from "$lib/components/ui/button/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import * as Card from "$lib/components/ui/card/index.js";
  import { LoaderCircle } from "@lucide/svelte";
  import { enhance } from "$app/forms";
  import type  { ActionData } from "./$types";

  let { form }: { form: ActionData } = $props();
  let isLoading = $state(false);

  type LoginFields = z.infer<typeof loginSchema>;
  let errors: Partial<Record<keyof LoginFields, string[]>> = $state({});

  const loginSchema = z.object({
    username: z.string().min(1, "Username is required"),
    password: z.string().min(1, "Password is requiered"),
  }).strict() // dont allow extra fields from request  

  function clientValidate(data: FormData): boolean {
    errors = {};
    const result = loginSchema.safeParse({
      username: data.get("username"),
      password: data.get("password"),
    });
    if (!result.success) {
      errors = result.error.issues.reduce((acc, issue) => {
        const key = issue.path[0] as keyof LoginFields;
        if (key) acc[key] = [...(acc[key] ?? []), issue.message];
        return acc;
      }, {} as Partial<Record<keyof LoginFields, string[]>>);
      return false;
    }
    return true;
  }

</script>

<section class="w-screen h-screen">
  <Card.Root class="absolute p-8 w-4xl max-w-sm top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
    <Card.Header>
      <Card.Title class="text-3xl text-(--customGold)">Login</Card.Title>    
    </Card.Header>

    <form
      method="POST"
      use:enhance={({ formData, cancel }) => {
        if (!clientValidate(formData)) { cancel(); return; }
        isLoading = true;
        return async ({ update }) => {
          await update();
          isLoading = false;
        };
      }}
    >
      <Card.Content>
        <div class="flex flex-col gap-6">
          <div class="grid gap-2">
            <Label for="nur-username">Username</Label>
            <!-- TODO: make a funny list of -->
            <!-- famous people as usernames as placeholders  --> 
            <Input id="nur-username" name="username" placeholder="Magnus Carlsen" required />
            {#if errors.username}
              <p class="text-xs text-red-500">{errors.username[0]}</p>
            {/if}
          </div>

          <div class="grid gap-2">
            <div class="flex items-center">
              <Label for="nur-password">Password</Label>
              <Card.Description class="ms-auto inline-block text-sm underline-offset-4 hover:underline">
                <a
                  href="/forgotPassword"
                >
                  Forgot your password?
                </a>
              </Card.Description>
            </div>
            <Input id="nur-password" name="password" type="password" required />
            {#if errors.password}
              <p class="text-xs text-red-500">{errors.password[0]}</p>
            {/if}
            <Card.Description class="hover:underline">
              <a
                href="/signUp"
              >
                Don't have an Account?
              </a>
            </Card.Description>
          </div>
        </div>
      </Card.Content>
      <Card.Footer class="flex flex-col mt-2 w-full">
        <Card.Action class="w-full">
          <Button type="submit" class="w-full" disabled={isLoading}>
            {#if isLoading}
              <LoaderCircle class="mr-2 h-4 w-4 animate-spin" />
              Please wait
            {:else}
              Login
            {/if}
          </Button>
        </Card.Action>
        {#if form?.message}
          <p
            class="text-sm text-red-500"
          >
            {form.message}
          </p>
        {/if}
      </Card.Footer>
    </form>
  </Card.Root>
</section>
