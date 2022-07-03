import Overview from "../lib/Page/Overview.svelte";
import Admin from "../lib/Page/Admin.svelte";
import AdminGetList from "../lib/Page/AdminGetList.svelte";
import AdminAccess from "../lib/Page/AdminAccess.svelte";

import { navigate } from "svelte-navigator";
import { get, writable } from "svelte/store";
import { APICall, gloToken, ResErrorData } from "./api";


export const params = new URLSearchParams(location.search);

export interface Page {
  caption: string;
  content: any;
}

export const defaultPage = "Overview";

export async function switchPage(pageId: string) {
  if (Pages.has(pageId)) {
    CurrentPage.set(Pages.get(pageId));
    CurrentPageId.set(pageId);

    params.set("p", pageId);

    navigate(`./?p=${pageId}`);
  } else {
    switchPage(defaultPage);
  }

  if (get(gloToken)) {
    const req = await APICall("user/isadmin",{},get(gloToken),true);

    if (req.valid && !req.data.admin) {
        ResErrorData.set([true,{
            title:"Hold up!",
            message:"You aren't an admin, so this page won't mean anything useful to you... All admin checks are backend operated, you will not be able to do anything here.",
            code:0o0
        },"(admincheck)"])
    }
  }
}

export function checkParamPage() {
  const page = params.get("p");

  if (page) switchPage(page);
  else switchPage(defaultPage);
}

export const CurrentPage = writable<Page>();
export const CurrentPageId = writable<string>();
export const Pages = new Map<string, Page>([
  [
    defaultPage,
    {
      caption: "Overview",
      content: Overview,
    },
  ],
  [
    "admin",
    {
      caption: "Manage Admins",
      content: Admin,
    },
  ],
  [
    "adminGetList",
    {
      caption: "Manage Admins > Get List",
      content: AdminGetList,
    },
  ],
  [
    "adminAccess",
    {
      caption: "Manage Admins > Access",
      content: AdminAccess,
    },
  ],
  [
    "user",
    {
      caption: "Manage Users",
      content: Overview,
    },
  ],
  [
    "userGetList",
    {
      caption: "Man. Users > Get List",
      content: Overview,
    },
  ],
  [
    "userToggle",
    {
      caption: "Man. Users > En- Disable",
      content: Overview,
    },
  ],
  [
    "userBans",
    {
      caption: "Man. Users > Ban / Unban",
      content: Overview,
    },
  ],
  [
    "userCreate",
    {
      caption: "Man. Users > Create User",
      content: Overview,
    },
  ],
  [
    "userDelete",
    {
      caption: "Man. Users > Delete User",
      content: Overview,
    },
  ],
]);
