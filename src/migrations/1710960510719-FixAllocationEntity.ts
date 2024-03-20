import { MigrationInterface, QueryRunner } from "typeorm";

export class FixAllocationEntity1710960510719 implements MigrationInterface {
    name = 'FixAllocationEntity1710960510719'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "allocations" ADD "pressed" boolean NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "allocations" DROP COLUMN "pressed"`);
    }

}
