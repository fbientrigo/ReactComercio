import "./style.css";
import {Grid, Button, Container, Typography} from "@material-ui/core";
import {ShoppingCart} from "@material-ui/icons";
import {useState, useEffect} from "react";
import {commerce} from "../../lib/commerce";
import React from "react";

const createMarkup = (text) => {
    return {__html: text};
};

const ProductView = ({addProduct, Spinner, Footer}) => {
    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true);
    //Controla el Precio que se observa
    const [pagar, setPagar] = useState(0);

    const fetchProduct = async (id) =>{
        const response = await commerce.products.retrieve(id);
        const {name, price, image, quantity, description} = response;

        console.log("Fetch de un solo producto con id");
        console.log(`Precio del producto es ${price.raw}`)
        console.log(response);

        setProduct({
            id, name, quantity, description, image: image.url, price: price.raw ,
        });

        setPagar(price.raw);
    };

    // Aqui es donde conseguimos el Producto ' Tomamos la id de la URL
    useEffect(() => {
        console.log("fetching de producto, el id sera obtenido: ");
        const id = window.location.hash.split("/");
        // Previamente usaba: console.log(window.location.hash);
        // sin embargo, esto no permite recargar la pagina ni vistar solo con el link
        // es un fix con cinta adesiva por ahora, ya que el enrutamietno hibrido y esas cosas es algo mas complejo
        fetchProduct(id[2]);
    }, []);

    const handleQuantity = (param) => {
        if (param === "decrease" && quantity > 1) {setQuantity(quantity - 1);}
        if (param === "increase" && quantity < 10) {setQuantity(quantity + 1);}
    };


    // <Typography variant="p" className="descripcion" dangerouslySetInnerHTML={createMarkup(product.description)} />

    return ( <div className="fondo">
        <Container className="product-view cartaglass">
            <Grid container spacing={4}>

            <Grid item xs={12} md={8} className="image-wrapper"> 
            <img onLoad={()=>{setLoading(false);}} src={product.image} alt={product.name} />
            </Grid>

        <Grid item xs={12} md={4} className="text cartaglass"> 
            <Typography variant="h2">{product.name}</Typography>
            <div className="descripcion">
                <Typography variant="body" className="descripcion" dangerouslySetInnerHTML={createMarkup(product.description)} />
            </div>
            <Typography variant="h3" className="precio"> Precio Unidad: ${pagar * quantity}</Typography>

            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <Button size="small" onClick={() => {handleQuantity("increase")}} variant="contained" className="increase-product-quantity botonplus">+</Button>
                </Grid>

                <Grid item xs={12}>
                    <Typography variant="h3" className="quantity">Cantidad: {quantity}</Typography>
                </Grid>

                <Grid item xs={12}>
                    <Button size="small" onClick={() => {handleQuantity("decrease")}} variant="contained" color="secundary" className="botonminus">-</Button>
                </Grid>

                <Grid item xs={12}>
                    <Button size="large" className="custom-button" onClick={() => {addProduct(product.id, quantity);}}>
                    <ShoppingCart /> Agregar al Carrito
                    </Button>
                </Grid>
            
            </Grid>
        </Grid>
            </Grid>
            {loading && <Spinner />}
 
        </Container>
   <Footer className="footer"/>
   </div>
    )
}

export default ProductView
