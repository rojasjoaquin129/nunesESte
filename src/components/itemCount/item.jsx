import { Button, IconButton } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { useState,useContext } from "react";

import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";
import { AddShoppingCart } from "@mui/icons-material";
import { CartConstext } from "../../context/CartContex";
const ItemCount = ({ id, quenty }) => {
  //DECLARACION DE VARIABLES
  const { isInCart } = useContext(CartConstext);
  const [stock, setStock] = useState(10);
  const [counter, setCounter] = useState(0);
  const cantidad = () => quenty(counter);

  //CONFIGURACION DE TOAST
  const Toast = Swal.mixin({
    toast: true,
    position: "center-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: false,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  //FUNCIONES QUE ESCUCHAN EVENTO CLICK DE  LOS BOTONES
  const minusCounter = () => {
    if (counter > 0) {
      setCounter(counter - 1);
    } else {
      handleClick("No se puede elegir menos de 0 ", true);
    }
  };
  const plusCounter = () => {
    if (stock > counter) {
      setCounter(counter + 1);
    } else {
      handleClick("Se alcanzo el limite de stock", true);
    }
  };
  const addCart = () => {
    if (counter === 0) {
      handleClick("Ustede no puede elegir 0", true);
    } else if (isInCart(id)) {
        handleClick("Usted ya tiene este producto en su carrito",true);
        setCounter(0);
    }
    else{
        handleClick("Producto agregado con exito al carrito", false);
        quenty(counter);
    }
  };

  //---------FUNCION MENSAJE -------------
  const handleClick = (message, error) => {
    if (error) {
      Toast.fire({
        icon: "error",
        title: message,
      });
    } else {
      Toast.fire({
        icon: "success",
        title: message,
      });
    }
  };

  return (
    <div className="row justify-content-center mb-4">
      <div>
        <IconButton
          color="primary"
          onClick={minusCounter}
          aria-label="add to shopping cart"
        >
          <RemoveIcon />
        </IconButton>
        <span> {counter} </span>
        <IconButton
          color="primary"
          onClick={plusCounter}
          aria-label="add to shopping cart"
        >
          <AddIcon />
        </IconButton>
      </div>
      <div>
        <Button
          onClick={addCart}
          variant="outlined"
          endIcon={<AddShoppingCart />}
        >
          Agregar al carrito
        </Button>
      </div>
    </div>
  );
};
export default ItemCount;
