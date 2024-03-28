import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRelations1711643606912 implements MigrationInterface {
    name = 'AddRelations1711643606912'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "adresses" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "adresses" ADD CONSTRAINT "UQ_b4f5c94493f23641866f161e212" UNIQUE ("userId")`);
        await queryRunner.query(`ALTER TABLE "wallets" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "wallets" ADD CONSTRAINT "UQ_2ecdb33f23e9a6fc392025c0b97" UNIQUE ("userId")`);
        await queryRunner.query(`ALTER TABLE "adresses" ADD CONSTRAINT "FK_b4f5c94493f23641866f161e212" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "wallets" ADD CONSTRAINT "FK_2ecdb33f23e9a6fc392025c0b97" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "wallets" DROP CONSTRAINT "FK_2ecdb33f23e9a6fc392025c0b97"`);
        await queryRunner.query(`ALTER TABLE "adresses" DROP CONSTRAINT "FK_b4f5c94493f23641866f161e212"`);
        await queryRunner.query(`ALTER TABLE "wallets" DROP CONSTRAINT "UQ_2ecdb33f23e9a6fc392025c0b97"`);
        await queryRunner.query(`ALTER TABLE "wallets" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "adresses" DROP CONSTRAINT "UQ_b4f5c94493f23641866f161e212"`);
        await queryRunner.query(`ALTER TABLE "adresses" DROP COLUMN "userId"`);
    }

}
