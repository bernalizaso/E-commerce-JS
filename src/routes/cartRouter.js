import { error } from "console";
import { Router } from "express";

const router = Router();

router.get("/:cid", (req, res) => {
  /*listar los productos del carrito*/
});

router.post("/", (req, res) => {
  /*Nuevo carrito, con la siguiente estructura:
Id:Number/String (A tu elección, de igual manera como con los productos, debes asegurar que nunca se dupliquen los ids y que este se autogenere).
products: Array que contendrá objetos que representen cada producto
*/
});

router.post("/:cid/products/:pid", (req, res) => {
/*deberá agregar el producto al arreglo “products” del carrito seleccionado, agregándose como un objeto bajo el siguiente formato:
product: SÓLO DEBE CONTENER EL ID DEL PRODUCTO (Es crucial que no agregues el producto completo)
quantity: debe contener el número de ejemplares de dicho producto. El producto, de momento, se agregará de uno en uno.
*/
});

export default router;