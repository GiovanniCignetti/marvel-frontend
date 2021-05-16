import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

const SignUp = ({ setUser }) => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://marvel-backend-giovanni.herokuapp.com/user/signup",
        // "http://localhost:3001/user/signup",
        {
          email: email,
          password: password,
          username: userName,
        }
      );

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
    <div className="log-form">
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          onChange={(event) => setUserName(event.target.value)}
        />
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
        <button className="log-form-btn" type="submit">
          S'inscrire
        </button>
      </form>
      <Link to="/login">
        <span className="span-already">
          Tu as déjà un compte ? Connecte-toi !
        </span>
      </Link>
    </div>
  );
};

export default SignUp;
