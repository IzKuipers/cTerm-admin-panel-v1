<script lang="ts">
  import { onMount } from "svelte";
  import { SvelteComponentDev } from "svelte/internal";
  import { writable } from "svelte/store";

  import { APICall, gloToken } from "../../ts/api";
  import Loading from "../Loading.svelte";
  import Tr from "./UserPreferences/Tr.svelte";

  let loading = false;
  let users: { [key: string]: object } = {};
  let userdata: { [key: string]: any } = {};
  let input: string = "";
  let getterUsername = "";
  const bannedSetters = ["role", "disabled", "banned"];
  const updateAll = writable<boolean>(false);

  updateAll.subscribe((v) => {
    if (v) {
      updateAll.set(false);

      get();
    }
  });

  let newKey: string;
  let newValue: string;

  async function update() {
    loading = true;
    const req = await APICall("user/getlist", {}, $gloToken, true);

    if (req.valid) {
      users = req.data;
    }

    loading = false;
  }

  onMount(update);

  async function get() {
    loading = true;
    getterUsername = input;

    const req = await APICall(
      "admin/pref/get",
      { user: btoa(getterUsername) },
      $gloToken,
      true
    );

    if (req.valid) userdata = req.data;
    loading = false;

    newKey = "";
    newValue = "";
  }

  function clear() {
    loading = false;
    getterUsername = "";
    userdata = {};
    update();
  }

  async function addNew() {
    const req = await APICall(
      "admin/pref/set",
      {
        user: btoa(getterUsername),
        item: btoa(newKey),
        value: btoa(newValue),
      },
      $gloToken,
      true
    );

    if (req.valid) get();
  }

  function clearNew() {
    newValue = "";
    newKey = "";
  }
</script>

<h2>User Preferences</h2>
<p>From here you can manage the user preferences for any user.</p>
<select bind:value={input} disabled={!!getterUsername}>
  {#each Object.entries(users) as [aKey, _]}
    <option>{aKey}</option>
  {/each}
</select>
<button on:click={get} disabled={!!getterUsername || !input}>Get</button>
<button on:click={clear} disabled={!getterUsername}>Clear</button>
<br /><br />
{#if loading}
  <Loading />
{:else if getterUsername}
  <p>Userdata for: {getterUsername}</p>
  <table>
    <tr>
      <td>Key</td>
      <td>Value</td>
    </tr>
    {#each Object.entries(userdata) as [aKey, aValue]}
      <Tr
        {aKey}
        {aValue}
        {bannedSetters}
        {getterUsername}
        bind:updateAll={$updateAll}
      />
    {/each}
    <tr>
      <td>
        <input bind:value={newKey} />
      </td>
      <td>
        <input bind:value={newValue} />
      </td>
      <td>
        <button class="full" disabled={!newKey || !newValue} on:click={addNew}
          >Add</button
        >
      </td>
      <td>
        <button class="full" disabled={!newKey || !newValue} on:click={clearNew}
          >clear</button
        >
      </td>
    </tr>
  </table>
{:else}
  <p>No user selected.</p>
{/if}
