import { Router } from "express";
import cartController from "../controllers/cartController.js";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const router = Router();
const cartCtrl = new cartController(`${__dirname}/Carritos.json`);

router.get("/:cid", async (req, res) => {
  // Listar los productos del carrito
  const cid = req.params.cid;
  try {
    const carrito = await cartCtrl.getCarritoById(cid);
    if (!carrito) {
      return res.status(404).send({ error: "Carrito no encontrado" });
    }
    res.status(200).send(carrito.products);
  } catch (error) {
    res.status(500).send({ error: "Error al obtener el carrito" });
  }
});

router.post("/", async (req, res) => {
  // Nuevo carrito
  try {
    await cartCtrl.createCart();
    res.status(201).send("Carrito creado correctamente");
  } catch (error) {
    res.status(500).send({ error: "Error al crear el carrito y la re concha de mi madre" });
  }
});

router.post("/:cid/products/:pid", async (req, res) => {
  // Agregar producto al carrito
  const cid = req.params.cid;
  const pid = req.params.pid;
  try {
    const mensaje = await cartCtrl.addProduct(pid, cid);
    res.status(200).send({ message: mensaje });
  } catch (error) {
    res.status(500).send({ error: "Error al agregar el producto al carrito" });
  }
});

export default router;
