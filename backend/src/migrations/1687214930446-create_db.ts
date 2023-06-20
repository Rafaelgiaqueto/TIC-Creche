import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateReferences1687214930446 implements MigrationInterface {
    name = 'CreateReferences1687214930446';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tb_local_patrimonio" (
            "id_local_patrimonio" SERIAL NOT NULL, 
            "nome_local" character varying NOT NULL, 
            "descricao" character varying NOT NULL, 
            CONSTRAINT "PK_8489a2c6fa4a0b328e3ebc09b83" PRIMARY KEY ("id_local_patrimonio"))`
        );

        await queryRunner.query(`CREATE TABLE "tb_usuarios" (
            "id" SERIAL NOT NULL, 
            "nome" text NOT NULL, 
            "email" text NOT NULL, 
            "telefone" text NOT NULL, 
            "senha" text NOT NULL, 
            "reset_password_code" text, 
            CONSTRAINT "UQ_ee293a06076c7f1cdeb7fcbc774" UNIQUE ("email"), 
            CONSTRAINT "PK_b8032a3a700575eaa4722bf3801" PRIMARY KEY ("id"))`
        );

        await queryRunner.query(`CREATE TABLE "tb_categoria" (
            "id_categoria" SERIAL NOT NULL, 
            "nome_categoria" character varying NOT NULL, 
            "descricao" character varying NOT NULL, 
            CONSTRAINT "PK_6beecb3ff46f2425ce44b7fb0dd" PRIMARY KEY ("id_categoria"))`
        );

        await queryRunner.query(`CREATE TABLE "tb_patrimonios" (
            "id_patrimonio" SERIAL NOT NULL, 
            "nome_patrimonio" character varying NOT NULL, 
            "descricao" character varying NOT NULL,
            "historico_manutencao" character varying NOT NULL, 
            "nr_serie" character varying NOT NULL, 
            "id" integer, 
            "id_categoria" integer, 
            "id_local_patrimonio" integer, 
            CONSTRAINT "PK_d9dda90639f71efd339406d9353" PRIMARY KEY ("id_patrimonio"))`
        );

        await queryRunner.query(`ALTER TABLE "tb_patrimonios" ADD CONSTRAINT "FK_e82dfa96fe191fac12dbaa41b52" FOREIGN KEY ("id") REFERENCES "tb_usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tb_patrimonios" ADD CONSTRAINT "FK_19ed59e4d404577cbff2be0e524" FOREIGN KEY ("id_categoria") REFERENCES "tb_categoria"("id_categoria") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tb_patrimonios" ADD CONSTRAINT "FK_6fdda8dcbbd3a9040f167ba4fda" FOREIGN KEY ("id_local_patrimonio") REFERENCES "tb_local_patrimonio"("id_local_patrimonio") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tb_patrimonios" DROP CONSTRAINT "FK_6fdda8dcbbd3a9040f167ba4fda"`);
        await queryRunner.query(`ALTER TABLE "tb_patrimonios" DROP CONSTRAINT "FK_19ed59e4d404577cbff2be0e524"`);
        await queryRunner.query(`ALTER TABLE "tb_patrimonios" DROP CONSTRAINT "FK_e82dfa96fe191fac12dbaa41b52"`);
        await queryRunner.query(`DROP TABLE "tb_patrimonios"`);
        await queryRunner.query(`DROP TABLE "tb_categoria"`);
        await queryRunner.query(`DROP TABLE "tb_usuarios"`);
        await queryRunner.query(`DROP TABLE "tb_local_patrimonio"`);
    }
}
