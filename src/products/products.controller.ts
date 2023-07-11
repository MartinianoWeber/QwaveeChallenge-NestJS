import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { ProductService } from "./product.service";
import { createProductDto } from "./dto/create-product.dto";
import { Product } from "./product.entity";
import { updateProductDto } from "./dto/update-product.dto";

@Controller("productos")
export class ProductController {
  constructor(private productosService: ProductService) {}

  @Get()
  getAllProducts(@Query("filter") filter: string): Promise<Product[]> {
    return this.productosService.getAllProducts(filter);
  }

  @Post()
  createProduct(@Body() newProduct: createProductDto) {
    return this.productosService.createProduct(newProduct);
  }

  @Delete(":id")
  deleteProduct(@Param("id", ParseIntPipe) id: number) {
    return this.productosService.deleteProduct(id);
  }

  @Patch(":id")
  updateProduct(
    @Param("id", ParseIntPipe) id: number,
    @Body() producto: updateProductDto
  ) {
    return this.productosService.updateProduct(id, producto);
  }
}
