import { Module } from "@nestjs/common";
// Importamos el modulo de productos
import { ProductModule } from "./products/product.module";
// TYPE ORM para la conexion a la base de datos
import { TypeOrmModule } from "@nestjs/typeorm";
@Module({
  imports: [
    ProductModule,
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "",
      database: "qwavee",
      entities: [__dirname + "/**/*.entity{.ts,.js}"],
      synchronize: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
