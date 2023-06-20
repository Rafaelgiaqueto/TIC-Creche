import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './User';
import { Category } from './Category';
import { Local_patrimony } from './Local_patrimony';

@Entity('tb_patrimonios')
export class Patrimony {
  @PrimaryGeneratedColumn()
  id_patrimonio: string;

  @Column()
  nome_patrimonio: string;

  @Column()
  descricao: string;

  @Column()
  historico_manutencao: string;

  @Column()
  nr_serie: string;

  @ManyToOne(() => User, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'id' })
  user: User;

  @ManyToOne(() => Category, { 
    eager: true,
    onDelete: 'CASCADE'
  }) 
  @JoinColumn({ name: 'id_categoria'})
  category: Category;

  @ManyToOne(() => Local_patrimony, {
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinColumn({ name: 'id_local_patrimonio'})
  localPatrimony: Local_patrimony;
  
}