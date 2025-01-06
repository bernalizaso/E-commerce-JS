import { error } from "console";
import { Router } from "express";
import productController from "../controllers/productsController.js";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const router = Router();

const pm = new productController(`${__dirname}/Productos.json`);

router.get("/", async (req, res) => {
  //todos los productos de la base, con limite en ?limit
  try {
    const products = await pm.getProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).send("Error al obtener los productos");
  }
});

router.get("/:pid", (req, res) => {
  //solo el producto solicitado
});

router.post("/", async (req, res) => {
  const { title, description, code, price, stock, category } = req.body;
  if (!title || !description || !code || !price || !stock || !category) {
    return res
      .status(400)
      .send({ error: "Faltan campos para crear el producto" });
  }
  try {
    await pm.createProduct({
      title,
      description,
      code,
      price,
      stock,
      category,
    });
    res.status(201).send({ message: "Producto creado correctamente" });
  } catch (error) {
    res.status(500).send("Error al crear el producto");
  }
});

router.put("/:pid", (req, res) => {
  //cambiar los datos del producto solicitado, pero sin cambiar id
});

router.delete("/:pid", (req, res) => {
  //borrar producto solicitado
});

export default router;
