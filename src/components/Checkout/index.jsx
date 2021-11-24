import { useState, useEffect, useRef } from "react";
import {
  Paper,
  Container,
  Typography,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { commerce } from "../../lib/commerce";
//para contacto por mail
import emailjs from "emailjs-com";
import "./style.css";
import guia from "./guia.png";

/*          Componente Checkout
    Se opta por una forma hibrida de automatizacion, debido a la inestabilidad de BSale
    Esta forma aumenta la seguridad y permite que un vendedor cierre la venta
    Forma -> Vendedor -> Confirmacion y Forma de Pago


*/

const Checkout = ({ basketData, numeroVisitante, totalCost }) => {

    //checkoutData contiene:
    const [checkoutData, setCheckoutData] = useState("");
    //Cuanto es lo que estamos ocbrando al cliente
    const [pagar, setPagar] = useState(totalCost);
    let descuento = 1.0; //porcentajes

    //console.log("El checkoutData es:");
    //console.log(checkoutData);

    //Fecha
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = dd + '-' + mm + '-' + yyyy;
    //console.log("Fecha de Hoy es");
    //console.log("El Ticket ID es la Fecha con el id del visitante adelante");
    //console.log(numeroVisitante);
    let ticketid = numeroVisitante + "-" + today;
    //console.log(ticketid)
    
    //Enviar el Mail
    /*La funcion se encarga de tomar todo lo de <from> y lanzarlo por la API de emails*/
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
            //debug
            //console.log("Data de Respuesta: --------");
            setCheckoutData(response);
            //Actualizamos cuanto Paga Dependiendo de condiciones
            // react infinite loop warning 24 noviembre
            // desde que agreguye este comportamiento tuve algunos infinitos, y luego dejaron de ocurrir
           
            //aplicamos el default de que usen el retiro en tienda
           setPagar(basketData.subtotal.raw * 0.9);
            //debug
            //console.log("Data de Respuesta: --------");
            //console.log(response);
            } catch (error) {
                //console.error("Checkout error: ", error);
            }
            };
            //para que es esto?
            generateToken();
        }
   // }, [basketData, history]); //elimine esta opcion el 24 de noviembre por renders infinitos
   // los renders eran producidos por la linea setCheckoutData()
    }, []);

    //console.log("basketData que es lo mas importante");
    //console.log(basketData);

    //seccion que crea el mensaje a enviar
    /*El mensaje contiene todos los datos sobre el producto, y permite que sea leido en la tienda*/
    let mensaje = [];
    if (checkoutData.products && basketData) {
        //Creamos el Email
        mensaje.push("Subtotal:  "+"$"+basketData.subtotal.raw); 
        mensaje.push("Aplicando Descuentos:  "+"$"+pagar); 
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
    //ticketid, nombre, email, mensaje

    // Controla el Cambio de Select, para retiro en tienda o domicilio
    const cambioSelect = (e) => {
        console.log("Ha ocurrido un Cambio en Select:");
        let seleccion = e.nativeEvent.target.value;
        //console.log(e.nativeEvent.target.value);
        //Entrega a Domicilio
        //Retiro en Tienda
        if (seleccion === 'Entrega a Domicilio') {
            descuento = 1.0;
            console.log('Aplicando descuento ' + descuento);
            setPagar(basketData.subtotal.raw * descuento);
        }
        else if (seleccion === 'Retiro en Tienda') {
            descuento = 0.9;
            console.log('Aplicando descuento ' + descuento);
            setPagar(basketData.subtotal.raw * descuento);
        }
    }
 

    return (
      <div className="checkout">
        <img src={guia} alt="guia de compra" className="guia"/>

        <Typography className="subtotal" variant="h3">$ {pagar}</Typography>
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


            <select name="metodorecepcion" id="recepcion" className="selecciona" onChange={cambioSelect}>
                <option value="Retiro en Tienda">Retiro en Tienda - Descuento 10%</option>
                <option value="Entrega a Domicilio">Domicilio - Aplican costos extras</option>
            </select>

            <div className="col-8 pt-3 mx-auto">
                <input type="submit" className="botonSubmit" value="Send Message"></input>
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
