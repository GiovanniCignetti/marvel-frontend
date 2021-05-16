import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Cookies from "js-cookie";
import { useState } from "react";
import axios from "axios";

import Header from "./components/Header";
import Characters from "./containers/Characters";
import Comics from "./containers/Comics";
import ComicsByCharacter from "./containers/ComicsByCharacter";
import Favorites from "./containers/Favorites";
import LogIn from "./containers/LogIn";
import SignUp from "./containers/SignUp";

function App() {
  const [userToken, setUserToken] = useState(Cookies.get("userToken") || null);
  const [userName, setUserName] = useState(Cookies.get("userName") || null);
  const [favoritesCharacters, setFavoritesCharacters] = useState();
  const [favoritesComics, setFavoritesComics] = useState();

  const setUser = async (tokenOrNull, userNameOrNull) => {
    // console.log(2, tokenOrNull);
    // la fonction reçoit le token ou une valeur nulle
    if (tokenOrNull) {
      Cookies.set("userToken", tokenOrNull, { expires: 1 });
    } else {
      Cookies.remove("userToken");
    }
    // maj du state avec la valeur reçue
    setUserToken(tokenOrNull);

    // la fonction reçoit le userName ou une valeur nulle
    if (userNameOrNull) {
      Cookies.set("userName", userNameOrNull, { expires: 1 });
    } else {
      Cookies.remove("userName");
    }
    // maj du state avec la valeur reçue
    setUserName(userNameOrNull);

    if (tokenOrNull) {
      // console.log(1);
      // chargement states favoris
      loadFavorites(tokenOrNull);
    } else {
      // Raz States favoris si pas de token user
      setFavoritesCharacters();
      setFavoritesComics();
    }
  };

  // fonction de chargement des states favoris
  const loadFavorites = async (userToken) => {
    try {
      const res1 = await axios.get(
        "https://marvel-backend-giovanni.herokuapp.com/user/characters",
        {
          headers: {
            authorization: `Bearer ${userToken}`,
          },
        }
      );
      console.log(favoritesCharacters);
      let newFavChar = [...[favoritesCharacters]];
      console.log(2);
      newFavChar = res1.data;
      console.log(res1.data.favoritesCharacters);
      setFavoritesCharacters(res1.data.favoritesCharacters);
      const res2 = await axios.get(
        "https://marvel-backend-giovanni.herokuapp.com/user/comics",
        {
          headers: {
            authorization: `Bearer ${userToken}`,
          },
        }
      );
      let newFavComics = [...[favoritesComics]];
      newFavComics = res2.data;
      console.log(res2.data.favoritesComics);
      setFavoritesComics(res2.data.favoritesComics);
    } catch (error) {
      console.log(error.message);
    }
  };

  // fonction qui permet d'ajouter ou supprimer un favoris en BDD pour l'utilisateur loggé
  const switchFavorites = async (
    userToken,
    title,
    urlImg,
    description,
    typeCard,
    idCard
  ) => {
    try {
      // console.log(typeCard, idCard);
      const response = await axios.post(
        `https://marvel-backend-giovanni.herokuapp.com/user/favorites-${typeCard}/${idCard}`,
        {
          title: title,
          description: description,
          url: urlImg,
        },
        {
          headers: {
            authorization: `Bearer ${userToken}`,
          },
        }
      );
      // Re-chargement states favoris
      loadFavorites(userToken);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Router>
      <Header userToken={userToken} userName={userName} setUser={setUser} />
      <Switch>
        <Route path="/comics/:idCharacter">
          <ComicsByCharacter
            userToken={userToken}
            favoritesComics={favoritesComics}
            switchFavorites={switchFavorites}
          />
        </Route>
        <Route path="/comics">
          <Comics
            userToken={userToken}
            favoritesComics={favoritesComics}
            switchFavorites={switchFavorites}
          />
        </Route>
        <Route path="/favorites">
          <Favorites
            userToken={userToken}
            favoritesCharacters={favoritesCharacters}
            favoritesComics={favoritesComics}
            switchFavorites={switchFavorites}
          />
        </Route>
        <Route path="/signup">
          <SignUp setUser={setUser} />
        </Route>
        <Route path="/login">
          <LogIn setUser={setUser} />
        </Route>
        <Route path="/">
          <Characters
            userToken={userToken}
            favoritesCharacters={favoritesCharacters}
            switchFavorites={switchFavorites}
          />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
