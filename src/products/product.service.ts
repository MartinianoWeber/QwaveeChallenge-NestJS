import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "./product.entity";
import { Repository } from "typeorm";
import { createProductDto } from "./dto/create-product.dto";
import { updateProductDto } from "./dto/update-product.dto";
import { validationMessages } from "../utils/validation-messages";
@Injectable()
export class ProductService {
  result = validationMessages;
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>
  ) {}

  async createProduct(product: createProductDto) {
    const { nombre } = product;
    const productoFound = await this.productRepository.findOne({
      where: { nombre: nombre },
    });
    if (productoFound) {
      return new HttpException(
        this.result.serviceErrors.productErrorId,
        HttpStatus.CONFLICT
      );
    }
    const newProduct = this.productRepository.create(product);
    return this.productRepository.save(newProduct);
  }

  getAllProducts(filter: string) {
    return filter
      ? this.productRepository.find({
          where: [{ nombre: filter }],
        })
      : this.productRepository.find();
  }

  async deleteProduct(id: number) {
    const productFound = await this.productRepository.findOne({
      where: { id: id },
    });
    return productFound
      ? await this.productRepository.delete({ id })
      : new HttpException(
          this.result.serviceErrors.productErrorId,
          HttpStatus.NOT_FOUND
        );
  }

  async updateProduct(id: number, product: updateProductDto) {
    const productFound = await this.productRepository.findOne({
      where: { id: id },
    });
    if (!productFound) {
      return new HttpException(
        this.result.serviceErrors.productErrorId,
        HttpStatus.NOT_FOUND
      );
    }
    this.productRepository.update({ id }, product);
  }
}
