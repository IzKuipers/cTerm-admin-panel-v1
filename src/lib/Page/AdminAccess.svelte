<script lang="ts">
  import { APICall, gloToken } from "../../ts/api";

  import { onMount } from "svelte";

  let reguls: { [key: string]: object } = {};
  let admins: { [key: string]: object } = {};

  let revokeInput: string;
  let grantInput: string;

  let loading = false;

  onMount(update);

  async function update() {
    loading = true;

    const regulsReq = await APICall("user/getlist", {}, $gloToken);
    const adminsReq = await APICall("admin/getlist", {}, $gloToken);

    if (!regulsReq.valid || !adminsReq.valid) {
      loading = false;

      return;
    }

    reguls = regulsReq.data;
    admins = adminsReq.data;

    loading = false;
  }

  async function revoke() {
    await APICall(
      "admin/revoke",
      {
        user: btoa(revokeInput),
      },
      $gloToken,
      true
    );

    update();
  }

  async function grant() {
    await APICall(
      "admin/grant",
      {
        user: btoa(grantInput),
      },
      $gloToken,
      true
    );

    update();
  }
</script>

<h2>Admin Access</h2>
<p>
  Here you can grant or revoke users admin access.<br /><b>Warning</b>: Granting
  admin to the wrong user can lead to a catastrophe
</p>
<br />
{#if loading}
  <p>Loading...</p>
{:else}
  <h3>Grant Admin</h3>
  <p>You can grant admin to one of many regular users.</p>
  <select bind:value={grantInput}>
    {#each Object.entries(reguls) as [aKey, _]}
      {#if !admins[aKey]}<option>{aKey}</option>{/if}
    {/each}
  </select>
  <button on:click={grant} disabled={!revokeInput}>Grant</button><br /><br />
  <h3>Revoke Admin</h3>
  <p>You can revoke admin to one of many admin users.</p>
  <select bind:value={revokeInput}>
    {#each Object.entries(admins) as [aKey, _]}
      <option>{aKey}</option>
    {/each}
  </select>
  <button on:click={revoke} disabled={!revokeInput}>Revoke</button>
{/if}
