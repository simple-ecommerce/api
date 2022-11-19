import { login } from "./login";
import { refresh } from "./refresh";
import { revoke } from "./revoke";

export namespace Token {
  export const Login = login;
  export const Refresh = refresh;
  export const Revoke = revoke;
}
