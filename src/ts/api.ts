import { writable } from "svelte/store";

export const server = "twihub.tk:3333";

export const loggedIn = writable<boolean>(false);
export const gloToken = writable<string>(null);

export async function APICall(
  path: string,
  params: { [key: string]: string },
  authToken?: string,
  json: boolean = true
) {
  const init: RequestInit = {
    headers: {
      Authorization: `Basic ${authToken}`,
    },
  };

  let paramStr = "?";

  for (const key in params) {
    paramStr += `${key}=${params[key]}&`;
  }

  const req = await fetch(
    `http://${server}/${path}${paramStr}`,
    authToken ? init : {}
  );

  const jsonData = await req.json();

  if (req.status != 200) {
    ResErrorData.set([
      true,
      {
        title: jsonData.error.title,
        message: jsonData.error.message,
        code: req.status,
      },
      `${server}/${path}`,
    ]);
  }

  if (json) return jsonData;
  return JSON.stringify(jsonData);
}

export type ResErrorDataType = [
  boolean,
  {
    title: string;
    message: string;
    code: number;
  },
  string
];

export const ResErrorData = writable<ResErrorDataType>([false, null, null]);
