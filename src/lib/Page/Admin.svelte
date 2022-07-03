<script lang="ts">
  import { switchPage } from "../../ts/page";

  function showAdmins() {
    switchPage("adminGetList");
  }

  function manageAccess() {
    switchPage("adminAccess");
  }
</script>

<h2>Admin Role Management</h2>
<p>Select any of the following options to continue:<br /><br /></p>
<button class="selectoption" on:click={showAdmins}>Show admins</button>
<button class="selectoption" on:click={manageAccess}
  >Grant or revoke admin access</button
>
