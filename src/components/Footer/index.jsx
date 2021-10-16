import "./style.css";

const Footer = () => {
  const date = new Date();
  const fullYear = date.getFullYear();
  return (
    <footer className="footer">
      <p>
        Todos &copy; los derechos reservados a Todo Celular {fullYear}
        Ubicado en Avenida Valparaiso #555
      </p>
    </footer>
  );
};

export default Footer;
