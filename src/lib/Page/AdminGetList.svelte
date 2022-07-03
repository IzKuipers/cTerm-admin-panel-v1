<script lang="ts">
  import { APICall, gloToken } from "../../ts/api";

  import { onMount } from "svelte";
  import { listen } from "svelte/internal";
  import { switchPage } from "../../ts/page";
  import { writable } from "svelte/store";

  let admins: { [key: string]: object } = {};
  let loading = false;

  const trNames = writable<string[]>(["Username"]);

  onMount(update);

  async function update() {
    loading = true;
    const req = await APICall("admin/getlist", {}, $gloToken, true);

    if (req.valid) {
      admins = req.data;
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

  async function revoke(user: string) {
    const req = await APICall(
      "admin/revoke",
      {
        user: btoa(user),
      },
      $gloToken,
      true
    );

    update();
  }
</script>

<h2>Get List</h2>
<p>Here is a list of permitted admins on cTerm:</p>
<table>
  <tr>
    {#each $trNames as name}
      <td><b>{name}</b></td>
    {/each}
  </tr>
  {#each Object.entries(admins) as [key, value]}
    <tr>
      <td>{key}</td>
      {#each Object.entries(value) as [_, pValue]}
        {addToTr(_)}
        <td>{pValue}</td>
      {/each}
      <td>
        <button on:click={() => revoke(key)}>Revoke</button>
      </td>
    </tr>
  {/each}
</table>
{#if !Object.entries(admins).length}
  <p>{loading ? "Loading..." : "No users."}</p>
{/if}
