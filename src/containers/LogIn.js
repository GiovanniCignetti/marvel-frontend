import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

const LogIn = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  //   const token = null;

  const handleSubmit = async (event) => {
    event.preventDefault();

    // vérification si LogIn OK
    try {
      const response = await axios.post(
        "https://marvel-backend-giovanni.herokuapp.com/user/login",
        // "http://localhost:3001/user/login",
        {
          email: email,
          password: password,
        }
      );

      // console.log(response.data.account.username);

      if (response.data.token && response.data.account.username) {
        setUser(response.data.token, response.data.account.username);
        history.push("/");
      } else {
        console.log("Token non reçu");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="body-log">
      <div className="log-form">
        <h2>Se connecter</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            onChange={(event) => setEmail(event.target.value)}
          />
          <input
            type="password"
            placeholder="Mot de passe"
            onChange={(event) => setPassword(event.target.value)}
          />
          <div>
            <button className="log-form-btn" type="submit">
              Se connecter
            </button>
          </div>
        </form>
        <Link to="/login">
          <span className="span-already">
            Tu n'as pas de compte ? Inscris-toi !
          </span>
        </Link>
      </div>
    </div>
  );
};

export default LogIn;
