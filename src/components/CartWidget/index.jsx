import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";

const CartWidget = () => {
  return (
    <Link to="/cart">
      <IconButton color="warning">
        <ShoppingCartIcon />
      </IconButton>
    </Link>
  );
};

export default CartWidget;
