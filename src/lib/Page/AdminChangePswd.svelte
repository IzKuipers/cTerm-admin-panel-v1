<script lang="ts">
  import { onMount } from "svelte";
  import { APICall, gloToken } from "../../ts/api";
  import Loading from "../Loading.svelte";

  let loading = false;
  let users: { [key: string]: object } = {};
  let username: string = "";
  let password: string = "";

  async function update() {
    loading = true;
    const req = await APICall("user/getlist", {}, $gloToken, true);

    if (req.valid) {
      users = req.data;
    }

    loading = false;
  }

  async function change() {
    const req = await APICall(
      "admin/changepswd",
      {
        user: btoa(username),
        new: btoa(password),
      },
      $gloToken,
      true
    );

    update();
  }

  onMount(update);
</script>

<h2>Change User Password</h2>
<p>Here you can change the password for any user.</p>

{#if loading}
  <Loading />
{:else}
  <table class="nopad">
    <tr>
      <td>Username</td>
      <td>
        <select bind:value={username} class="full">
          {#each Object.entries(users) as [aKey, _]}
            <option>{aKey}</option>
          {/each}
        </select>
      </td>
    </tr>
    <tr>
      <td>Password</td>
      <input
        type="password"
        class="full"
        disabled={!username}
        bind:value={password}
      />
    </tr>
    <tr>
      <td />
      <td
        ><button disabled={!username || !password} on:click={change}
          >Change</button
        ></td
      >
    </tr>
  </table>
{/if}
