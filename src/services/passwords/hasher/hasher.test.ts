import { before } from "lodash";
import { PasswordHasher } from "./hasher";

describe("services#passwords#hasher", () => {
  describe("hash", () => {
    it("should hash a password", async () => {
      const password = "password";
      const hashedPassword = await PasswordHasher.hash({ password });

      expect(hashedPassword).not.toEqual(password);
    });
  });
  describe("compare", () => {
    describe("there is a hashed password", () => {
      let password: string;
      let hash: string;

      beforeAll(async () => {
        password = "password";
        hash = await PasswordHasher.hash({ password });
      });
      describe("when the password matches", () => {
        it("should return true", async () => {
          const result = await PasswordHasher.compare({
            password,
            hash,
          });

          expect(result).toEqual(true);
        });
      });
      describe("when the password does not match", () => {
        it("should return false", async () => {
          const result = await PasswordHasher.compare({
            password: "wrong_password",
            hash,
          });

          expect(result).toEqual(false);
        });
      });
    });
  });
});
