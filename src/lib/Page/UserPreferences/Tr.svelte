<script lang="ts">
import { APICall, gloToken } from "../../../ts/api";

  import { onMount } from "svelte";

  export let aKey: string;
  export let aValue: any;
  export let bannedSetters: string[];
  export let getterUsername:string;

  export let updateAll = false;

  let value: string;

  onMount(() => {
    value = aValue;
  });

  async function update() {
    const req = await APICall("admin/pref/set",{
        user:btoa(getterUsername),
        item:btoa(aKey),
        value:btoa(value)
    },$gloToken,true);

    updateAll = true;
  }

  async function remove() {
    const req = await APICall("admin/pref/delete",{
        user:btoa(getterUsername),
        item:btoa(aKey)
    },$gloToken,true);

    updateAll = true;
  }
</script>

<tr>
  <td>{aKey}</td>
  <td>
    <input disabled={bannedSetters.includes(aKey)} bind:value />
  </td>
  <td>
    <button class="full" disabled={bannedSetters.includes(aKey)} on:click={update}>Update</button>
  </td>
  <td>
    <button class="full" disabled={bannedSetters.includes(aKey)} on:click={remove}>Remove</button>
  </td>
</tr>
