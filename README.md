# 🚀 REST API with Express, TypeScript, and PostgreSQL

This project is a **REST API** built with **Express.js** and **TypeScript**, designed to manage products in a PostgreSQL database.
It includes authentication, validations, unit tests with Jest, and documentation with Swagger.

---

## 📂 Project Structure

```
Btojaka-restapi_node_express_ts_server/
├── jest.config.js         # Jest configuration for testing
├── package.json          # Project dependencies
├── tsconfig.json         # TypeScript configuration
├── assets/               # Static files (logos, images)
└── src/
    ├── index.ts          # API entry point
    ├── router.ts         # Routes configuration
    ├── server.ts         # Express server
    ├── __tests__/        # Unit tests with Jest
    │   └── server.test.ts
    ├── config/
    │   ├── db.ts         # PostgreSQL database configuration with Sequelize
    │   └── swagger.ts    # API documentation with Swagger
    ├── data/
    │   └── index.ts      # Initial data load
    ├── handlers/
    │   ├── product.ts    # Product controller
    │   └── __tests__/     # Unit tests for handlers
    │       └── product.test.ts
    ├── middlewares/
    │   └── index.ts      # Middleware for validations, authentication, etc.
    └── models/
        └── Product.model.ts  # Product data model with Sequelize
```

---

## 🛠️ Technologies Used

✅ **Node.js** - JavaScript runtime environment.
✅ **Express.js** - Framework for building REST APIs.
✅ **TypeScript** - Static typing for JavaScript.
✅ **Sequelize** - ORM to interact with PostgreSQL.
✅ **Jest & Supertest** - Unit and integration testing frameworks.
✅ **Swagger UI** - Interactive API documentation.
✅ **CORS & Helmet** - Security to protect the API.
✅ **Dotenv** - Environment variable management.
✅ **Nodemon** - Automatic reloading in development.
✅ **TablePlus** - Client to visualize PostgreSQL data.
✅ **Colors.js** - Highlights messages in the console.
✅ **Express-Validator** - Middleware for validations.

---

## 🚀 Installation and Setup

### 🔹 1. Clone the repository
```bash
git clone https://github.com/Btojaka/restapi_node_express_ts_server.git
cd restapi_node_express_ts_server
```

### 🔹 2. Install dependencies
```bash
npm install
```

### 🔹 3. Configure environment variables
Create a **`.env`** file in the project root with the following variables:

```
PORT=4000
DATABASE_URL=postgres://user:password@localhost:5432/database_name
```

### 🔹 4. Run the database
If using **Docker**, you can run a PostgreSQL container:

```bash
docker run --name my_postgres -e POSTGRES_USER=user -e POSTGRES_PASSWORD=password -e POSTGRES_DB=database_name -p 5432:5432 -d postgres
```

---

## ▶️ Running the Server

### **🔹 Development Mode**
```bash
npm run dev
```
Runs with `nodemon` and `ts-node`.

### **🔹 Production Mode**
```bash
npm run build
npm start
```
Compiles TypeScript and runs the generated `.js` files in `dist/`.

---

## 📝 API Documentation with Swagger
The API includes **Swagger UI** documentation, accessible after starting the server.

📌 **Access at:** [`http://localhost:4000/docs`](http://localhost:4000/docs)

Example **documented route** in `swagger.ts`:

```typescript
/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Retrieves all products
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of products.
 */
```

---

## 🔥 API Routes
The API handles products with the following routes:

### **🛒 Products**
| Method | Endpoint         | Description                          |
|--------|-----------------|--------------------------------------|
| `GET`  | `/api/products` | Retrieve all products               |
| `POST` | `/api/products` | Create a new product                |
| `PUT`  | `/api/products/:id` | Update a product          |
| `DELETE` | `/api/products/:id` | Delete a product      |

Example **`POST` request to `/api/products`**:
```json
{
  "name": "Sample Product",
  "price": 19.99,
  "description": "This is a test product"
}
```

---

## ✅ Running Tests with Jest
This project includes unit and integration tests with **Jest and Supertest**.

### **Run tests**
```bash
npm test
```

Example **test in `__tests__/server.test.ts`**:
```typescript
import request from "supertest";
import server from "../server";

describe("GET /api/products", () => {
  it("Should return a 200 status code", async () => {
    const res = await request(server).get("/api/products");
    expect(res.status).toBe(200);
  });
});
```

---

🎉 **Thanks for using this API! Feel free to contribute or leave feedback. 🚀**


---


## Español
# 🚀 API REST con Express, TypeScript y PostgreSQL

Este proyecto es una **API REST** construida con **Express.js** y **TypeScript**, diseñada para gestionar productos en una base de datos PostgreSQL.
Incluye autenticación, validaciones, pruebas unitarias con Jest y documentación con Swagger.

---

## 📂 Estructura del Proyecto

```
Btojaka-restapi_node_express_ts_server/
├── jest.config.js         # Configuración de Jest para pruebas
├── package.json          # Dependencias del proyecto
├── tsconfig.json         # Configuración de TypeScript
├── assets/               # Archivos estáticos (logos, imágenes)
└── src/
    ├── index.ts          # Punto de entrada de la API
    ├── router.ts         # Configuración de rutas
    ├── server.ts         # Servidor Express
    ├── __tests__/        # Pruebas unitarias con Jest
    │   └── server.test.ts
    ├── config/
    │   ├── db.ts         # Configuración de la base de datos PostgreSQL con Sequelize
    │   └── swagger.ts    # Documentación de la API con Swagger
    ├── data/
    │   └── index.ts      # Carga de datos inicial
    ├── handlers/
    │   ├── product.ts    # Controlador de productos
    │   └── __tests__/     # Pruebas unitarias para handlers
    │       └── product.test.ts
    ├── middlewares/
    │   └── index.ts      # Middleware para validaciones, autenticación, etc.
    └── models/
        └── Product.model.ts  # Modelo de datos de productos con Sequelize
```

---

## 🛠️ Tecnologías Utilizadas

✅ **Node.js** - Entorno de ejecución de JavaScript.
✅ **Express.js** - Framework para construir APIs REST.
✅ **TypeScript** -
✅ **Sequelize** - ORM para interactuar con PostgreSQL.
✅ **Jest & Supertest** - Frameworks para testing unitario y de integración.
✅ **Swagger UI** - Documentación interactiva de la API.
✅ **CORS & Helmet** - Seguridad para proteger la API.
✅ **Dotenv** - Manejo de variables de entorno.
✅ **Nodemon** - Recarga automática en desarrollo.
✅ **TablePlus** - Cliente para visualizar datos en PostgreSQL.
✅ **Colors.js** - Resalta mensajes en la consola.
✅ **Express-Validator** - Middleware para validaciones.

---

## 🚀 Instalación y Configuración

### 🔹 1. Clonar el repositorio
```bash
git clone https://github.com/Btojaka/restapi_node_express_ts_server.git
cd restapi_node_express_ts_server
```

### 🔹 2. Instalar dependencias
```bash
npm install
```

### 🔹 3. Configurar variables de entorno
Crea un archivo **`.env`** en la raíz del proyecto con las siguientes variables:

```
PORT=4000
DATABASE_URL=postgres://usuario:contraseña@localhost:5432/nombre_de_la_base_de_datos
```

### 🔹 4. Ejecutar la base de datos
Si estás usando **Docker**, puedes ejecutar un contenedor de PostgreSQL:

```bash
docker run --name my_postgres -e POSTGRES_USER=usuario -e POSTGRES_PASSWORD=contraseña -e POSTGRES_DB=nombre_de_la_base_de_datos -p 5432:5432 -d postgres
```

---

## ▶️ Ejecutar el Servidor

### **🔹 Modo Desarrollo**
```bash
npm run dev
```
Se ejecutará con `nodemon` y `ts-node`.

### **🔹 Modo Producción**
```bash
npm run build
npm start
```
Esto compilará TypeScript y ejecutará los archivos `.js` generados en `dist/`.

---

## 📝 Documentación con Swagger
La API incluye documentación en **Swagger UI**, accesible después de iniciar el servidor.

📌 **Accede en:** [`http://localhost:4000/docs`](http://localhost:4000/docs)

Ejemplo de **ruta documentada** en `swagger.ts`:

```typescript
/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Obtiene todos los productos
 *     responses:
 *       200:
 *         description: Lista de productos obtenida correctamente.
 */
```

---

## 🔥 Rutas de la API
La API maneja productos y tiene las siguientes rutas disponibles:

### **🛒 Productos**
| Método | Endpoint         | Descripción                          |
|--------|-----------------|--------------------------------------|
| `GET`  | `/api/products` | Obtener todos los productos         |
| `POST` | `/api/products` | Crear un nuevo producto             |
| `PUT`  | `/api/products/:id` | Actualizar un producto       |
| `DELETE` | `/api/products/:id` | Eliminar un producto      |

Ejemplo de **petición `POST` a `/api/products`**:
```json
{
  "name": "Producto de ejemplo",
  "price": 19.99,
  "description": "Este es un producto de prueba"
}
```

---

## ✅ Ejecutar Pruebas con Jest
Este proyecto incluye pruebas unitarias y de integración con **Jest y Supertest**.

### **Ejecutar pruebas**
```bash
npm test
```

Ejemplo de **prueba en `__tests__/server.test.ts`**:
```typescript
import request from "supertest";
import server from "../server";

describe("GET /api/products", () => {
  it("Debe devolver un código 200", async () => {
    const res = await request(server).get("/api/products");
    expect(res.status).toBe(200);
  });
});
```

---

🎉 **¡Gracias por usar esta API! No dudes en contribuir o dejar tu feedback. 🚀**

