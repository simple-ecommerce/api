import { Id } from "../../aliases";
import { UserType } from "../enums/UserType";

export interface AccessTokenPayload {
  companyId: Id;
  userId: Id;
  refreshTokenId: Id;
  userType: UserType;
}
