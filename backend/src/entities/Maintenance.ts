import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { MaintenanceCompany } from './MaintenanceCompany';

@Entity('tb_manutencao')
export class Maintenance {
  @PrimaryGeneratedColumn()
  id_manutencao: string;

  @Column()
  descricao_servico: string;

  @Column()
  data_manutencao: string;

  @ManyToOne(() => MaintenanceCompany, {
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinColumn({ name: 'id_empresa_manutencao' })
  maintenanceCompany: MaintenanceCompany;
}
