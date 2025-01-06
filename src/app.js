import express from "express";
import fs from "fs";
import cartRouter from "./routes/cartRouter.js";
import prodcutsRouter from "./routes/prodcutsRouter.js";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const HOST = "127.0.0.1";
const PORT = 8080;

app.listen(PORT, HOST, (req, res) => console.log(`http://${HOST}:${PORT}`));

app.use("/redireccion",express.static("./public"))

app.use("/api/products", prodcutsRouter);
app.use("/api/carts", cartRouter);
