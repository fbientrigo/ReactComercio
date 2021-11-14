import { Grid, Container, Typography, Card, CardActions, CardContent, AppBar } from "@material-ui/core";
import "./style.css";


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
                    <ul>
                        <li>Economico</li>
                        <li>Instalacion Rapida</li>
                        <li>Grosor MAximo para Proteccion</li>
                        <li>Precio entre $3000 y $5000</li>
                    </ul>
                </Grid>

                <Grid item xs={1}> </Grid>

                <Grid item xs={4} className="cartaglass">
                    <Typography variant="h2">Hidrogel</Typography>
                    <Typography variant="p">Lamina de Hidrogel</Typography>
                    <ul>
                        <li>Acabado Premium</li>
                        <li>Flexible por tanto se adapta a cualquier patalla</li>
                        <li>Nano-Tecnologia de Absorcion de Golpes, permite regenerarse luego del daño</li>
                        <li>Facil de retirar y reemplazar</li>
                        <li>Grosor minimo, no interfiere con el lector de huellas</li>
                        <li>Puede usarse en la parte frontal como trasera del movil</li>
                        <li>$7500</li>
                    </ul>
                </Grid>
                <Grid item xs={2}> </Grid>
            </Grid>
        </div>
    )
}

export default Servicios
