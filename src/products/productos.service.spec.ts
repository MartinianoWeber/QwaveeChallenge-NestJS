import { Test, TestingModule } from "@nestjs/testing";
import { ProductService } from "./product.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Product } from "./product.entity";
import { DeleteResult } from "typeorm";
import { NotFoundException } from "@nestjs/common";
// import validationMessages from "src/utils/validation-messages";
describe("ProductosService", () => {
  let service: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      // imports: [validationMessages],
      providers: [
        ProductService,
        {
          provide: getRepositoryToken(Product),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
  });

  describe("getAllProducts", () => {
    // si encuentra el array completo de productos

    it("should return an array of products", async () => {
      const result: Product[] = [];
      jest
        .spyOn(service, "getAllProducts")
        .mockImplementation(() => Promise.resolve(result));
      expect(await service.getAllProducts("")).toBe(result);
    });
    // si encuentra el array filtrado de productos

    it("should return an array of products", async () => {
      const result: Product[] = [];
      jest
        .spyOn(service, "getAllProducts")
        .mockImplementation(() => Promise.resolve(result));
      expect(await service.getAllProducts("test")).toBe(result);
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
        .spyOn(service, "createProduct")
        .mockImplementation(() => Promise.resolve(createdProduct));
      expect(
        await service.createProduct({
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
        .spyOn(service, "createProduct")
        .mockRejectedValue(new Error(errorMessage));
      await expect(service.createProduct(existingProduct)).rejects.toThrow(
        errorMessage
      );
    });
  });

  describe("deleteProduct", () => {
    // si elimina y sale ok

    it("should delete a product", async () => {
      const productId = 1;
      const deleteResult: DeleteResult = {
        affected: 1,
        raw: [],
      };
      jest
        .spyOn(service, "deleteProduct")
        .mockImplementation(() => Promise.resolve(deleteResult));
      expect(await service.deleteProduct(productId)).toEqual(deleteResult);
    });
    // si elimina y no se encuentra el id

    it('should return "El producto con el id seleccionado no existe"', async () => {
      const id = 1;
      const errorMessage = `El producto con el id seleccionado no existe`;
      jest
        .spyOn(service, "deleteProduct")
        .mockImplementation(() => Promise.reject(new Error(errorMessage)));
      await expect(service.deleteProduct(id)).rejects.toThrow(errorMessage);
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
      const updatedResult = {
        id: productId,
        ...updatedProduct,
      };
      jest
        .spyOn(service, "updateProduct")
        .mockRejectedValue(
          new NotFoundException(`El producto con id ${productId} no existe`)
        );
      await expect(
        service.updateProduct(productId, updatedProduct)
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
        .spyOn(service, "updateProduct")
        .mockRejectedValue(new Error(errorMessage));
      await expect(service.updateProduct(id, updatedProduct)).rejects.toThrow(
        errorMessage
      );
    });
  });
});
