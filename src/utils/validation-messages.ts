export const validationMessages = {
  nombre: {
    isString: "El nombre debe ser un texto",
    isNotEmpty: "El nombre no puede estar vacío",
    length: "El nombre debe tener entre $constraint1 y $constraint2 caracteres",
  },
  descripcion: {
    isString: "La descripción debe ser un texto",
    isNotEmpty: "La descripción no puede estar vacía",
    length:
      "La descripción debe tener entre $constraint1 y $constraint2 caracteres",
  },
  precio: {
    isNumber: "El precio debe ser un número",
    isNotEmpty: "El precio no puede estar vacío",
    min: "El precio debe ser mayor a $constraint1",
  },
  serviceErrors: {
    productExist: "El producto ya existe",
    productErrorId: "El producto con el id seleccionado no existe",
  },
};
