import { Grid, Container, Typography, Card, CardActions, CardContent, AppBar } from "@material-ui/core";
import "./style.css";

import imgVidrio from './vidriotemplado.png';
import imgHidrogel from './hidrogel.png';

const Servicios = () => {
    /* Descripcion del componente:
       Se listan algunas categorias de manera vertical | | | | 
       combinando opciones de trasparencia de CSS y Grid de Material UI
    
    */
    return (
        <div className="serviciosdiv">
           <h1 className="white">Servicios</h1> 
            <Grid container spacing={4} className="gridpadre">
                <Grid item xs={1}></Grid>
                <Grid item xs={4} className="cartaglass">
                    <Typography variant="h2">Vidrios 5D</Typography>
                    <Typography variant="p">Vidrio Templado</Typography>
                    <img src={imgVidrio} alt="Vidrio Templado" className="imagenvidrios"/>
                    <ul className="descripcion">
                        <li>Economico</li>
                        <li>Instalacion Rapida</li>
                        <li>Grosor Maximo para Proteccion</li>
                        <li>En la tienda cortado a medida para cada modelo</li>
                    </ul>
                    <p className="precio">$3000 - $5000</p>
                </Grid>

                <Grid item xs={1}> </Grid>

                <Grid item xs={4} className="cartaglass">
                    <Typography variant="h2">Hidrogel</Typography>
                    <Typography variant="p">Lamina de Hidrogel</Typography>
                    <img src={imgHidrogel} alt="Hidrogel" className="imagenvidrios"/>
                    <ul className="descripcion">
                        <li>Acabado Premium</li>
                        <li>Flexible por tanto se adapta a cualquier patalla</li>
                        <li>Nano-Tecnologia de Absorcion de Golpes, permite regenerarse luego del daño</li>
                        <li>Facil de retirar y reemplazar</li>
                        <li>Grosor minimo, no interfiere con el lector de huellas</li>
                        <li>Puede usarse en la parte frontal como trasera del movil</li>
                    </ul>
                    <p className="precio">$7500</p>
                </Grid>
                <Grid item xs={2}> </Grid>
            </Grid>
        </div>
    )
}

export default Servicios
