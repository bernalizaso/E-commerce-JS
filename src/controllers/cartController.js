import fs from "fs";
import productController from "./productsController";

export default class cartController {
  constructor(file) {
    this.file = file;
    this.carritos = [];
  }

  async createCart() {
    const carrito = {
      id: await getId(),
      products: [],
    };

    const carritos = await this.getCarritos();

    carritos.push(carrito);

    try {
      await fs.promises.writeFile(
        this.file,
        JSON.stringify(carritos, null, "\t")
      );
      return "El carrito se ha creado correctamente";
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async addProduct(productId, id) {
    try {
      let busquedaCarritos = await fs.promises.readFile(this.file, "utf-8");
      let array = await JSON.parse(busquedaCarritos);
      let carritoencontrado = array.find((carrito) => carrito.id === id);

      let buscarProducto = await fs.promises.readFile(
        "/productos.json",
        "utf-8"
      );

      let arrayProductos = await JSON.parse(buscarProducto);

      let productoEncontrado = arrayProductos.find(
        (producto) => producto.id === productId
      );

      carritoencontrado.products.push(productoEncontrado);

      await fs.promises.writeFile(
        this.file,
        JSON.stringify(carritos, null, "\t")
      );

      return "Producto añadido exitosamen3";
    } catch (error) {
      console.error(error.message);
      return "Error al encontrar id del carrito o del producto";
    }
  }

  async getId() {
    const carritos = await this.getCarrito();
    if (carritos.length > 0) {
      return parseInt(carritos[carritos.length - 1].id + 1);
    }
    return 1;
  }

  async getCarrito() {
    try {
      const carritos = await fs.promises.readFile(this.carritos, "utf8");
      return JSON.parse(carritos);
    } catch (error) {
      return "No se pudo obtener los productos del carrito";
    }
  }
};


