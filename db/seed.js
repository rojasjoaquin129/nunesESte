import { collection, addDoc } from "firebase/firestore";
import db from "./firebase-config.js";
import productos from "../products.js";

const productosRef = collection(db, "productos");

const promises = productos.map((producto) => addDoc(productosRef, producto));

Promise.all(promises).then(() => {
  process.exit(0);
});
