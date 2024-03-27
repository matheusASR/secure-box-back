import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1711502831915 implements MigrationInterface {
    name = 'InitialMigration1711502831915'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "email" character varying(100) NOT NULL, "name" character varying(100) NOT NULL, "password" character varying(120) NOT NULL, "cpf" character varying(120) NOT NULL, "cel" character varying(11) NOT NULL, "birthdate" character varying(10) NOT NULL, "admin" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_230b925048540454c8b4c481e1c" UNIQUE ("cpf"), CONSTRAINT "UQ_fef935dafbb0415c8bfc37c8a61" UNIQUE ("cel"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "payment_methods" ("id" SERIAL NOT NULL, "cardNumber" character varying(120) NOT NULL, "cardHolderName" character varying(100) NOT NULL, "expirationDate" character varying(5) NOT NULL, "cvv" character varying(120) NOT NULL, "cardType" character varying(100) NOT NULL, CONSTRAINT "PK_34f9b8c6dfb4ac3559f7e2820d1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "allocations" ("id" SERIAL NOT NULL, "initialDatetime" character varying(50) NOT NULL, "finalDatetime" character varying(50) NOT NULL, "price" character varying(10) NOT NULL, "paymentStatus" boolean NOT NULL, "finished" boolean NOT NULL, CONSTRAINT "PK_ca63099fc248466264af0fa6f1f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cages" ("id" SERIAL NOT NULL, "location" character varying(150) NOT NULL, "availability" boolean NOT NULL DEFAULT true, "open" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_46660b866b01354ca93c573cc78" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "addresses" ("id" SERIAL NOT NULL, "street" character varying(100) NOT NULL, "number" character varying(50) NOT NULL, "city" character varying(100) NOT NULL, "state" character varying(100) NOT NULL, "complement" character varying(255), CONSTRAINT "PK_745d8f43d3af10ab8247465e450" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "notifications" ("id" SERIAL NOT NULL, "title" character varying(100) NOT NULL, "content" text NOT NULL, "sentAt" TIMESTAMP NOT NULL DEFAULT now(), "status" boolean NOT NULL DEFAULT false, "type" character varying(255) NOT NULL, CONSTRAINT "PK_6a72c3c0f683f6462415e653c3a" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "notifications"`);
        await queryRunner.query(`DROP TABLE "addresses"`);
        await queryRunner.query(`DROP TABLE "cages"`);
        await queryRunner.query(`DROP TABLE "allocations"`);
        await queryRunner.query(`DROP TABLE "payment_methods"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
