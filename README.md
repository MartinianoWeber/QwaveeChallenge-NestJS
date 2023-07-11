# Challenge de Node.js: Gestión de Productos

Tu tarea consiste en desarrollar una aplicación de gestión de productos utilizando Node.js. La aplicación permitirá a los usuarios realizar las siguientes operaciones: agregar un nuevo producto, ver la lista de productos existentes, actualizar la información de un producto y eliminar un producto.

## Item 1: Configuración del proyecto y endpoints

1. Configura un nuevo proyecto de Node.js utilizando el marco proporcionado(nestjs) que tiene instalada la dependencia de typeorm.
2. Crea los siguientes endpoints:

   - `GET /productos`: Devuelve la lista de todos los productos.
   - `POST /productos`: Agrega un nuevo producto a la base de datos.
   - `PUT /productos/:id`: Actualiza la información de un producto existente.
   - `DELETE /productos/:id`: Elimina un producto de la base de datos.

## Item 2: Base de datos

1. Diseña el esquema de la base de datos para almacenar la información de los productos. Los campos mínimos requeridos son:

   - `id`: Identificador único del producto.
   - `nombre`: Nombre del producto.
   - `precio`: Precio del producto.
   - `descripcion`: Descripción del producto.

2. Utiliza el sistema de gestión de bases de datos relacional de tu elección (por ejemplo, MySQL, PostgreSQL) para crear la base de datos y la tabla correspondiente al esquema diseñado.

## Item 3: Implementación de los endpoints

Implementa la lógica necesaria en cada uno de los endpoints para realizar las operaciones mencionadas anteriormente (agregar, ver, actualizar y eliminar productos). Asegúrate de manejar los posibles errores y devolver las respuestas apropiadas en cada caso (por ejemplo, 404 si un producto no existe).

## Item 4 (opcional): Validaciones y mejoras adicionales

1. Agrega validaciones para los datos ingresados al crear o actualizar un producto (por ejemplo, asegurarse de que el precio sea un número positivo).
2. Implementa paginación o filtrado para la lista de productos en el endpoint `GET /productos`, de manera que se puedan obtener subconjuntos de productos según criterios especificados en la solicitud (por ejemplo, limitar la cantidad de productos devueltos).

Recuerda que además de cumplir con los requerimientos del challenge, se valorará la calidad del código, la estructura del proyecto y la eficiencia en el manejo de la base de datos.

¡Buena suerte con el challenge de Node.js!

