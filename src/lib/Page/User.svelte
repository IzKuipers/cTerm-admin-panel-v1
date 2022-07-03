<script lang="ts">
  import { switchPage } from "../../ts/page";

  function showUsers() {
    switchPage("userGetList");
  }
  function toggleUsers() {
    switchPage("userToggle");
  }
  function userBans() {
    switchPage("userBans");
  }
  function userCreate() {
    switchPage("userCreate");
  }
  function userDelete() {
    switchPage("userDelete");
  }
  function userPref() {
    switchPage("userPreferences");
  }
  function changePassword() {
    switchPage("userResetPswd");
  }
</script>

<h2>User Management</h2>
<p>Select any of the following options to continue:<br /><br /></p>
<button class="selectoption" on:click={showUsers}>Show all users</button>
<button class="selectoption" on:click={userPref}>Manage User Preferences</button
>
<button class="selectoption" on:click={toggleUsers}
  >Enable or disable users</button
>
<button class="selectoption" on:click={userBans}>Ban or unban users</button><br
/>
<button class="selectoption" on:click={userCreate}>Create users</button>
<button class="selectoption" on:click={userDelete}>Delete users</button>
<br
/><button class="selectoption" on:click={changePassword}>Change user passwords</button>