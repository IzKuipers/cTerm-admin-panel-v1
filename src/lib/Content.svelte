<script lang="ts">
  import { checkParamPage, displayPage } from "../ts/page";

  import "../css/content.css";
  import Page from "./Content/Page.svelte";
  import Sidebar from "./Content/Sidebar.svelte";
  import Topbar from "./Content/Topbar.svelte";
  import { gloToken, loggedIn } from "../ts/api";

  checkParamPage();

  function logout() {
    gloToken.set(null);
    loggedIn.set(false);
    displayPage.set(true);
  }
</script>

<div class="content">
  {#if $displayPage}
    <Sidebar />
    <Topbar />
    <Page />
  {:else}
    <div class="noadminpanel">
      <h2>Access denied</h2>
      <p>
        You need to have administrative privileges to be able to access this
        page.<br />
        Please request administrative privileges at one of the cTerm administrators
        and try again.
      </p>
      <button class="selectoption" on:click={logout}>Logout</button>
    </div>
  {/if}
</div>
