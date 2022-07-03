<script lang="ts">
  import "../../css/sidebar.css";
  import { Pages } from "../../ts/page";
  import Page from "./Sidebar/Page.svelte";
</script>

<div class="sidebar">
  {#each [...Pages] as [key, value]}
    <Page data={value} name={key} />
  {/each}
</div>
