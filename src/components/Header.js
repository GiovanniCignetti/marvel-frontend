import logo from "../assets/img/logoMarvel.png";
import { Link } from "react-router-dom";

const Header = ({ setUser, userToken, userName }) => {
  return (
    <div className="header">
      <Link to="/">
        <img className="logo" src={logo} alt="logo" />
      </Link>
      <Link to="/">personnages</Link>
      <Link to="/comics">comics</Link>
      <Link to="/favorites">favoris</Link>
      <div className="btns-left">
        {userToken ? (
          <>
            <span>{`Bonjour ${userName}`}</span>
            <Link to="/">
              <button onClick={() => setUser(null, null)}>
                Se déconnecter
              </button>
            </Link>
          </>
        ) : (
          <>
            <Link to="/signup">
              <button className="btn1">S'inscrire</button>
            </Link>
            <Link to="/login">
              <button>Se connecter</button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
