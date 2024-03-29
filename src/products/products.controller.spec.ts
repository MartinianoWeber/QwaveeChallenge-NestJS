import { Test, TestingModule } from "@nestjs/testing";
import { ProductController } from "./products.controller";
import { ProductService } from "./product.service";
import { Product } from "./product.entity";
import { getRepositoryToken } from "@nestjs/typeorm";
import { NotFoundException } from "@nestjs/common";
import { DeleteResult } from "typeorm";
describe("ProductController", () => {
  let controller: ProductController;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        ProductService,
        {
          provide: getRepositoryToken(Product),
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<ProductController>(ProductController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("getAllProducts", () => {
    // si encuentra el array completo de productos

    it("should return an array of products", async () => {
      const result: Product[] = [];
      jest
        .spyOn(controller, "getAllProducts")
        .mockImplementation(() => Promise.resolve(result));
      expect(await controller.getAllProducts("")).toBe(result);
    });
    // si encuentra el array filtrado de productos

    it("should return an array of products", async () => {
      const result: Product[] = [];
      jest
        .spyOn(controller, "getAllProducts")
        .mockImplementation(() => Promise.resolve(result));
      expect(await controller.getAllProducts("test")).toBe(result);
    });
  });

  describe("createProduct", () => {
    // si crea y sale ok

    it("should create a product", async () => {
      const result = {
        nombre: "test",
        descripcion: "test",
        precio: 1,
        id: 0,
      };
      const createdProduct = {
        id: 0,
        nombre: "test",
        descripcion: "test",
        precio: 1,
      };

      jest
        .spyOn(controller, "createProduct")
        .mockImplementation(() => Promise.resolve(createdProduct));
      expect(
        await controller.createProduct({
          nombre: "test",
          descripcion: "test",
          precio: 1,
        })
      ).toEqual(result);
    });
    // si crea y ya existe

    it('should return "El producto ya existe"', async () => {
      const existingProduct = {
        nombre: "test",
        descripcion: "test",
        precio: 1,
      };
      const errorMessage = `El producto ya existe`;
      jest
        .spyOn(controller, "createProduct")
        .mockRejectedValue(new Error(errorMessage));
      await expect(controller.createProduct(existingProduct)).rejects.toThrow(
        errorMessage
      );
    });
  });

  describe("deleteProduct", () => {
    // si elimina y sale ok

    it("should delete a product", async () => {
      const productId = 1;
      const deleteResult = {
        raw: [],
        affected: 1,
      };
      jest
        .spyOn(controller, "deleteProduct")
        .mockImplementation(() => Promise.resolve(deleteResult));
      expect(await controller.deleteProduct(productId)).toEqual(deleteResult);
    });
    // si elimina y no se encuentra el id

    it('should return "El producto con el id seleccionado no existe"', async () => {
      const id = 1;
      const errorMessage = `El producto con el id seleccionado no existe`;
      jest
        .spyOn(controller, "deleteProduct")
        .mockImplementation(() => Promise.reject(new Error(errorMessage)));
      await expect(controller.deleteProduct(id)).rejects.toThrow(errorMessage);
    });
  });

  describe("updateProduct", () => {
    // si updatea  y sale ok

    it("should update a product", async () => {
      const productId = 1;
      const updatedProduct = {
        nombre: "test",
        descripcion: "test",
        precio: 1,
      };

      jest
        .spyOn(controller, "updateProduct")
        .mockRejectedValue(
          new NotFoundException(`El producto con id ${productId} no existe`)
        );
      await expect(
        controller.updateProduct(productId, updatedProduct)
      ).rejects.toThrow(NotFoundException);
    });
    // si updatea y no se encuentra el id

    it('should return "El producto con el id seleccionado no existe"', async () => {
      const id = 1;
      const updatedProduct = {
        nombre: "test",
        descripcion: "test",
        precio: 1,
      };
      const errorMessage = `El producto con el id seleccionado no existe`;
      jest
        .spyOn(controller, "updateProduct")
        .mockRejectedValue(new Error(errorMessage));
      await expect(
        controller.updateProduct(id, updatedProduct)
      ).rejects.toThrow(errorMessage);
    });
  });
});
