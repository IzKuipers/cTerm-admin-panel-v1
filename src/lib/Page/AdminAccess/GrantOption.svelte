<script lang="ts">
    export let user:string;
    export let data:any;
    export let admins: {[key:string]:any}
</script>

{#if !admins[user] && data.role != "banned"}<option>{user}</option>{/if}