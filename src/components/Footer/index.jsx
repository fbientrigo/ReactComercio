import "./style.css";

const Footer = () => {
  const date = new Date();
  const fullYear = date.getFullYear();
  return (
    <footer className="footer">
      <p>
        Todo Celular {fullYear} Ubicado en Viña del Mar, Avenida Valparaiso #555
      </p>
      <p>
        -Contacto fbientrigo@gmail.com
      </p>
    </footer>
  );
};

export default Footer;
