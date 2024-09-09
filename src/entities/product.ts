import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column("decimal")
  size!: number;

  @Column()
  image!: string;

  @Column("decimal")
  price!: number;

  @Column("decimal", { nullable: true, default: 0 })
  discount!: number;

  @Column({ nullable: true })
  description?: string;
}
