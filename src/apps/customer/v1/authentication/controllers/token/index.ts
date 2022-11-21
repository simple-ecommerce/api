import { login } from "./login/login";
import { refresh } from "./refresh/refresh";
import { revoke } from "./revoke/revoke";

export namespace Token {
  export const Login = login;
  export const Refresh = refresh;
  export const Revoke = revoke;
}
