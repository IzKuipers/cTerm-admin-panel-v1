import Overview from "../lib/Page/Overview.svelte";
import Admin from "../lib/Page/Admin.svelte";
import AdminGetList from "../lib/Page/AdminGetList.svelte";
import AdminAccess from "../lib/Page/AdminAccess.svelte";
import User from "../lib/Page/User.svelte";
import UserGetList from "../lib/Page/UserGetList.svelte";
import UserPreferences from "../lib/Page/UserPreferences.svelte";
import UserToggleSvelte from "../lib/Page/UserToggle.svelte";
import UserBansSvelte from "../lib/Page/UserBans.svelte";
import UserCreate from "../lib/Page/UserCreate.svelte";
import UserDelete from "../lib/Page/UserDelete.svelte";
import AdminChangePswd from "../lib/Page/AdminChangePswd.svelte";

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
    const req = await APICall("user/isadmin", {}, get(gloToken), true);

    if (req.valid && !req.data.admin) {
      ResErrorData.set([
        true,
        {
          title: "Hold up!",
          message:
            "You aren't an admin, so this page won't mean anything useful to you... All admin checks are backend operated, you will not be able to do anything here.",
          code: 0o0,
        },
        "(admincheck)",
      ]);
      displayPage.set(false);
    }
  }
}

export function checkParamPage() {
  const page = params.get("p");

  if (page) switchPage(page);
  else switchPage(defaultPage);
}

export const displayPage = writable<boolean>(true);

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
      content: User,
    },
  ],
  [
    "userGetList",
    {
      caption: "Man. Users > Get List",
      content: UserGetList,
    },
  ],
  [
    "userPreferences",
    {
      caption: "Man. Users > Preferences",
      content: UserPreferences,
    },
  ],
  [
    "userToggle",
    {
      caption: "Man. Users > En- Disable",
      content: UserToggleSvelte,
    },
  ],
  [
    "userBans",
    {
      caption: "Man. Users > Ban / Unban",
      content: UserBansSvelte,
    },
  ],
  [
    "userCreate",
    {
      caption: "Man. Users > Create User",
      content: UserCreate,
    },
  ],
  [
    "userDelete",
    {
      caption: "Man. Users > Delete User",
      content: UserDelete,
    },
  ],
  [
    "userResetPswd",
    {
      caption: "Man. Users > Password",
      content: AdminChangePswd,
    },
  ],
]);
