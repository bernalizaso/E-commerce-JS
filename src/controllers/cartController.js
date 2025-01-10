import fs from "fs";
import productController from "./productsController.js";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { error } from "console";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rutaProducts = join(__dirname, "../routes/", "Productos.json");

export default class cartController {
  constructor(file) {
    this.file = file;
    this.carritos = [];
  }

  async createCart() {
    const carrito = {
      id: await this.getId(),
      products: [],
    };

    const carts = await this.getCarritos();

    carts.push(carrito);

    try {
      await fs.promises.writeFile(this.file, JSON.stringify(carts, null, "\t"));
      return "El carrito se ha creado correctamente";
    } catch (error) {
      console.error(error);
      //return [];
    }
  }

  async getCarritoById(id) {
    try {
      const carritos = await this.getCarritos();
      const carrito = carritos.find((carrito) => carrito.id === parseInt(id));
      if (!carrito) {
        return { error: "Carrito no encontrado" };
      }
      return carrito;
    } catch (error) {
      console.error(error.message);
      return { error: "Error al obtener el carrito" };
    }
  }
  async addProduct(productId, id) {
    try {
      let busquedaCarritos = await fs.promises.readFile(this.file, "utf-8");
      let array = await JSON.parse(busquedaCarritos);
      let carritoencontrado = array.find((carrito) => carrito.id == id);

      let buscarProducto = await fs.promises.readFile(rutaProducts, "utf-8");

      let arrayProductos = await JSON.parse(buscarProducto);
      console.log(arrayProductos);
      let productoEncontrado = arrayProductos.find(
        (producto) => producto.id == productId
      );

      if (!productoEncontrado) throw new Error("No se encontro el producto");
      console.log(productoEncontrado);

      let productoEnCarrito = carritoencontrado.products.find(
        (producto) => producto.id == productId
      );

      if (productoEnCarrito) {
        productoEnCarrito.quantity += 1;
      } else {
        carritoencontrado.products.push({ id: productId, quantity: 1 });
      }

      await fs.promises.writeFile(this.file, JSON.stringify(array, null, "\t"));

      return "Producto añadido exitosamen3";
    } catch (error) {
      console.error(error.message);
      return "Error al encontrar id del carrito o del producto";
    }
  }

  async getCarritos() {
    try {
      const carts = await fs.promises.readFile(this.file, "utf8");
      return JSON.parse(carts);
    } catch (error) {
      console.error(error);
      return [];
    }
  }
  async getId() {
    const carts = await this.getCarritos();
    if (carts.length > 0) {
      return parseInt(carts[carts.length - 1].id + 1);
    }
    return 1;
  }
}
