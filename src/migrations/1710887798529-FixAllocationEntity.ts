import { MigrationInterface, QueryRunner } from "typeorm";

export class FixAllocationEntity1710887798529 implements MigrationInterface {
    name = 'FixAllocationEntity1710887798529'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "allocations" ALTER COLUMN "finalDatetime" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "allocations" ALTER COLUMN "price" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "allocations" ALTER COLUMN "price" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "allocations" ALTER COLUMN "finalDatetime" SET NOT NULL`);
    }

}
