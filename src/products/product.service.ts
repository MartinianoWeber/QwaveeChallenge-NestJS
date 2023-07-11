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
    let messages: object | HttpException;
    const { nombre } = product;
    const productoFound = await this.productRepository.findOne({
      where: { nombre: nombre },
    });
    if (productoFound) {
      messages = new HttpException(
        this.result.serviceErrors.productExist,
        HttpStatus.CONFLICT
      );
    } else {
      const newProduct = this.productRepository.create(product);
      this.productRepository.save(newProduct);
      messages = {
        ...newProduct,
      };
    }
    return messages;
  }

  getAllProducts(filter: string) {
    return filter
      ? this.productRepository.find({
          where: [{ nombre: filter }],
        })
      : this.productRepository.find();
  }

  async deleteProduct(id: number) {
    let messages: object | HttpException;
    const productFound = await this.productRepository.findOne({
      where: { id: id },
    });
    if (productFound) {
      await this.productRepository.delete({ id });
      messages = {
        ...productFound,
      };
    } else {
      messages = new HttpException(
        this.result.serviceErrors.productErrorId,
        HttpStatus.NOT_FOUND
      );
    }
    return messages;
  }

  async updateProduct(id: number, product: updateProductDto) {
    let messages: string | HttpException;
    const productFound = await this.productRepository.findOne({
      where: { id: id },
    });
    if (!productFound) {
      messages = new HttpException(
        this.result.serviceErrors.productErrorId,
        HttpStatus.NOT_FOUND
      );
    } else {
      this.productRepository.update({ id }, product);
      messages = this.result.serviceMessages.productUpdated + id;
    }
    return messages;
  }
}
