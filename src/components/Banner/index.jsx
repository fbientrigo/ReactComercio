import { Container, Typography, Button, Grid } from "@material-ui/core";
import "./style.css";
import ImageSlider from "./Slider/ImageSlider.jsx";
import {SliderData} from "./Slider/SliderData.js";



const Banner = () => {
  return (
    <div className="banner">
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <Typography className="title" variant="h3">
                10% Descuento Compras en Internet con Retiro en Tienda
            </Typography>
            <p className="abstract">
            Constantemente creciendo y actualizando.
            Encuentranos en Viña del Mar, Calle Valparaiso 555
            </p>	
            <br/>
            <Button className="shopping-button" href="https://g.page/Todocelular555?share"  target="_blank" rel="noopener noreferrer">
              Google Maps
            </Button>
          </Grid>
          <Grid className="slider brand" item xs={12} sm={6}>
            <ImageSlider slides={SliderData}/>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Banner;
