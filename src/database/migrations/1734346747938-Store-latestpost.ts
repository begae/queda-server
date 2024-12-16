import { MigrationInterface, QueryRunner } from "typeorm";

export class StoreLatestpost1734346747938 implements MigrationInterface {
    name = 'StoreLatestpost1734346747938'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "store" ADD "latestPostId" uuid`);
        await queryRunner.query(`ALTER TABLE "store" ADD CONSTRAINT "UQ_3b56982fd66dbd0dba6e213a3c4" UNIQUE ("latestPostId")`);
        await queryRunner.query(`ALTER TABLE "store" ADD CONSTRAINT "FK_3b56982fd66dbd0dba6e213a3c4" FOREIGN KEY ("latestPostId") REFERENCES "post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "store" DROP CONSTRAINT "FK_3b56982fd66dbd0dba6e213a3c4"`);
        await queryRunner.query(`ALTER TABLE "store" DROP CONSTRAINT "UQ_3b56982fd66dbd0dba6e213a3c4"`);
        await queryRunner.query(`ALTER TABLE "store" DROP COLUMN "latestPostId"`);
    }

}
