import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
//database connection
import connect from "./app/connection/mongoose.js";
//load env variables
process.loadEnvFile();

// Inicializar express
const app = express();

// Conectar a la base de datos
connect();

const server = http.createServer(app);
const io = new Server(server,{
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// Configurar opciones de CORS
const corsOptions = {
    origin: '*',
    credentials: true,
    methods: "GET,HEAD,OPTIONS,POST,PUT,DELETE",
    allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept, Authorization, auth-token"
};

// Usar el middleware de cors
app.use(cors(corsOptions));

// Middleware para agregar socket.io al request
app.use(function (req, res, next) {
    req.io = io; // Agregar socket.io al request
    next();
});

app.use('/uploads', express.static('uploads'));

// Body parser para datos JSON
app.use(express.json());

// Conexión de WebSocket
io.on("connection", (socket) => {
    console.log("user connected");

    // Aquí emites el evento de gymStatusUpdate u otros
    socket.emit('gymStatusUpdate');

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