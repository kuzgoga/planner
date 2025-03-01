import { MigrationInterface, QueryRunner } from "typeorm";
import { genSaltSync, hashSync } from "bcrypt-ts";

export class myMigration1587101104904 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    console.log("Running migration");

    // Create a new user
    await this.createUser(queryRunner, {
      username: "admin",
      email: "admin@example.com",
      password: "securePassword123",
      // Add other fields as required by your schema
    });
  }

  private async createUser(
    queryRunner: QueryRunner,
    userData: {
      username: string;
      email: string;
      password: string;
      // Define other fields based on your schema
    },
  ): Promise<void> {
    // Get salt rounds from env or use default
    const saltRounds = genSaltSync(parseInt(process.env.SALT_ROUNDS || "10"));

    // Hash the password
    const hashedPassword = hashSync(userData.password, saltRounds);

    // Insert the user
    await queryRunner.query(
      `INSERT INTO users(
        username,
        email,
        password_hash,
        created_at
        /* Add other columns as needed */
      ) VALUES (
        $1, $2, $3, $4
        /* Add placeholders for other values */
      )`,
      [
        userData.username,
        userData.email,
        hashedPassword,
        new Date(),
        // Add other values as needed
      ],
    );

    console.log(`User ${userData.username} created successfully`);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    // Optionally remove the created users in down migration
    // await queryRunner.query(`DELETE FROM users WHERE username = 'admin'`);
  }
}
