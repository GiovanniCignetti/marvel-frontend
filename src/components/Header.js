import logo from "../assets/img/logoMarvel.png";
import { Link } from "react-router-dom";

const Header = ({ setUser, userToken, userName }) => {
  return (
    <div className="header">
      <Link to="/">
        <img className="logo" src={logo} alt="logo" />
      </Link>
      <Link className="menu" to="/">
        PERSONNAGES
      </Link>
      <Link className="menu" to="/comics">
        COMICS
      </Link>
      <Link className="menu" to="/favorites">
        FAVORIS
      </Link>
      <div>
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
              <button>S'inscrire</button>
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
