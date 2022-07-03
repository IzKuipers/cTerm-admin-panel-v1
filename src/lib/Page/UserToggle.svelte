<script lang="ts">
  import Loading from "../Loading.svelte";
  import { APICall, gloToken } from "../../ts/api";

  import { onMount } from "svelte";
  import { writable } from "svelte/store";
  import Tr from "./UserToggle/Tr.svelte";

  let users: { [key: string]: object } = {};
  let loading = false;

  const trNames = writable<string[]>(["Username"]);
  const refreshAll = writable<boolean>(false);

  refreshAll.subscribe((v) => {
    if (v) {
      refreshAll.set(false);

      update();
    }
  });

  onMount(update);

  async function update() {
    loading = true;
    users = {};

    const req = await APICall("user/getlist", {}, $gloToken, true);

    if (req.valid) {
      users = req.data;
    }

    loading = false;
  }

  function addToTr(name: string) {
    if (!$trNames.includes(name)) {
      const current = $trNames;

      current.push(name);

      $trNames = current;
    }

    return "";
  }
</script>

<h2>Enable or disable users</h2>
<p>
  Here is a list of cTerm users where you can choose to disable or enable a
  user.
</p>
<table>
  <tr>
    {#each $trNames as name}
      <td><b>{name}</b></td>
    {/each}
    <td><b>Toggle</b></td>
  </tr>
  {#each Object.entries(users) as [key, value]}
    <Tr {key} {value} bind:refreshAll={$refreshAll}>
      {#each Object.entries(value) as [_, pValue]}
        {#if _ == "role"}
          {addToTr(_)}
          <td>{pValue}</td>
        {/if}
      {/each}
    </Tr>
  {/each}
</table>
{#if !Object.entries(users).length}
  <p>
    {#if loading}
      <Loading />
    {:else}
      No users.
    {/if}
  </p>
{/if}
