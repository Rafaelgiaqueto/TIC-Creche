import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('tb_categoria')
export class Category {
  static findById(categoryId: any) {
    throw new Error("Method not implemented.");
  }
  @PrimaryGeneratedColumn()
  id_categoria: string;

  @Column()
  nome_categoria: string;

  @Column()
  descricao: string;
}
