<script lang="ts">
  export let key: string;
  export let value: any;
  export let currentUser: string;
</script>

{#if value.role != "banned" && currentUser != key}
  <option>{key}</option>
{/if}
