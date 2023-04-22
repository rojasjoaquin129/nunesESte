import { Link } from "react-router-dom";
import styles from "./card.module.css";
import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { spacing } from "@mui/system";

export default function ProductCard({ producto }) {
  return (
    <div className="col-12 col-sm-6 col-lg-3">
      <section className="product-box">
        <div className="a">
          <Link to={`/products/${producto.id}`}>
            <figure className="product-box_image">
              <img
                src={producto.image}
                className="img-card"
                alt="imagen de producto"
              />
            </figure>
            <article className="product-box_data">
              <h6> {producto.title} </h6>
              <p>Precio: ${producto.price}</p>
            </article>
            {/* <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
            </CardActions> */}
          </Link>
        </div>
      </section>
    </div>
  );
}
