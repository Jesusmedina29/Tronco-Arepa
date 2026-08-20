# Tronco E Arepa

Aplicación web para la gestión y venta de comidas rápidas. El proyecto está dividido en un frontend estático y una API REST con persistencia en MySQL.

## Arquitectura

- **Frontend:** HTML, CSS y JavaScript estático servido por Nginx.
- **Backend:** Spring Boot, Spring Web, Spring Data JPA y Maven.
- **Base de datos:** MySQL 8.4.
- **Orquestación:** Docker Compose.

Los servicios se ejecutan en la misma red de Docker, mientras que el navegador consume la API mediante los puertos publicados en el equipo local.

## Requisitos

- Docker Desktop con Docker Compose.
- Git, para clonar el repositorio.
- Opcional para desarrollo del backend sin Docker: JDK 21 y Maven Wrapper.

## Ejecución con Docker

Desde el directorio raíz del proyecto:

```bash
docker compose up --build
```

Para ejecutar los servicios en segundo plano:

```bash
docker compose up --build -d
```

Para detenerlos:

```bash
docker compose down
```

La base de datos utiliza el volumen `mysql_data`, por lo que sus datos se conservan al detener los contenedores. Para eliminar también el volumen:

```bash
docker compose down -v
```

## URLs y puertos

| Servicio | URL o puerto local | Descripción |
| --- | --- | --- |
| Frontend | http://localhost:8080 | Aplicación web cliente |
| API | http://localhost:8081 | API REST de Spring Boot |
| MySQL | localhost:3307 | Acceso externo a la base de datos |

El frontend está configurado para consumir la API en `http://localhost:8081`.

## Funcionalidades

- Consulta del menú de productos.
- Carrito de compras en el navegador.
- Registro y consulta de clientes.
- Inicio de sesión de clientes.
- Inicio de sesión para administradores.
- Administración de productos, pedidos, clientes e inventario desde el panel.
- Creación y consulta de pedidos y sus detalles.
- Persistencia de la información en MySQL.

## API REST

La API requiere el encabezado `X-Frontend-App: tronco-arepa` en las solicitudes protegidas por el filtro de acceso.

### Autenticación

| Método | Ruta | Descripción |
| --- | --- | --- |
| `POST` | `/api/auth/login-admin` | Inicia sesión como administrador. Recibe `correo` y `password`. |

### Clientes

| Método | Ruta | Descripción |
| --- | --- | --- |
| `GET` | `/api/clientes` | Lista los clientes. |
| `GET` | `/api/clientes/{id}` | Consulta un cliente. |
| `POST` | `/api/clientes` | Crea un cliente. |
| `PUT` | `/api/clientes/{id}` | Actualiza un cliente. |
| `DELETE` | `/api/clientes/{id}` | Elimina un cliente. |

### Productos

| Método | Ruta | Descripción |
| --- | --- | --- |
| `GET` | `/api/productos` | Lista los productos. |
| `GET` | `/api/productos/{id}` | Consulta un producto. |
| `POST` | `/api/productos` | Crea un producto. |
| `PUT` | `/api/productos/{id}` | Actualiza un producto. |
| `DELETE` | `/api/productos/{id}` | Elimina un producto. |

### Pedidos y detalles

| Método | Ruta | Descripción |
| --- | --- | --- |
| `GET` | `/api/pedidos` | Lista los pedidos. |
| `GET` | `/api/pedidos/{id}` | Consulta un pedido. |
| `POST` | `/api/pedidos` | Crea un pedido. |
| `PUT` | `/api/pedidos/{id}` | Actualiza un pedido. |
| `DELETE` | `/api/pedidos/{id}` | Elimina un pedido. |
| `GET` | `/api/detalle-pedidos` | Lista los detalles de pedido. |
| `GET` | `/api/detalle-pedidos/{id}` | Consulta un detalle. |
| `GET` | `/api/detalle-pedidos/pedido/{pedidoId}` | Lista los detalles de un pedido. |
| `POST` | `/api/detalle-pedidos` | Crea un detalle de pedido. |
| `DELETE` | `/api/detalle-pedidos/{id}` | Elimina un detalle. |

## Estructura del proyecto

```text
.
├── docker-compose.yml
├── tronco-arepa-backend/
│   ├── Dockerfile
│   ├── pom.xml
│   └── src/
└── tronco-arepa-frontend/
    ├── Dockerfile
    ├── index.html
    ├── productos.html
    ├── login.html
    ├── admin-login.html
    ├── admin.html
    ├── css/
    └── js/
```

## Desarrollo del backend sin Docker

El backend puede ejecutarse usando el Maven Wrapper desde su directorio:

```bash
cd tronco-arepa-backend
./mvnw spring-boot:run
```

En Windows:

```powershell
cd tronco-arepa-backend
.\mvnw.cmd spring-boot:run
```

En este modo se necesita una instancia MySQL disponible y las variables `SPRING_DATASOURCE_URL`, `SPRING_DATASOURCE_USERNAME`, `SPRING_DATASOURCE_PASSWORD` y `PORT` pueden utilizarse para configurar la conexión.

## Pruebas

Desde `tronco-arepa-backend`:

```bash
./mvnw test
```

En Windows:

```powershell
.\mvnw.cmd test
```

## Configuración de base de datos

La configuración incluida en Docker Compose es para desarrollo local:

- Base de datos: `proyecto`
- Usuario: `troncoarepa`
- Contraseña: `troncoarepa`
- Contraseña root: `root`

Estas credenciales deben cambiarse antes de utilizar la aplicación en un entorno de producción.