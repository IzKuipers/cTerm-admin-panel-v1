<script lang="ts">
  import "../css/login.css";
  import "../css/general.css";
  import { APICall, gloToken, loggedIn } from "../ts/api";

  const ascii = `    _______                  
   |__   __|                 
   ___| | ___ _ __ _ __ ___  
  / __| |/ _ \\ '__| '_ \` _ \\ 
 | (__| |  __/ |  | | | | | |
  \\___|_|\\___|_|  |_| |_| |_|
  `;

  let username = "";
  let password = "";

  let loginButton: HTMLButtonElement;

  async function login() {
    loginButton.innerText = "WAIT...";

    const token = btoa(`${username}:${password}`);
    const req = await APICall("login", {}, token, true);

    if (req.valid) {
      loggedIn.set(req.valid);
      gloToken.set(req.valid ? token : null);
    }

    loginButton.innerText = req.valid ? "Login" : "Retry";
  }
</script>

<div class="app">
  <div class="frame centerAbsolute">
    <pre class="center">{ascii}</pre>
    <input placeholder="Username" type="text" bind:value={username} />
    <input placeholder="Password" type="password" bind:value={password} />
    <button on:click={login} bind:this={loginButton}>Login</button>
  </div>
</div>

<style scoped>
</style>
