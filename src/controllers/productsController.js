import fs from "fs";

export default class productController {
  constructor(file) {
    this.file = file;
    this.productos = [];
  }

  ensureFileExists() {
    if (!fs.existsSync(this.file)) {
      fs.writeFileSync(this.file, "[]", "utf8");
      console.log(`Archivo ${this.file} creado correctamente.`);
    }
  }



  async createProduct(product) {
    const nuevoProducto = {
      id: await this.getId(),
      title: product.title ?? "sin titulo",
      description: product.description ?? "sin descripcion",
      code: product.code ?? "sin codigo",
      price: product.price ?? "sin precio",
      stock: product.stock ?? "sin stock",
      category: product.category ?? "sin categoria",
      Status: true,
    };

    const products = await this.getProducts();

    products.push(nuevoProducto);

    try {
      await fs.promises.writeFile(
        this.file,
        JSON.stringify(products, null, "\t")
      );
      return "Producto creado correctamente";
    } catch (error) {
      console.error("Error al crear producto", error);
    }
  }

  async getProducts() {
    try {
      const products = await fs.promises.readFile(this.file, "utf-8");
      return JSON.parse(products);
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async getId() {
    const products = await this.getProducts();

    if (products.length > 0) {
      return parseInt(products[products.length - 1].id + 1);
    }

    return 1;
  }

  async deleteProduct(id) {
    const products = await this.getProducts();
    const initialLenght = products.length;
    const newProducts = products.filter((product) => product.id !== parseInt(id));
    const finalLenght = newProducts.length;

    try {
      if (finalLenght == initialLenght) {
        throw new Error(`No se pudo eliminaral el producto ${id}`);
      }
      await fs.promises.writeFile(
        this.file,
        JSON.stringify(newProducts, null, "\t")
      );
      return `El producto ${id} fue eliminado correctamente`;
    } catch (error) {
      console.error(error);
      return { message: "Error al eliminar usuario" };
    }
  }

  async editProduct(id, product) {
    const products = await this.getProducts();
    let editedProduct = {};

    for (let key in products) {
      if (products[key].id == id) {
        products[key].title = product.title
          ? product.title
          : products[key].title;
          products[key].description = product.description
            ? product.description
            : products[key].description;
          products[key].code = product.code
            ? product.code
            : products[key].code;
          products[key].price = product.price
            ? product.price
            : products[key].price;
          products[key].stock = product.stock
            ? product.stock
            : products[key].stock;
          products[key].category = product.category
            ? product.category
            : products[key].category;
          products[key].status = product.status
            ? product.status
            : products[key].status;
            editedProduct = products[key];
            console.log(editedProduct)
          }}
      try {
        await fs.promises.writeFile(
          this.file,
          JSON.stringify(products, null, "\t")
        );
        return editedProduct;
      } catch (error) {
        console.error(error);
        return { message: "Error al actualizar producto" };
      }
    
  }

  async getProductById(id) {
    try {
      this.productos = await fs.promises.readFile(this.file, "utf-8");
      let array = await JSON.parse(this.productos);
      console.log(array)
      let productoParseado = array.find((producto) => producto.id === parseInt(id));
      console.log(productoParseado)
      return productoParseado
    } catch (error) {
      console.error(error.message);
      return "Error al encontrar id del producto";
    }
  }
};

