import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import CardDetail from "./components/CardDetail";
import Navbar from "./components/Navbar";
import ItemListContainer from "./components/ItemListContainer";
import db from "../db/firebase-config";
import { getDocs, collection } from "firebase/firestore";
import Cart from "./components/cart/cart";
import { CartProvider } from "./context/CartContex";

function App() {
  const [productos, setProductos] = useState([]);
  const productosRef = collection(db, "productos");

  const getProductos = async () => {
    const querySnapshot = await getDocs(productosRef);
    const docs = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setProductos(docs);
  };

  useEffect(() => {
    getProductos();
  }, []);

  return (
    <div className="App">
      <CartProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route
            path="/home"
            element={<ItemListContainer productos={productos} />}
          />
          <Route path="/products/:id" element={<CardDetail />} />
          <Route
            path="/category/:genre"
            element={<ItemListContainer productos={productos} />}
          />
          <Route path="/cart" element={<Cart />} />
          <Route path="/404" element={<h2>404 Not Found</h2>} />
        </Routes>
      </CartProvider>
    </div>
  );
}

export default App;
