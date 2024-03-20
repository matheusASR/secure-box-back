import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRelations1710945914820 implements MigrationInterface {
    name = 'AddRelations1710945914820'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "allocations" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "allocations" ADD "cageId" integer`);
        await queryRunner.query(`ALTER TABLE "allocations" ADD CONSTRAINT "FK_d69c1e21057b122e0ed0912eddd" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "allocations" ADD CONSTRAINT "FK_e5d667a78f846c246308b228cb4" FOREIGN KEY ("cageId") REFERENCES "cages"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "allocations" DROP CONSTRAINT "FK_e5d667a78f846c246308b228cb4"`);
        await queryRunner.query(`ALTER TABLE "allocations" DROP CONSTRAINT "FK_d69c1e21057b122e0ed0912eddd"`);
        await queryRunner.query(`ALTER TABLE "allocations" DROP COLUMN "cageId"`);
        await queryRunner.query(`ALTER TABLE "allocations" DROP COLUMN "userId"`);
    }

}
