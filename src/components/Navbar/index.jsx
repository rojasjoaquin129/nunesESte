import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { Badge, Drawer } from "@mui/material";
import NavListDrawer from "./NavListDrawer";
import CartWidget from "../CartWidget";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./NavbarStyle";
import "./navbar.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { CartConstext } from "../../context/CartContex";
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(0);
  const [invisible, setinvisible] = useState(false);
  const { items } = React.useContext(CartConstext);

  useEffect(() => {
    if (items.length > 0) {
      setinvisible(false);
      setCount(items.length);
    } else {
      setinvisible(true);
      setCount(0);
    }
  }, [items]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <ThemeProvider theme={theme}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              color="inherit"
              size="large"
              onClick={() => setOpen(true)}
            >
              <MenuIcon />
              <Typography variant="h6">Categoria</Typography>
            </IconButton>
            <Link
              to="/"
              className={({ isActive }) => (isActive ? "activeClass" : "datos")}
            >
              <IconButton color="inherit" size="large">
                <Typography variant="h6" className="">
                  Home
                </Typography>
              </IconButton>
            </Link>

            <Box sx={{ mx: "auto", width: 200 }}>
              <img
                src="../../img/logo-infinity.png"
                alt="Infinity Library"
                width="112"
                height="28"
              />
            </Box>
            <Box sx={{}}>
              <Badge badgeContent={count} color="secondary">
                <CartWidget />
              </Badge>
            </Box>
          </Toolbar>
          <Drawer open={open} anchor="left" onClose={() => setOpen(false)}>
            <NavListDrawer setOpen={setOpen} />
          </Drawer>
        </AppBar>
      </ThemeProvider>
    </Box>
  );
}
