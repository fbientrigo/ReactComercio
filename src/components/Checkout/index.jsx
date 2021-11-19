import { useState, useEffect, useRef } from "react";
import {
  Step,
  Paper,
  Stepper,
  StepLabel,
  Container,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { commerce } from "../../lib/commerce";
//para contacto por mail
import emailjs from "emailjs-com";
import "./style.css";

/*          Componente Checkout
    Se opta por una forma hibrida de automatizacion, debido a la inestabilidad de BSale
    Esta forma aumenta la seguridad y permite que un vendedor cierre la venta
    Forma -> Vendedor -> Confirmacion y Forma de Pago


*/


const steps = ["order-address", "order-details", "order-payment"];

const usePreviousState = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

const Checkout = ({ basketData, orderInfo, orderError, handleCheckout, numeroVisitante, totalCost }) => {
    const [user, setUser] = useState({
        ciudad: "",
        email: "",
        direccion: "",
        lastName: "",
        firstName: "",
        shippingOption: {},
        shippingOptions: [],
    });

    const [bookingStep, setBookingStep] = useState("order-address");
    //checkoutData contiene:
    const [checkoutData, setCheckoutData] = useState("");
    const [subtotal, setSubtotal] = useState(0);

    console.log("El checoutData es:");
    console.log(checkoutData);

    const history = useHistory();

    const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    };

    //Fecha
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = dd + '-' + mm + '-' + yyyy;
        console.log("Fecha de Hoy es");
        console.log("El Ticket ID es la Fecha con el id del visitante adelante");
        console.log(numeroVisitante);
    let ticketid = numeroVisitante + "-" + today;
    console.log(ticketid)
    
    //Enviar el Mail
    function sendEmail(e) {
        e.preventDefault();
        console.log("Dentro del email tenemos:");
        console.log(e);

        //la estoy construyendo a mi conveniencia
        // ToDo
        // [] Agregar el userID al .env
        emailjs.sendForm('gmail', 'ticket', e.target, 'user_n6ZOPkoUzAa0g3anpbeRJ')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
            // e.target.reset(); //una vez enviada se resetea
    }

    useEffect(() => {
        if (basketData.id) {
        const generateToken = async () => {
            try {
            const response = await commerce.checkout.generateToken(
                basketData.id,
                {
                type: "cart",
                }
            );
            setCheckoutData(response);
            // setSubtotal(response.subtotal.raw);
            // console.log("El subtotal --------");
            // console.log(subtotal);
            //debug
            console.log("Data de Respuesta: --------");
            console.log(response);
            } catch (error) {
            console.error("Checkout error: ", error);
            }
        };
        generateToken();
        }



    }, [basketData, history]);

/* To Do:
    [] response.products contiene los productos necesarios
    [] implementar el envio mediante Mail
    [] enviar por mail o otra cosa la lista de productos junto a las imagenes de estos
*/

//        <h2>Esta parte esta en construccion para tu seguridad, tomale foto a tus productos y envialos a wsp meintras</h2>

    console.log("basketData que es lo mas importante");
    console.log(basketData);

    //seccion que crea el mensaje a enviar
    let mensaje = [];
    if (checkoutData.products && basketData) {
        mensaje.push("Subtotal:  " + "$" +basketData.subtotal.raw); 
        mensaje.push("<br>");
        mensaje.push("Productos: ");
        mensaje.push("<br>");
        mensaje.push("<ul>");
        checkoutData.products.map((product) => {
            mensaje.push("<li>");
            mensaje.push(product.name);
            mensaje.push("sku: " + product.sku);
            mensaje.push("$"+product.price.raw);
            mensaje.push("<br>");
            mensaje.push("-----")
            mensaje.push("</li>");
        });
        mensaje.push("</ul>");
    // let mensajeString = mensaje.join('\r\n');
    }
    let mensajeString = mensaje.join('\r\n');
    //ticketid, nombre, email, mensajed


    return (
      <div className="checkout">
        <Typography className="subtotal" variant="h3">{totalCost}</Typography>
        <Container>
        <Paper className="paper" elevation={3}>
        <div className="container">
        <form onSubmit={sendEmail}>
        <div className="row pt-5 mx-auto">
            <div className="col-8 form-group mx-auto">
                <input type="text" className="form-control" placeholder="Nombre" name="nombre"/>
            </div>

            <div className="col-8 form-group pt-2 mx-auto">
                <input type="email" className="form-control" placeholder="Email" name="email"/>
            </div>

            <div className="col-8">
                <input type="text" className="form-control" placeholder="Direccion" name="direccion"/>
            </div>

            <div className="col-8 pt-3 mx-auto">
                <input type="submit"  className="botonSubmit" value="Send Message"></input>
            </div>  

            <input type="hidden" cols="30" rows="8" name="mensaje" value={mensajeString}/>
            <input type="hidden" name="ticketid" value={ticketid}/>

        </div>
        </form>
        </div>
        </Paper>
        </Container>
      </div>
    );
  }


export default Checkout;
