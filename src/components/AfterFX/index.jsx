import loopproductos from "./hva.mp4";
import "./style.css";
import {Grid } from "@material-ui/core";

const AfterFX = () => {
    return (
    <div className="afterfxseccion">
    <Grid xs={12}>
        <video autoPlay="autoplay" loop="loop" muted className="videoAnuncio">
            <source src={loopproductos} type="video/mp4" />
        </video>
    </Grid>
    <br/>
    </div>
    )
}

export default AfterFX

