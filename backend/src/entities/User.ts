import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity('tb_usuarios')
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'text' })
  nome: string;

  @Column({ type: 'text', unique: true })
  email: string;

  @Column({ type: 'text', transformer: {
    from: (value: string) => value.replace(/\D/g, ''),
    to: (value: string) => value.replace(/\D/g, '')
  }})
  telefone: string;

  @Column({ type: 'text' })
  senha: string;

  @Column({ type: 'text', nullable: true })
  reset_password_code: string;
  static email: any;
}
