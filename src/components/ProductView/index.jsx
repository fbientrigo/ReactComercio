import "./style.css";
import {Grid, Button, Container, Typography} from "@material-ui/core";
import {ShoppingCart} from "@material-ui/icons";
import {useState, useEffect} from "react";
import {commerce} from "../../lib/commerce";

const createMarkup = (text) => {
    return {__html: text};
};

const ProductView = ({addProduct, Spinner}) => {
    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true);


    const fetchProduct = async (id) =>{
        const response = await commerce.products.retrieve(id);
        const {name, price, image, quantity, description} = response;
        console.log("Fetch de un solo producto con id");
        console.log(`PRecio del producto es ${price.raw}`)
        console.log(response);
        setProduct({
            id, name, quantity, description, image: image.url, price: price.formatted_with_symbol ,
        });
    };

    useEffect(() => {
        const id = window.location.pathname.split("/");
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
        <Typography variant="p" className="descripcion" dangerouslySetInnerHTML={createMarkup(product.description)} />
    </div>
    <Typography variant="h3" className="precio"> Precio Unidad: {product.price}</Typography>

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
    </div>
    )
}

export default ProductView
