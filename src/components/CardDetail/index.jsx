import { useEffect, useState, useContext } from "react";
import { Navigate, useParams } from "react-router-dom";

import db from "../../../db/firebase-config";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import ItemCount from "../itemCount/item";
import { CartConstext } from "../../context/CartContex";

const CardDetail = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState({});
  const [quenty, setQuenty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [productoNoEncontrado, setProductoNoEncontrado] = useState(false);
  const productosRef = collection(db, "productos");
  const { addItem } = useContext(CartConstext);
  const getProductos = async () => {
    const docRef = doc(db, "productos", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setProducto(docSnap.data());
      setLoading(false);
    } else {
      setProductoNoEncontrado(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (quenty) {
        handleAddToCart();
      setQuenty(0);
    } else {
      getProductos();
    }
  }, [quenty]);
  const handleAddToCart = () => {
    addItem({ item: producto, quenty });
  };
  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (productoNoEncontrado) {
    return <h1>Producto no encontrado</h1>;
  }

  return (
    <>
      <div className="container products-wrapper">
        <div className="product-detail">
          <div className="row">
            <div className="col-12 col-lg-6">
              <img
                src={producto.image}
                alt="product image"
                className="justify-content-center  product-detail-img mt-4"
              />
              <p className="product-detail-price">$ {producto.price}</p>
              <ItemCount id={producto.id} quenty={setQuenty} />
            </div>
            <div className="col-12 col-lg-6">
              <article className="product-detail-info">
                <h3 className="product-detail-title">{producto.title} </h3>

                <ul className="actions-list"></ul>
                <hr />
                <p className="product-detail-description">
                  {producto.description}
                </p>
              </article>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardDetail;
