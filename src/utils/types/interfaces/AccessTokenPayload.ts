import { Id } from "../../aliases";
import { UserType } from "../enums/UserType";

export interface AccessTokenPayload {
  userId: Id;
  refreshTokenId: Id;
  userType: UserType;
}
