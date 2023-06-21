import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddnewTables1687269246004 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE tb_empresa_manutencao (
        id_empresa_manutencao SERIAL PRIMARY KEY,
        nome_empresa VARCHAR(255) NOT NULL,
        tecnico_responsavel VARCHAR(255) NOT NULL,
        telefone VARCHAR(20) NOT NULL,
        email VARCHAR(255) NOT NULL,
        cnpj VARCHAR(20) NOT NULL,
        rua VARCHAR(255) NOT NULL,
        numero VARCHAR(10) NOT NULL,
        complemento VARCHAR(255) NOT NULL,
        bairro VARCHAR(255) NOT NULL,
        cidade VARCHAR(255) NOT NULL,
        estado VARCHAR(255) NOT NULL,
        pais VARCHAR(255) NOT NULL
      );

      CREATE TABLE tb_manutencao (
        id_manutencao SERIAL PRIMARY KEY,
        descricao_servico VARCHAR(255) NOT NULL,
        data_manutencao DATE NOT NULL,
        id_empresa_manutencao INTEGER REFERENCES tb_empresa_manutencao(id_empresa_manutencao) ON DELETE CASCADE
      );

      CREATE TABLE tb_avarias (
        id_avaria SERIAL PRIMARY KEY,
        descricao VARCHAR(255) NOT NULL,
        data_avaria DATE NOT NULL,
        id_patrimonio INTEGER REFERENCES tb_patrimonios(id_patrimonio) ON DELETE CASCADE,
        id_manutencao INTEGER REFERENCES tb_manutencao(id_manutencao) ON DELETE CASCADE
      );

      ALTER TABLE tb_avarias ADD CONSTRAINT FK_tb_avarias_tb_patrimonios FOREIGN KEY (id_patrimonio) REFERENCES tb_patrimonios(id_patrimonio) ON DELETE CASCADE;
      ALTER TABLE tb_avarias ADD CONSTRAINT FK_tb_avarias_tb_manutencao FOREIGN KEY (id_manutencao) REFERENCES tb_manutencao(id_manutencao) ON DELETE CASCADE;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE tb_avarias DROP CONSTRAINT FK_tb_avarias_tb_patrimonios;`);
    await queryRunner.query(`ALTER TABLE tb_avarias DROP CONSTRAINT FK_tb_avarias_tb_manutencao;`);
    await queryRunner.query(`DROP TABLE tb_avarias;`);
    await queryRunner.query(`DROP TABLE tb_manutencao;`);
    await queryRunner.query(`DROP TABLE tb_empresa_manutencao;`);
  }
}
