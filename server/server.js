import express from "express";
import cors from "cors";
import { configDotenv } from "dotenv";
import cookieParser from "cookie-parser";
import sequelize from "./config/database.js";
import fileUpload from "express-fileupload";
import { fileURLToPath } from 'url';
import path from 'path';
import morgan from "morgan";
import v1CategoriesRoutes from "./v1/routes/categorias.routes.js";
import v1ProductsRoutes from "./v1/routes/productos.routes.js";
import v1PromtionsRoutes from "./v1/routes/promociones.routes.js";
import v1PPRoutes from "./v1/routes/producto_promocion.routes.js";
import v1CPRoutes from "./v1/routes/categoria_promocion.routes.js";
import v1RolesRoutes from "./v1/routes/roles.routes.js";
import v1EmpleadosRoutes from "./v1/routes/empleados.routes.js";
import v1AuthRoutes from "./v1/routes/auth.routes.js";
import v1AffiliatesRoutes from "./v1/routes/afiliados.routes.js";
import v1UsersRoutes from "./v1/routes/usuarios.routes.js";
import v1SalesRoutes from "./v1/routes/ventas.routes.js";
import v1saleDetailsRoutes from "./v1/routes/detallesVenta.routes.js";

configDotenv();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = express();

//
const v1RoutesList = [
    v1AuthRoutes, v1CategoriesRoutes, v1ProductsRoutes, v1PromtionsRoutes, v1PPRoutes, v1CPRoutes, v1RolesRoutes, v1EmpleadosRoutes,
    v1AffiliatesRoutes, v1UsersRoutes, v1SalesRoutes, v1saleDetailsRoutes
]
export const revokedTokens = []

server.use(express.json());
server.use(morgan('dev'));
server.use(express.urlencoded({ extended: true }));
server.use(cors({ credentials: true, origin: "*" }));
server.use(cookieParser());
server.use(fileUpload());
server.use('/uploads', express.static(path.join(__dirname, 'uploads')));
//para ahorrar lineas XD
v1RoutesList.forEach(route => {
    server.use("/api/v1", route)
});

server.use(express.static(path.join(__dirname, "public")))
server.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"))
})

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`The back is running on port: ${port}`)
})

try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}