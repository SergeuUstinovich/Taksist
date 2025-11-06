import { BrowserNavigator } from "@telegram-apps/sdk-react";
// import { DEV_MODE } from "./config";

export const navigator = new BrowserNavigator(
  [
    {
      // pathname: !DEV_MODE ? window.location.pathname : '/loader',
      pathname: '/loader',
      search: window.location.search
    },
  ],
  0
);
