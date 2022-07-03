<script lang="ts">
  import { onMount } from "svelte";
  import Option from "./UserDelete/Option.svelte";
  import { APICall, gloToken } from "../../ts/api";
  import Loading from "../Loading.svelte";

  let username = "";
  let deleting = false;
  let status = "";
  let users: { [key: string]: object } = {};
  let loading = false;
  let currentUser = "";

  async function create() {
    deleting = true;
    status = "Deleting user";

    const req = await APICall(
      "admin/deluser",
      {
        user: btoa(username),
      },
      $gloToken,
      true
    );

    status = "Finishing";

    setTimeout(() => {
      deleting = false;
    }, 500);

    update();
  }

  onMount(update);

  async function update() {
    loading = true;
    currentUser = atob($gloToken).split(":")[0];
    const req = await APICall("user/getlist", {}, $gloToken, true);

    if (req.valid) {
      users = req.data;
    }

    loading = false;
  }
</script>

<h2>Delete User</h2>
<p>
  From here you can forcefully delete a user. <b>All userdata will be lost!</b>
</p>
{#if loading}
  <Loading />
{:else}
  <table>
    <tr>
      <td>Username:</td>
      <td>
        <select bind:value={username} disabled={deleting}>
          {#each Object.entries(users) as [aKey, _]}
            <Option key={aKey} value={_} {currentUser} />
          {/each}
        </select>
      </td>
    </tr>
    <tr>
      <td />
      <td>
        <button disabled={!username || deleting} on:click={create}>
          {deleting ? "WAIT..." : "Delete"}
        </button>
      </td>
      <td>
        {#if deleting}
          <Loading capt={status} />
        {/if}
      </td>
    </tr>
  </table>
{/if}
