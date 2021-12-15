import { Grid, Container } from "@material-ui/core";
import Product from "../Product";
import Spinner from "../Spinner";
import Banner from "../Banner";
import "./style.css";
//seccion para el menu drop down
import {Select, MenuItem, InputLabel, FormControl} from "@material-ui/core";
import { useState } from "react";
import { makeStyles } from "@material-ui/styles";
//manejar el cambio de categoria

//boton para cambiar la categoria
const useStyles = makeStyles({
  root:{
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 5,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    textAlign: 'center',
  },
  inputlabel:{
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  }
});




const Products = ({ products, addProduct, category }) => {
    const [categoriaActual, setCategoriaActual] = useState('');

    const classes = useStyles();

    // la pagina se carga 2 veces, la 1era no contiene datos ni categorias ya que es en esa carga cuando las pide
    // las siguientes lineas evitan que se muestre la pagina si algo no ha cargado
    if (!products.length) return <Spinner />;
    if (!category.length) return <Spinner />;


    console.log("Dentro de componente Products;");
    console.log(products);

    // Crear un boton para esto
    // uno verdecito color excel
    console.log(products);
    
    


    //console.log("Categoria ingresada en Products");
    //console.log(category);

    //ahora mismo esta entrando la lista completa de categorias
    //console.log("Comenzanod a filtrar productos, estado previo:");
    //console.log(products);

    let productsF = products;

    if (categoriaActual === '') {
      //console.log("Ah Ocurrido el 612!!");
      //console.log("Significa que nos encontramos en la primera ejecucion del programa");
      productsF = products;
    } else {
      console.log("612 Not Ocurring; se ha realizado un cambio en categoriaActual");
      console.log(categoriaActual.target.value);
      console.log("----------:-----------:----");
      // --------- Filtrado de Productos ----------
      productsF = products.filter(
        products => products.categories.find(
          (catego) => catego.slug === categoriaActual.target.value
        ));
    }
    
    //console.log("Estado despues");
    //console.log(productsF);
    // eslint-disable-next-line
    const handleChage = (e) => {
      //console.log("Cambiando de Categoria");
      //console.log(categoriaActual);

      setCategoriaActual(e.target.value);

      //console.log("Cambiando a:");
      //console.log(categoriaActual);
    };

    // eslint-disable-line prefer-template
    // let csv = "" 
    // if (products.length > 37) {
    // csv = "sep=; \n id; title ; description; availability; condition; price; link; image_link ; brand \n" ;
    //     products.forEach( producto => ( 
    //         csv +=  producto.sku + ";" 
    //             + producto.name + ";" + "descripcion" + producto.name + ";" 
    //             + "in stock" + ";" + "new" + ";" 
    //             + producto.price.raw + ";" 
    //             + "https://www.todocelularvina.cl/" +`soya` + "/product-view/"+ producto.id + ";"
    //             + producto.image.url + ";" 
    //             + "TodoCelular"
    //             + "\n"
    //     ));
    
    //     // console.log("csv");
    //     // console.log(csv);
    // }

 

    return (
      <div>
      <Banner />
      <FormControl fullWidth>
        <h1 id="categoriasTitulo">Categorias</h1>
        <InputLabel id="demo-simple-select-label" className={classes.inputlabel}></InputLabel>
        <Select className={classes.root}
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={categoriaActual.slug}
        label="Categorias"
        onChange={setCategoriaActual}>
        {   //unidad de category es categoria
            category.map(   (categoria) =>
                (
                <MenuItem key={categoria.id} value={categoria.slug}>{categoria.name}</MenuItem>
                )
            )
        }

        </Select>

      </FormControl>
    {/*  // Boton de Excel
      <a 
        href={'data:text/csv;charset=utf-8,' + encodeURI(csv)}
        className="excel download" id="botondescarga"
        target="_blank"
        rel="noreferrer"
        download="datos.csv"
        >
        Descarga Excel
      </a>
        */}
      <Container id="products">
        <Grid container spacing={4}>
          {productsF.map((product) => (
            <Grid key={product.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
              <Product product={product} addProduct={addProduct} />
            </Grid>
          ))}
        </Grid>
      </Container>

        </div>
  );
};

export default Products;
