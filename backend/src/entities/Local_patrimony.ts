import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('tb_local_patrimonio')
export class Local_patrimony {
  @PrimaryGeneratedColumn()
  id_local_patrimonio: string;

  @Column()
  nome_local: string;

  @Column()
  descricao: string;
}
