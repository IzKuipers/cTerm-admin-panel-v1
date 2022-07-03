<script lang="ts">
  import { APICall, gloToken } from "../../../ts/api";

  import { onMount } from "svelte";

  export let key: string;
  export let value: any;

  let buttText = "";
  let disabled = false;

  export let refreshAll: boolean = false;

  onMount(() => {
    const username = atob($gloToken).split(":")[0];

    console.log(value);

    console.log(username, key);

    disabled = username == key || value.role == "banned";

    buttText =
      value.role != "banned"
        ? key == username
          ? "Enabled"
          : value.role == "regular" || value.role == "admin"
          ? "Disable"
          : "Enable"
        : "BANNED!";
  });

  async function toggle() {
    const req = await APICall(
      `admin/user/${value.role == "regular" || value.role == "admin" ? "dis" : "en"}able`,
      {
        user: btoa(key),
      },
      $gloToken,
      true
    );

    refresh();
  }

  function refresh() {
    refreshAll = true;
  }
</script>

<tr>
  <td>{key}</td>
  <slot />
  <td>
    <button on:click={toggle} class="full" {disabled}>
      {buttText}
    </button>
  </td>
</tr>
