import express from "express";
import http from "http";
import { Server } from "socket.io";
//database connection
import connect from "./app/connection/mongoose.js";
//load env variables
process.loadEnvFile();

// Inicializar express
const app = express();

// Conectar a la base de datos
connect();

const server = http.createServer(app);
const io = new Server(server);

// Middleware para CORS y compartir io con las rutas
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Methods",
        "GET,HEAD,OPTIONS,POST,PUT,DELETE"
    );
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization, auth-token"
    );
    req.io = io; // Agregar socket.io al request
    next();
});

// Body parser para datos JSON
app.use(express.json());

// Conexión de WebSocket
io.on("connection", (socket) => {
    console.log("user connected");

    socket.on("disconnect", () => {
        console.log("user disconnected");
    });
});

// Rutas
import AuthRoutes from "./app/routes/authRoute.js";
import UserRoutes from "./app/routes/userRoute.js";
import GymEntryRoutes from "./app/routes/gymEntryRoute.js";
import MembershipRoutes from "./app/routes/memberShipRoute.js";

app.use("/api/v1", AuthRoutes, UserRoutes, GymEntryRoutes, MembershipRoutes);

// Iniciar el servidor HTTP
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});