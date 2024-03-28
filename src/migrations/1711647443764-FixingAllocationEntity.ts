import { MigrationInterface, QueryRunner } from "typeorm";

export class FixingAllocationEntity1711647443764 implements MigrationInterface {
    name = 'FixingAllocationEntity1711647443764'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "allocations" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "allocations" ADD "price" numeric NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "allocations" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "allocations" ADD "price" character varying(10) NOT NULL`);
    }

}
