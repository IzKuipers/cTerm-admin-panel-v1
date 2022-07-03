<script lang="ts">
        import "../../css/page.css";
  import { CurrentPage } from "../../ts/page";
</script>

<div class="page">
  {#if $CurrentPage}
    <svelte:component this={$CurrentPage.content} />
  {/if}
</div>
