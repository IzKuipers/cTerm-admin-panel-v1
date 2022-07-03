<script lang="ts">
    export let key: string;
    export let value: any;
  </script>
  
  {#if value.role == "banned"}
    <option>{key}</option>
  {/if}
  