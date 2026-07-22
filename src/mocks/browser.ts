import { setupWorker } from "msw/browser";
import { handlers } from "./handlers";

export const worker = setupWorker(...handlers);
// // If the request isn't one of my mocked APIs, let the browser handle it normally.
// worker.start({
//   onUnhandledRequest: "bypass",
// });  