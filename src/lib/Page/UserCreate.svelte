<script lang="ts">
  import { APICall, gloToken } from "../../ts/api";
  import Loading from "../Loading.svelte";
  import Admin from "./Admin.svelte";

  let username = "";
  let password = "";
  let giveAdmin = false;
  let creating = false;
  let status = "";

  async function create() {
    creating = true;
    status = "Creating user";
    const req = await APICall(
      "user/create",
      {},
      btoa(`${username}:${password}`),
      true
    );

    if (req.valid && giveAdmin) {
      status = "Granting admin";

      await APICall(
        "admin/grant",
        {
          user: btoa(username),
        },
        $gloToken,
        true
      );
    }

    status = "Finishing";

    setTimeout(() => {
      creating = false;
    }, 500);
  }
</script>

<h2>Create User</h2>
<p>From here you can bypass the registration field and create a user.</p>
<table>
  <tr>
    <td>Username:</td>
    <td><input type="text" bind:value={username} /></td>
  </tr>
  <tr>
    <td>Password:</td>
    <td><input type="password" bind:value={password} /></td>
  </tr>
  <tr>
    <td>
      <input type="checkbox" id="id" bind:checked={giveAdmin} />
      <label for="id">Grant Admin</label>
    </td>
    <td>
      <button disabled={!username || !password || creating} on:click={create}>
        {creating ? "WAIT..." : "Create"}
      </button>
    </td>
    <td>
      {#if creating}
        <Loading capt={status} />
      {/if}
    </td>
  </tr>
</table>
