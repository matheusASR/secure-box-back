import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRelations1711502868354 implements MigrationInterface {
    name = 'AddRelations1711502868354'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payment_methods" ADD "user_id" integer`);
        await queryRunner.query(`ALTER TABLE "payment_methods" ADD CONSTRAINT "UQ_d7d7fb15569674aaadcfbc0428c" UNIQUE ("user_id")`);
        await queryRunner.query(`ALTER TABLE "notifications" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "allocations" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "allocations" ADD "cageId" integer`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD "user_id" integer`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD CONSTRAINT "UQ_16aac8a9f6f9c1dd6bcb75ec023" UNIQUE ("user_id")`);
        await queryRunner.query(`ALTER TABLE "payment_methods" ADD CONSTRAINT "FK_d7d7fb15569674aaadcfbc0428c" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notifications" ADD CONSTRAINT "FK_692a909ee0fa9383e7859f9b406" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "allocations" ADD CONSTRAINT "FK_d69c1e21057b122e0ed0912eddd" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "allocations" ADD CONSTRAINT "FK_e5d667a78f846c246308b228cb4" FOREIGN KEY ("cageId") REFERENCES "cages"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD CONSTRAINT "FK_16aac8a9f6f9c1dd6bcb75ec023" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "addresses" DROP CONSTRAINT "FK_16aac8a9f6f9c1dd6bcb75ec023"`);
        await queryRunner.query(`ALTER TABLE "allocations" DROP CONSTRAINT "FK_e5d667a78f846c246308b228cb4"`);
        await queryRunner.query(`ALTER TABLE "allocations" DROP CONSTRAINT "FK_d69c1e21057b122e0ed0912eddd"`);
        await queryRunner.query(`ALTER TABLE "notifications" DROP CONSTRAINT "FK_692a909ee0fa9383e7859f9b406"`);
        await queryRunner.query(`ALTER TABLE "payment_methods" DROP CONSTRAINT "FK_d7d7fb15569674aaadcfbc0428c"`);
        await queryRunner.query(`ALTER TABLE "addresses" DROP CONSTRAINT "UQ_16aac8a9f6f9c1dd6bcb75ec023"`);
        await queryRunner.query(`ALTER TABLE "addresses" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "allocations" DROP COLUMN "cageId"`);
        await queryRunner.query(`ALTER TABLE "allocations" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "notifications" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "payment_methods" DROP CONSTRAINT "UQ_d7d7fb15569674aaadcfbc0428c"`);
        await queryRunner.query(`ALTER TABLE "payment_methods" DROP COLUMN "user_id"`);
    }

}
