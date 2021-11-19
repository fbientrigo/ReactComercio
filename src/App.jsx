// Parte de React y el Funcionamiento de MAteriaul UI
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";
// Apis usadas
import { commerce } from "./lib/commerce";
import countapi from "countapi-js";
//componentes
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Products from "./components/Products";
import Basket from "./components/Basket";
import Checkout from "./components/Checkout";
import ProductView from "./components/ProductView";
import Servicios from "./components/Servicios";
import Spinner from "./components/Spinner";
//esto es para enviar mails automaticos
import{ init } from 'emailjs-com';
import AfterFX from "./components/AfterFX";
init("user_n6ZOPkoUzAa0g3anpbeRJ");

const App = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [basketData, setBasketData] = useState({});
  const [orderInfo, setOrderInfo] = useState({});
  const [orderError, setOrderError] = useState("");
  const [visitas, setVisitas] = useState(0);

  const fetchProducts = async () => {
    //conseguimos los productos y categorias
    // por default el limite es 20
    const {data:responseProd} = await commerce.products.list({limit:200});
    const {data:responseCat} = await commerce.categories.list();
    //debuggin
    //console.log(responseCat);
    //console.log(responseProd);

    setProducts(responseProd);
    setCategory(responseCat);

    //console.log("Observa como se actualizaron category y products con React Hook useState");
    //console.log(products);
    //console.log(category);
    //console.log("---------");
  };


  const fetchBasketData = async () => {
    const response = await commerce.cart.retrieve();
    setBasketData(response);
  };

  const addProduct = async (productId, quantity) => {
    const response = await commerce.cart.add(productId, quantity);
    setBasketData(response.cart);
  };

  const RemoveItemFromBasket = async (itemId) => {
    const response = await commerce.cart.remove(itemId);
    setBasketData(response.cart);
  };

  const handleEmptyBasket = async () => {
    const response = await commerce.cart.empty();
    setBasketData(response.cart);
  };

  const updateProduct = async (productId, quantity) => {
    const response = await commerce.cart.update(productId, { quantity });
    setBasketData(response.cart);
  };

  const refreshBasket = async () => {
    const newBasketData = await commerce.cart.refresh();
    setBasketData(newBasketData);
  };

  const handleCheckout = async (checkoutId, orderData) => {
    try {
      // const incomingOrder = await commerce.checkout.capture(
      //   checkoutId,
      //   orderData
      // );

      setOrderInfo(orderData);

      refreshBasket();
    } catch (error) {
      setOrderError(
        (error.data && error.data.error && error.data.error.message) ||
          "There is an error occurred"
      );
    }
  };

    // count api para contar las visitas de la pagina
    //https://countapi.xyz/
    // To Do: [] Agregar el count para cada vez que se revisen los produtos, o compras
    


    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        fetchProducts();
        fetchBasketData();
        countapi.visits().then((result) => {
            console.log("Las visitas a esta pagina");
            //una visita a la pagian correspone a cada vez que la he recargado
            setVisitas(result.value/8);
            // a dia de 14 noviembre hay unas 49227 visitas mias, asi que considerese restarle
            //ya que en el desarrollo tendremos que ir recargando 
            console.log(visitas);
        });


        // console.log("Observa como se actualizaron category y products con React Hook useState");
        // console.log(products);
        // console.log(category);

        //elimina el siguiente espacio en blanco
        // eslint-disable-next-line
    
        },[]); // aqui va }, []); que es el array de dependencias, React me recomendo quitarla debido a errores
        //despues de un poco de research no encontre una solucion al problema
        //https://stackoverflow.com/questions/55840294/how-to-fix-missing-dependency-warning-when-using-useeffect-react-hook
  return (
    <Router>
      <div>
        <CssBaseline />
        <NavBar
          basketItems={basketData.total_items}
          totalCost={
            (basketData.subtotal &&
              basketData.subtotal.formatted_with_symbol) ||
            "00"
          }
        />
        <Switch>
            <Route exact path="/">
                <AfterFX/>
                <div> </div>
                <Products products={products} addProduct={addProduct} category={category} />
        <Footer />
            </Route>

            <Route exact path="/basket">
                <Basket basketData={basketData} updateProduct={updateProduct} handleEmptyBasket={handleEmptyBasket} RemoveItemFromBasket={RemoveItemFromBasket} />
        <Footer />
            </Route>

            <Route exact path="/checkout">
                <Checkout orderInfo={orderInfo} orderError={orderError} numeroVisitante={visitas} basketData={basketData} handleCheckout={handleCheckout} 
                totalCost={
                    (basketData.subtotal &&
                    basketData.subtotal.formatted_with_symbol) ||
                    "00"
                }
                />
            </Route>

            <Route exact path="/servicios">
                <Servicios />
            </Route>

            <Route exact path="/product-view/:id">
                <ProductView addProduct={addProduct} Spinner={Spinner} />
            <Footer />
            </Route>

        </Switch>
      </div>
    </Router>
  );
};

export default App;
