import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1713279905510 implements MigrationInterface {
    name = 'InitialMigration1713279905510'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "pix" ("id" SERIAL NOT NULL, "endToEndId" character varying NOT NULL, "txid" character varying NOT NULL, "valor" character varying NOT NULL, "horario" character varying NOT NULL, "chave" character varying NOT NULL, CONSTRAINT "PK_da846dad51d704c2f2814148ae4" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "pix"`);
    }

}
