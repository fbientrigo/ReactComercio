import { Container, Typography, Button, Grid } from "@material-ui/core";
import { ShoppingCart } from "@material-ui/icons";
import { Link } from "react-router-dom";
import "./style.css";

const Banner = () => {
  return (
    <div className="basket-banner">
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <Typography className="title" variant="h1">
              El Carrito esta vacio, comienza nuestra tu historia con nuevos productos :)
            </Typography>
            <Button className="shopping-button" component={Link} to="/">
              Venta
            </Button>
          </Grid>
          <Grid className="brand" item xs={12} sm={6}>
            <ShoppingCart />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Banner;
