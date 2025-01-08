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
    const limit = parseInt(req.query.limit) || 10;
    const products = await pm.getProducts();
    const limitedProducts = products.slice(0, limit);
    res.status(200).json(limitedProducts);
  } catch (error) {
    res.status(500).send("Error al obtener los productos");
  }
});

router.get("/:pid", async (req, res) => {
  //solo el producto solicitado

  const pid = req.params.pid;
  try {
    const productoId = await pm.getProductById(pid);
    await console.log(productoId);
    await res.send(productoId);
  } catch (error) {
    res.status(500).send({ error: "Error al obtener el producto" });
  }
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

router.put("/:pid", async (req, res) => {
  //cambiar los datos del producto solicitado, pero sin cambiar id
  const pid = req.params.pid;
  const { title, description, code, price, stock, category } = req.body;
  if (!title || !description || !code || !price || !stock || !category) {
    return res
      .status(400)
      .send({ error: "Faltan campos para editar el producto" });
  }
  try {
    await pm.editProduct(pid, {
      title,
      description,
      code,
      price,
      stock,
      category,
    });
    res.status(200).send({ message: "Producto editado correctamente" });
  } catch (error) {
    res.status(500).send("Error al editar el producto");
  }
});

router.delete("/:pid", async (req, res) => {
  //borrar producto solicitado
  const pid = req.params.pid;

  res.send(await pm.deleteProduct(pid));
});

export default router;
