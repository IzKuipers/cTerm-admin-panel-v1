<script lang="ts">
  import Content from "./lib/Content.svelte";
  import Login from "./lib/Login.svelte";
  import ResError from "./lib/resError.svelte";
  import { loggedIn } from "./ts/api";
</script>

{#if !$loggedIn}
  <Login />
{:else}
  <Content />
{/if}
<ResError />
