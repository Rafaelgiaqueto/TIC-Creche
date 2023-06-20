import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('tb_empresa_manutencao')
export class MaintenanceCompany {
  @PrimaryGeneratedColumn()
  id_empresa_manutencao: string;

  @Column()
  nome_empresa: string;

  @Column()
  tecnico_responsavel: string;

  @Column()
  telefone: string;

  @Column()
  email: string;

  @Column()
  cnpj: string;

  @Column()
  rua: string;

  @Column()
  numero: string;

  @Column()
  complemento: string;

  @Column()
  bairro: string;

  @Column()
  cidade: string;

  @Column()
  estado: string;

  @Column()
  pais: string;
}
