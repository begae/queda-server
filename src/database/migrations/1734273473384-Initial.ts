import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1734273473384 implements MigrationInterface {
    name = 'Initial1734273473384'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "refresh_token" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "token" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" uuid, CONSTRAINT "REL_6bbe63d2fe75e7f0ba1710351d" UNIQUE ("user_id"), CONSTRAINT "PK_b575dd3c21fb0831013c909e7fe" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."user_role_enum" AS ENUM('ADMIN', 'USER', 'STORE')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "password" character varying NOT NULL, "role" "public"."user_role_enum" NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "profileId" uuid, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "REL_9466682df91534dd95e4dbaa61" UNIQUE ("profileId"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "profile" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nickname" character varying NOT NULL, "profile_picture" character varying NOT NULL, "location" geometry(Point,4326) NOT NULL, CONSTRAINT "PK_3dd8bfc97e4a77c70971591bdcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_83201725f7096a4ac3d4edf82b" ON "profile" USING GiST ("location") `);
        await queryRunner.query(`CREATE TABLE "post" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "body" character varying NOT NULL, "attachments" text, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "store_id" uuid, CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tag" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "value" character varying NOT NULL, CONSTRAINT "UQ_fbbecbf5974405cb19dbd2f2434" UNIQUE ("value"), CONSTRAINT "PK_8e4052373c579afc1471f526760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "store" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "cover_picture" character varying NOT NULL, "profile_picture" character varying NOT NULL, "registration" integer NOT NULL, "location" geometry(Point,4326) NOT NULL, "owner_profile_id" uuid, "featuredPostId" uuid, CONSTRAINT "REL_3cccfe408461a7b6490f28f9f4" UNIQUE ("owner_profile_id"), CONSTRAINT "REL_10e477d9c8f758aa96d1819075" UNIQUE ("featuredPostId"), CONSTRAINT "PK_f3172007d4de5ae8e7692759d79" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_c4e3631ce2b1257ccd23841ac7" ON "store" USING GiST ("location") `);
        await queryRunner.query(`CREATE TABLE "user_post_likes" ("user_profile_id" uuid NOT NULL, "post_id" uuid NOT NULL, CONSTRAINT "PK_62f555eb8d75ac1cf799edcdc49" PRIMARY KEY ("user_profile_id", "post_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_19ebb3ef165f78c309af8f3efa" ON "user_post_likes" ("user_profile_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_e7043d90e6efbc51d3a79239db" ON "user_post_likes" ("post_id") `);
        await queryRunner.query(`CREATE TABLE "tag_store_relation" ("tag_id" uuid NOT NULL, "store_id" uuid NOT NULL, CONSTRAINT "PK_c3630dbdeb6360fbb9401979200" PRIMARY KEY ("tag_id", "store_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_327c3d2134acefaa810148520b" ON "tag_store_relation" ("tag_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_34282e850aac68f9bec61ac335" ON "tag_store_relation" ("store_id") `);
        await queryRunner.query(`CREATE TABLE "store_user_subscriptions" ("store_id" uuid NOT NULL, "user_profile_id" uuid NOT NULL, CONSTRAINT "PK_b216c0800c237167bc29bf29e67" PRIMARY KEY ("store_id", "user_profile_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_a571437149bacb1517863ed0d6" ON "store_user_subscriptions" ("store_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_6e0a60e38e31d5ba151dc56170" ON "store_user_subscriptions" ("user_profile_id") `);
        await queryRunner.query(`ALTER TABLE "refresh_token" ADD CONSTRAINT "FK_6bbe63d2fe75e7f0ba1710351d4" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_9466682df91534dd95e4dbaa616" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "FK_636ed5b7c9fca46cbb633224473" FOREIGN KEY ("store_id") REFERENCES "store"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "store" ADD CONSTRAINT "FK_3cccfe408461a7b6490f28f9f44" FOREIGN KEY ("owner_profile_id") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "store" ADD CONSTRAINT "FK_10e477d9c8f758aa96d18190755" FOREIGN KEY ("featuredPostId") REFERENCES "post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_post_likes" ADD CONSTRAINT "FK_19ebb3ef165f78c309af8f3efad" FOREIGN KEY ("user_profile_id") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_post_likes" ADD CONSTRAINT "FK_e7043d90e6efbc51d3a79239dbe" FOREIGN KEY ("post_id") REFERENCES "post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tag_store_relation" ADD CONSTRAINT "FK_327c3d2134acefaa810148520bf" FOREIGN KEY ("tag_id") REFERENCES "tag"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "tag_store_relation" ADD CONSTRAINT "FK_34282e850aac68f9bec61ac3359" FOREIGN KEY ("store_id") REFERENCES "store"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "store_user_subscriptions" ADD CONSTRAINT "FK_a571437149bacb1517863ed0d6e" FOREIGN KEY ("store_id") REFERENCES "store"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "store_user_subscriptions" ADD CONSTRAINT "FK_6e0a60e38e31d5ba151dc561704" FOREIGN KEY ("user_profile_id") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "store_user_subscriptions" DROP CONSTRAINT "FK_6e0a60e38e31d5ba151dc561704"`);
        await queryRunner.query(`ALTER TABLE "store_user_subscriptions" DROP CONSTRAINT "FK_a571437149bacb1517863ed0d6e"`);
        await queryRunner.query(`ALTER TABLE "tag_store_relation" DROP CONSTRAINT "FK_34282e850aac68f9bec61ac3359"`);
        await queryRunner.query(`ALTER TABLE "tag_store_relation" DROP CONSTRAINT "FK_327c3d2134acefaa810148520bf"`);
        await queryRunner.query(`ALTER TABLE "user_post_likes" DROP CONSTRAINT "FK_e7043d90e6efbc51d3a79239dbe"`);
        await queryRunner.query(`ALTER TABLE "user_post_likes" DROP CONSTRAINT "FK_19ebb3ef165f78c309af8f3efad"`);
        await queryRunner.query(`ALTER TABLE "store" DROP CONSTRAINT "FK_10e477d9c8f758aa96d18190755"`);
        await queryRunner.query(`ALTER TABLE "store" DROP CONSTRAINT "FK_3cccfe408461a7b6490f28f9f44"`);
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_636ed5b7c9fca46cbb633224473"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_9466682df91534dd95e4dbaa616"`);
        await queryRunner.query(`ALTER TABLE "refresh_token" DROP CONSTRAINT "FK_6bbe63d2fe75e7f0ba1710351d4"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6e0a60e38e31d5ba151dc56170"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a571437149bacb1517863ed0d6"`);
        await queryRunner.query(`DROP TABLE "store_user_subscriptions"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_34282e850aac68f9bec61ac335"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_327c3d2134acefaa810148520b"`);
        await queryRunner.query(`DROP TABLE "tag_store_relation"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e7043d90e6efbc51d3a79239db"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_19ebb3ef165f78c309af8f3efa"`);
        await queryRunner.query(`DROP TABLE "user_post_likes"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c4e3631ce2b1257ccd23841ac7"`);
        await queryRunner.query(`DROP TABLE "store"`);
        await queryRunner.query(`DROP TABLE "tag"`);
        await queryRunner.query(`DROP TABLE "post"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_83201725f7096a4ac3d4edf82b"`);
        await queryRunner.query(`DROP TABLE "profile"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
        await queryRunner.query(`DROP TABLE "refresh_token"`);
    }

}
