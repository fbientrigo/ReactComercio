import loopproductos from "./hva.mp4";
import "./style.css";
import { Container, Typography, Button, Grid } from "@material-ui/core";

const AfterFX = () => {
    return (
    <div className="afterfxseccion">
    <Grid xs={12}>
        <video autoplay="autoplay" loop="loop" muted className="videoAnuncio">
            <source src={loopproductos} type="video/mp4" />
        </video>


    </Grid>
    </div>
    )
}

export default AfterFX

