import "./style.css";
import powershell from "./windowspowershell.png";
import winget from "./winget.png";
import ejemplo from "./asiseve.png";

const copy = require('clipboard-copy')

const botoncopia = () => {
  copy("iex ((New-Object System.Net.WebClient).DownloadString('https://git.io/JJ8R4'))");
}

// Componente para como hacer Debloat de Windows 10 
const Blog = () => {
    return (
        <div id="fondoblog">
            <h1>Debloat Windows 10</h1>
            <p>Utilizaras la Terminal de Windows 10: la PowerShell, todo el codigo lo puedes obtener aqui, al final de la pagina encontraras una lista de referencias</p>

            <h3>Paso 1: Entrar en la Terminal</h3>
            <p>Usando el boton de windows, aquel en el teclado, escribimos en la terminal "PowerShell", y nos vamos a entrar en administrador, esto es importante para que nos permita hacer cambios internos en el sistema</p>
            <p>Debo decirte que aqui sigas exactamente lo que hago, o podrias dañar algo</p>
            <img src={powershell} alt="asi se ve la powershell en el buscador" className="blog" />

            <h3>El codigo que usaremos en al terminal</h3>
            <p>Puedes copiarlo aqui mismo o usar el boton de copia</p>
            <button onClick={botoncopia} id="botonCopia"> Copia la Linea de Comando con este Boton</button>
            <p className="codigo">iex ((New-Object System.Net.WebClient).DownloadString('https://git.io/JJ8R4'))</p>
            <p>Este lo dejas en la consola, tal como lo pegues, puedes usar el click derecho o Ctrl + V</p>
            <img src={ejemplo} alt="ejemplo de como queda en la consola" className="blog ejemplo"/>

            <h3>Tas haber ejecutado el comando veras winget</h3>
            <img src={winget} alt="winget la lista basica" className="blog" />
            <p>Debes de seleccionar la opcion `Essential Tweaks` lo que te permitira</p>
            <ul>
                <li>Desactivar Telemetria</li>
                <li>Desintalar bloatware</li>
                <li>Desintalar Cortana (Opcional)</li>
                <li>No permitir que cualquier app corra sin que lo sepas (Opcional)</li>
            </ul>
            <div></div>
        </div>
    )
}

export default Blog
