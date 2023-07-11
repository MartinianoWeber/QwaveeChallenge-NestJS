import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "productos" })
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nombre: string;

  @Column()
  precio: number;

  @Column({ length: 255 })
  descripcion: string;
}
