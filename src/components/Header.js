import logo from "../assets/img/logoMarvel.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <Link to="/">
        <img className="logo" src={logo} alt="logo" />
      </Link>
      <Link to="/">personnages</Link>
      <Link to="/comics">comics</Link>
      <Link to="/favorites">favoris</Link>
    </div>
  );
};

export default Header;
