import Card from "../Card";
import { Grid } from "@mui/material";
import styles from "./itemList.module.css";
import { useParams } from "react-router-dom";

const ProductList = ({ productos }) => {
  const { genre } = useParams();
  const productosFiltrados = genre
    ? productos.filter((producto) =>
        producto.genre.some((genero) => genero === genre)
      )
    : productos;
  return (
    <div className="container mt-5">
      <h1 className="text-center">
        {genre ? `Lista Filtrada de Productos ${genre}` : "Lista de Libros"}
      </h1>
      <div className="products-wrapper">
        <div className="row">
          {productosFiltrados.map((producto) => (
            <Card key={producto.id} producto={producto} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default ProductList;
