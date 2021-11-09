import { Container, Typography, Button, Grid } from "@material-ui/core";
import logo from "./Canon-Kit.png";
import "./style.css";
import ImageSlider from "./Slider/ImageSlider.jsx";
import {SliderData} from "./Slider/SliderData.js";

// To Do
// Aplicar un Carrusel a la Imagen de la Derecha
// de manera de poner productos recomendados alli

const Banner = () => {
  return (
    <div className="banner">
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <Typography className="title" variant="h3">
                Tienda de Tecnologia
            </Typography>
						<Typography variant="p">
							Constantemente creciendo y actualizando; encuentranos en Viña del Mar, Calle Valparaiso 555
						</Typography>
						<br/>
            <Button className="shopping-button" href="https://g.page/Todocelular555?share">
              Google Maps
            </Button>
          </Grid>
          <ImageSlider slides={SliderData}/>
          {/* <Grid className="brand" item sm={6}>
            <img src={logo} alt="TodoCelular" />
          </Grid> */}
        </Grid>
      </Container>
    </div>
  );
};

export default Banner;
