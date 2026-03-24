import "./Footer.css";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <p className="footer__text">Developed by Havren Wright</p>
      <p className="footer__text"> &copy; {year} WTWR</p>
    </footer>
  );
}

export default Footer;
