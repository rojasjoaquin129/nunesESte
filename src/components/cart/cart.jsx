import React, { useContext, useEffect, useState } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { NavLink } from "react-router-dom";
import SendIcon from "@mui/icons-material/Send";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import "./cart.css";
import Swal from "sweetalert2";
import { CartConstext } from "../../context/CartContex";
const Cart = () => {
  const db = getFirestore();
  const ordersCollection = collection(db, "orders");
  const { items, removeItem, clear } = useContext(CartConstext);
  const [open, setOpen] = useState(false);
  const [total, setTotal] = useState(0);
  const [buyer, setBuyer] = useState({
    name: "",
    email: "",
    // password: "",
  });
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
  useEffect(() => {
    calcularTotal();
  }, [items]);
  const valitacion = () => {
    const { name, email, password } = buyer;
    if (name === "" || email === "" || password === "") {
      Swal.fire({
        title: "ERROR!",
        icon: "error",
      });
    }
  };

  const handleChange = (prop) => (event) => {
    setBuyer({ ...buyer, [prop]: event.target.value });
  };

  let isValidEmail = React.useMemo(
    () => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(buyer.email),
    [buyer.email]
  );
  let isValidEspacio = React.useMemo(
    () => /[A-Za-z]$/.test(buyer.name),
    [buyer.name]
  );
  // let isValidPassword = React.useMemo(
  //   () => /[A-Za-z]$/.test(buyer.password),
  //   [buyer.password]
  // );
  const calcularTotal = () => {
    let totalmedio = 0;
    items.forEach((element) => {
      let subtotal = element.item.price * element.quenty;
      totalmedio = totalmedio + subtotal;
    });
    setTotal(totalmedio);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseUno = () => {
    if (isValidEmail && isValidEspacio && isValidPassword) {
      const order = {
        buyer,
        items: items,
        total,
      };
      addDoc(ordersCollection, order).then(({ id }) => {
        Swal.fire({
          title: "USTED COMPRO CON EXITO",
          text: "SU TIKET =====> " + id,
          icon: "success",
        });
        clear();
        setOpen(false);
      });
    } else {
      setOpen(false);
      Swal.fire({
        title: "ERROR!",
        text: "no puede comprar si no rellena correctamente los casilleros",
        icon: "error",
      });
    }
  };

  const messageDelete = () => {
    Toast.fire({
      icon: "info",
      title: "Borro un producto de su carrito",
    });
  };
  const deleteItem = (id) => {
    removeItem(id, items);
  };

  if (items.length === 0) {
    return (
      <div className="container mt-5">
        <div className="m-2">
          <h1>Usted no tiene nada en Su Carrito </h1>
          <NavLink to="/" className="text">
            <Button variant="contained" endIcon={<SendIcon />}>
              Ir a comprar
            </Button>
          </NavLink>
        </div>
      </div>
    );
  }
  return (
    <div className="container mt-5">
      <h2 className="mb-3">CARRITO DE COMPRAS</h2>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Imagen</TableCell>
              <TableCell align="center">Nombre</TableCell>
              <TableCell align="center">Precio</TableCell>
              <TableCell align="center">Cantidad</TableCell>
              <TableCell align="center">Subtotal</TableCell>
              <TableCell align="center">Eliminar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">
                  <img src={row.item.image} alt="" className="img" />
                </TableCell>
                <TableCell align="center">{row.item.title}</TableCell>
                <TableCell align="center">{row.item.price}</TableCell>
                <TableCell align="center">{row.quenty}</TableCell>
                <TableCell align="center">
                  {row.quenty * row.item.price}
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    color="error"
                    size="large"
                    onClick={() => {
                      deleteItem(row.item.id);
                      messageDelete();
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}

            <TableRow>
              <TableCell rowSpan={4} />
              <TableCell colSpan={3} align="right">
                <b>Total : {total}</b>
              </TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <div className="d-flex justify-content-around mt-3">
        <NavLink to="/" className="text">
          <Button variant="contained"> Segir comprando </Button>
        </NavLink>
        <Button variant="contained" color="success" onClick={handleClickOpen}>
          Terminar Mi compra
        </Button>
      </div>
      <form>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>
            <b>Subscribe</b>
          </DialogTitle>
          <DialogContent>
            <DialogContentText className="margin">
              Para Comprar usted tiene q registrarse .
            </DialogContentText>

            <TextField
              error={!isValidEspacio}
              margin="dense"
              label="nombre"
              type="text"
              variant="outlined"
              fullWidth
              onChange={handleChange("name")}
            />
            <TextField
              error={!isValidEmail && buyer.email !== 0}
              margin="dense"
              label="Email "
              type="email"
              fullWidth
              variant="outlined"
              onChange={handleChange("email")}
            />
            {/* <TextField
              error={!isValidPassword}
              margin="dense"
              label="Password "
              type="password"
              fullWidth
              variant="outlined"
              onChange={handleChange("password")}
            /> */}
          </DialogContent>
          <DialogActions>
            <Button variant="contained" color="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              variant="contained"
              color="success"
              onClick={handleCloseUno}
            >
              Compar
            </Button>
          </DialogActions>
        </Dialog>
      </form>
    </div>
  );
};

export default Cart;
