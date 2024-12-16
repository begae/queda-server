import { MigrationInterface, QueryRunner } from 'typeorm';

export class SignupNullable1734325158357 implements MigrationInterface {
  name = 'SignupNullable1734325158357';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "profile" ALTER COLUMN "profile_picture" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "profile" ALTER COLUMN "profile_picture" SET NOT NULL`,
    );
  }
}
