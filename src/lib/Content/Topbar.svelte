<script lang="ts">
  import { onMount } from "svelte";
  import { gloToken, loggedIn } from "../../ts/api";
  import {CurrentPage, CurrentPageId} from "../../ts/page";
import Loading from "../Loading.svelte";

  let username = "";

  onMount(() => {
    username = atob($gloToken).split(":")[0];
  });

  function logout() {
    gloToken.set(null);
    loggedIn.set(false);
  }
</script>

<div class="topbar">
  <p><b>cTerm</b> | Administrator Panel | Page: {$CurrentPageId}</p>
  <div class="right">
    {username || "User"} | <button on:click={logout}>Logout</button>
  </div>
</div>
