<script lang="ts">
  import { APICall, gloToken } from "../../ts/api";
  import { onMount } from "svelte";
  import Option from "./UserBans/Option.svelte";
  import UnbanOption from "./UserBans/UnbanOption.svelte";
import Loading from "../Loading.svelte";

  let loading = false;
  let banInput = "";
  let unbanInput = "";
  let confirmBanInput = "";
  let users: { [key: string]: object } = {};
  let currentUser = "";

  onMount(() => {
    currentUser = atob($gloToken).split(":")[0];

    update();
  });

  async function update() {
    loading = true;
    users = {};

    const req = await APICall("user/getlist", {}, $gloToken, true);

    if (req.valid) {
      users = req.data;
    }

    loading = false;
  }

  async function ban() {
    const req = await APICall(
      `admin/user/ban`,
      {
        user: btoa(banInput),
      },
      $gloToken,
      true
    );

    update();
  }

  async function unban() {
    const req = await APICall(
      `admin/user/unban`,
      {
        user: btoa(unbanInput),
      },
      $gloToken,
      true
    );

    update();
  }
</script>

<h2>Ban / Unban</h2>
<p>
  Users that are banned cannot log in. They will have a<br />
  prefix added to their name and their role will become<br />
  "banned". You cannot unban a user by trying to enable<br />
  it through the UserToggle page.
</p>
{#if loading}
  <Loading/>
{:else}
  <br />
  <h3>Ban User</h3>
  <p>
    Enter the information to ban a user. Both fields must be<br />
    the same to allow for banning. It can take a second or two to ban.
  </p>
  <p>Username:</p>
  <select bind:value={banInput} placeholder="User">
    <option disabled>(select a user)</option>
    {#each Object.entries(users) as [aKey, _]}
      <Option key={aKey} value={_} {currentUser} />
    {/each}
  </select>
  <p>Confirm Username:</p>
  <input placeholder="" bind:value={confirmBanInput} />
  <button
    disabled={banInput != confirmBanInput || !confirmBanInput || !banInput}
    on:click={ban}>Ban!</button
  ><br /><br /><br />
  <h3>Unban User</h3>
  <p>
    Select a user to unban. This user will be granted access to the API.<br />
    <b>Note</b>: If the user was admin before the ban, the user will NOT<br />
    be admin after the unban.
  </p>
  <select bind:value={unbanInput} placeholder="User">
    <option disabled>(select a user)</option>
    {#each Object.entries(users) as [aKey, _]}
      <UnbanOption key={aKey} value={_} />
    {/each}
  </select>
  <button disabled={!unbanInput} on:click={unban}>Unban</button>
{/if}
