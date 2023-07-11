
# Challenge QwaveeIT

Para poder ejecutar este proyecto, debemos abrir con visual code el mismo y luego hacer los siguientes pasos:





```bash
  npm i //Instala todas las dependencias
```
```bash
  npm run start:dev // incia el backend.
```




# Endpoints

```http
  GET /productos?filter=
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `filter` | `string` | **Opcional**. Para filtrar y trear un producto en especifico. |

#### Post producto

```http
  POST /productos
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `nombre`      | `string` | **Requerido**. Nombre del producto |
| `precio`      | `int` | **Requerido**. Precio del producto |
| `descripcion`      | `string` | **Requerido**. descripcion del producto |

#### Delete producto

```http
  DELETE /productos/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `int` | **Requerido**. Id del producto |

#### Update producto

```http
  PATCH /productos/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `int` | **Requerido**. Id del producto |
| `nombre`      | `string` | **Opcional**. Nombre del producto |
| `precio`      | `int` | **Opcional**. Precio del producto |
| `descripcion`      | `string` | **Opcional**. descripcion del producto |


#### Los tipos son restrictivos y no se pueden crear dos productos con el mismo nombre.

# Swagger
#### Para acceder al Swagger y tener una mejor perspectiva de los endpoint debemos de ir a nuestro navegador y apuntar hacia la siguiente URL:

```http
  GET http://localhost:3000/api
```


## Corriendo tests

Para iniciar los test se hace de la siguiente manera:

```bash
  npm run test
```




## 🛠 Tecnologias utilizadas
Se utilizo Nest Js como framework de desarrollo. 

Class-validator para validar las peticiones y sus tipos.

TypeORM para la manipulacion y creacion de bases de datos y sus tablas.

