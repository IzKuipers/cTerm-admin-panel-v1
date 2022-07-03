<script lang="ts">
  export let key: string;
  export let value: any;
  export let currentUser: string;
</script>

{#if key != currentUser && value.role != "admin"}
  <option>{key}</option>
{/if}
