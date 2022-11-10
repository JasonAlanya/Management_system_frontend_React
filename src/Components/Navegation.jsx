import { Link } from "react-router-dom";
import "../css/nav.css";

function Navegation() {
  return (
    <nav className="navigation">
      <Link className="logo" to="/">
        BLAZE
      </Link>
      <Link className="nav-link" to="/">
        Orders
      </Link>
      <Link className="nav-link" to="/products">
        Products
      </Link>
    </nav>
  );
}

export default Navegation;
