import express from "express";
import http from "http";
import { Server } from "socket.io";
//database connection
import connect from "./app/connection/mongoose.js";
//load env variables
process.loadEnvFile();
//initialize express
const app = express();
//connect to database
connect();


const server = http.createServer(app);

const io = new Server(server)

//midelewares
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
    req.io = io;
    next();
});
//body parser
app.use(express.json());

//websocket connection
io.on("connection", (socket) => {
    console.log("a user connected");
    socket.on("disconnect", () => {
        console.log("user disconnected");
    });
});

//routes
//auth routes
import AuthRoutes from "./app/routes/authRoute.js";
// import UserRoutes from "./routes/UserRoutes.js";
// import ClientRoutes from "./routes/ClientRoutes.js";

app.use("/api/v1", AuthRoutes);


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

