import { MigrationInterface, QueryRunner } from "typeorm";

export class OnCascadeDelete1687215316767 implements MigrationInterface {
    name = 'OnCascadeDelete1687215316767'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tb_patrimonios" DROP CONSTRAINT "FK_e82dfa96fe191fac12dbaa41b52"`);
        await queryRunner.query(`ALTER TABLE "tb_patrimonios" DROP CONSTRAINT "FK_19ed59e4d404577cbff2be0e524"`);
        await queryRunner.query(`ALTER TABLE "tb_patrimonios" DROP CONSTRAINT "FK_6fdda8dcbbd3a9040f167ba4fda"`);
        await queryRunner.query(`ALTER TABLE "tb_patrimonios" ADD CONSTRAINT "FK_e82dfa96fe191fac12dbaa41b52" FOREIGN KEY ("id") REFERENCES "tb_usuarios"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tb_patrimonios" ADD CONSTRAINT "FK_19ed59e4d404577cbff2be0e524" FOREIGN KEY ("id_categoria") REFERENCES "tb_categoria"("id_categoria") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tb_patrimonios" ADD CONSTRAINT "FK_6fdda8dcbbd3a9040f167ba4fda" FOREIGN KEY ("id_local_patrimonio") REFERENCES "tb_local_patrimonio"("id_local_patrimonio") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tb_patrimonios" DROP CONSTRAINT "FK_6fdda8dcbbd3a9040f167ba4fda"`);
        await queryRunner.query(`ALTER TABLE "tb_patrimonios" DROP CONSTRAINT "FK_19ed59e4d404577cbff2be0e524"`);
        await queryRunner.query(`ALTER TABLE "tb_patrimonios" DROP CONSTRAINT "FK_e82dfa96fe191fac12dbaa41b52"`);
        await queryRunner.query(`ALTER TABLE "tb_patrimonios" ADD CONSTRAINT "FK_6fdda8dcbbd3a9040f167ba4fda" FOREIGN KEY ("id_local_patrimonio") REFERENCES "tb_local_patrimonio"("id_local_patrimonio") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tb_patrimonios" ADD CONSTRAINT "FK_19ed59e4d404577cbff2be0e524" FOREIGN KEY ("id_categoria") REFERENCES "tb_categoria"("id_categoria") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tb_patrimonios" ADD CONSTRAINT "FK_e82dfa96fe191fac12dbaa41b52" FOREIGN KEY ("id") REFERENCES "tb_usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
