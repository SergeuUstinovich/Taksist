import { DEV_MODE } from "../config";

export function blockDevtools(platform: string) {
  const devtools = DEV_MODE;
  if (!devtools) {
    document.addEventListener("contextmenu", (event) => event.preventDefault());
    document.addEventListener("keydown", (event) => {
      const key = event.keyCode;
      if (key === 123) {
        event.preventDefault();
      } else if (
        (event.ctrlKey && event.shiftKey && key === 73) ||
        (event.ctrlKey && event.shiftKey && key === 74)
      ) {
        event.preventDefault();
      }
    });

    if (!["android", "ios"].includes(platform)) {
      return true;
    }
  } else {
    return false;
  }
}
