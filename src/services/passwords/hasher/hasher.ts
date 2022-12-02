import bcrypt from "bcrypt";

export class PasswordHasher {
  static SALT_ROUNDS = 10;

  static async hash({ password }: { password: string }) {
    const salt = await bcrypt.genSalt(PasswordHasher.SALT_ROUNDS);

    return bcrypt.hashSync(password, salt);
  }

  static async compare({ password, hash }: { password: string; hash: string }) {
    return bcrypt.compareSync(password, hash);
  }
}
