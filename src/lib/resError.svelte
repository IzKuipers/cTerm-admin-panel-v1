<script lang="ts">
  import "../css/reserror.css";
  import "../css/general.css";
  import { ResErrorData, ResErrorDataType } from "../ts/api";

  function dismiss() {
    ResErrorData.set([false, null, null]);
  }
</script>

{#if $ResErrorData[0]}
  <div class="errblind" on:click={dismiss} />
  <div class="centerAbsolute reserror" class:show={$ResErrorData[0]}>
    <h1 class="title">{$ResErrorData[1].title}</h1>
    <p class="message">{$ResErrorData[1].message}</p>
    <p class="code">
      Code: {$ResErrorData[1].code} | Path: {$ResErrorData[2]}
    </p>
    <i class="dismiss">(Click outside this window to dismiss)</i>
  </div>
{/if}
