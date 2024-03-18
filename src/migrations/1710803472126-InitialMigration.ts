import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1710803472126 implements MigrationInterface {
    name = 'InitialMigration1710803472126'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "allocations" ("id" SERIAL NOT NULL, "inicialDatetime" character varying(50) NOT NULL, "finalDatetime" character varying(50) NOT NULL, "price" character varying(10) NOT NULL, "paymentStatus" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_ca63099fc248466264af0fa6f1f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cages" ("id" SERIAL NOT NULL, "location" character varying(150) NOT NULL, "availability" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_46660b866b01354ca93c573cc78" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "email" character varying(45) NOT NULL, "name" character varying(45) NOT NULL, "password" character varying(120) NOT NULL, "cpf" character varying(11) NOT NULL, "cel" character varying(11) NOT NULL, "birthdate" date NOT NULL, "address" jsonb NOT NULL, "admin" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_230b925048540454c8b4c481e1c" UNIQUE ("cpf"), CONSTRAINT "UQ_fef935dafbb0415c8bfc37c8a61" UNIQUE ("cel"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "cages"`);
        await queryRunner.query(`DROP TABLE "allocations"`);
    }

}
