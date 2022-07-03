<script lang="ts">
  import { Page, switchPage } from "../../../ts/page";
  import { CurrentPageId } from "../../../ts/page";

  export let data: Page;
  export let name: string;

  function go() {
    switchPage(name);
  }
</script>

<button class:selected={$CurrentPageId == name} class="page" on:click={go}>
  {data.caption}
</button>
