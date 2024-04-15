import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1713194038010 implements MigrationInterface {
    name = 'InitialMigration1713194038010'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "payment_methods" ("id" SERIAL NOT NULL, "cardNumber" character varying(120) NOT NULL, "cardHolderName" character varying(100) NOT NULL, "expirationDate" character varying(5) NOT NULL, "cvv" character varying(120) NOT NULL, "cardType" character varying(100) NOT NULL, "isDefault" boolean NOT NULL, "userId" integer, CONSTRAINT "PK_34f9b8c6dfb4ac3559f7e2820d1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "adresses" ("id" SERIAL NOT NULL, "street" character varying(100) NOT NULL, "number" character varying(50) NOT NULL, "neighborhood" character varying(100) NOT NULL, "city" character varying(100) NOT NULL, "state" character varying(100) NOT NULL, "zipCode" character varying(20) NOT NULL, "complement" character varying(255), "userId" integer, CONSTRAINT "REL_b4f5c94493f23641866f161e21" UNIQUE ("userId"), CONSTRAINT "PK_2787c84f7433e390ff8961d552d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "email" character varying(100) NOT NULL, "name" character varying(100) NOT NULL, "password" character varying(120) NOT NULL, "cpf" character varying(120) NOT NULL, "cel" character varying(11) NOT NULL, "birthdate" character varying(10) NOT NULL, "admin" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_230b925048540454c8b4c481e1c" UNIQUE ("cpf"), CONSTRAINT "UQ_fef935dafbb0415c8bfc37c8a61" UNIQUE ("cel"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "wallets" ("id" SERIAL NOT NULL, "balance" numeric NOT NULL, "userId" integer, CONSTRAINT "REL_2ecdb33f23e9a6fc392025c0b9" UNIQUE ("userId"), CONSTRAINT "PK_8402e5df5a30a229380e83e4f7e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "payments" ("id" SERIAL NOT NULL, "price" numeric NOT NULL, "paymentDate" character varying(100) NOT NULL, "type" character varying(255) NOT NULL, "userId" integer, CONSTRAINT "PK_197ab7af18c93fbb0c9b28b4a59" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "notifications" ("id" SERIAL NOT NULL, "title" character varying(100) NOT NULL, "content" text NOT NULL, "sentAt" TIMESTAMP NOT NULL DEFAULT now(), "status" boolean NOT NULL DEFAULT false, "type" character varying(255) NOT NULL, "userId" integer, CONSTRAINT "PK_6a72c3c0f683f6462415e653c3a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cages" ("id" SERIAL NOT NULL, "number" integer NOT NULL, "location" character varying(150) NOT NULL, "availability" boolean NOT NULL DEFAULT true, "open" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_46660b866b01354ca93c573cc78" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "allocations" ("id" SERIAL NOT NULL, "initialDatetime" character varying(50) NOT NULL, "finalDatetime" character varying(50) NOT NULL, "price" numeric NOT NULL, "paymentStatus" boolean NOT NULL DEFAULT false, "finished" boolean NOT NULL DEFAULT false, "userId" integer, "cageId" integer, CONSTRAINT "PK_ca63099fc248466264af0fa6f1f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "payment_methods" ADD CONSTRAINT "FK_580f1dbf7bceb9c2cde8baf7ff4" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "adresses" ADD CONSTRAINT "FK_b4f5c94493f23641866f161e212" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "wallets" ADD CONSTRAINT "FK_2ecdb33f23e9a6fc392025c0b97" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "payments" ADD CONSTRAINT "FK_d35cb3c13a18e1ea1705b2817b1" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notifications" ADD CONSTRAINT "FK_692a909ee0fa9383e7859f9b406" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "allocations" ADD CONSTRAINT "FK_d69c1e21057b122e0ed0912eddd" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "allocations" ADD CONSTRAINT "FK_e5d667a78f846c246308b228cb4" FOREIGN KEY ("cageId") REFERENCES "cages"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "allocations" DROP CONSTRAINT "FK_e5d667a78f846c246308b228cb4"`);
        await queryRunner.query(`ALTER TABLE "allocations" DROP CONSTRAINT "FK_d69c1e21057b122e0ed0912eddd"`);
        await queryRunner.query(`ALTER TABLE "notifications" DROP CONSTRAINT "FK_692a909ee0fa9383e7859f9b406"`);
        await queryRunner.query(`ALTER TABLE "payments" DROP CONSTRAINT "FK_d35cb3c13a18e1ea1705b2817b1"`);
        await queryRunner.query(`ALTER TABLE "wallets" DROP CONSTRAINT "FK_2ecdb33f23e9a6fc392025c0b97"`);
        await queryRunner.query(`ALTER TABLE "adresses" DROP CONSTRAINT "FK_b4f5c94493f23641866f161e212"`);
        await queryRunner.query(`ALTER TABLE "payment_methods" DROP CONSTRAINT "FK_580f1dbf7bceb9c2cde8baf7ff4"`);
        await queryRunner.query(`DROP TABLE "allocations"`);
        await queryRunner.query(`DROP TABLE "cages"`);
        await queryRunner.query(`DROP TABLE "notifications"`);
        await queryRunner.query(`DROP TABLE "payments"`);
        await queryRunner.query(`DROP TABLE "wallets"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "adresses"`);
        await queryRunner.query(`DROP TABLE "payment_methods"`);
    }

}
