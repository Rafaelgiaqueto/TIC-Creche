import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Patrimony } from './Patrimony';
import { Maintenance } from './Maintenance';

@Entity('tb_avarias')
export class Breakdowns {
  @PrimaryGeneratedColumn()
  id_avaria: string;

  @Column()
  descricao: string;

  @Column()
  data_avaria: string;

  @ManyToOne(() => Patrimony, {
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinColumn({ name: 'id_patrimonio' })
  patrimony: Patrimony;

  @ManyToOne(() => Maintenance, {
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinColumn({ name: 'id_manutencao' })
  maintenance: Maintenance;
  id_patrimonio: any;
  id_manutencao: any;
}
