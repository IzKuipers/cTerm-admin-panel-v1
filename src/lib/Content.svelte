<script lang="ts">
  import { checkParamPage } from "../ts/page";

  import "../css/content.css";
  import Page from "./Content/Page.svelte";
  import Sidebar from "./Content/Sidebar.svelte";
  import Topbar from "./Content/Topbar.svelte";

  checkParamPage();
</script>

<div class="content">
  <Sidebar />
  <Topbar />
  <Page />
</div>
