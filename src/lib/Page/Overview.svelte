<script lang="ts">
  import { switchPage } from "../../ts/page";

  function manAdmins() {
    switchPage("admin");
  }

  function manUsers() {
    switchPage("user");
  }
</script>

<h2>cTerm Administration</h2>
<p>
  From here you can manage all users, including performing tasks<br />
  unpermitted by regular users. Use this page with great responsibility.
</p>
<button class="selectoption" on:click={manAdmins}>Manage Administrators</button>
<button class="selectoption" on:click={manUsers}>Manage Users</button>
