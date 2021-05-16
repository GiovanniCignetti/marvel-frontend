import { Redirect } from "react-router-dom";
import axios from "axios";
import Card from "../components/Card";

const Favorites = ({
  userToken,
  favoritesCharacters,
  favoritesComics,
  switchFavorites,
}) => {
  return !userToken ? (
    <Redirect to="/login" />
  ) : (
    <div className="container">
      <h2>Liste des favoris</h2>
      <h3>Personnages</h3>
      <div className="cards-container">
        {favoritesCharacters &&
          favoritesCharacters.length > 0 &&
          favoritesCharacters.map((character, index) => {
            return (
              <Card
                userToken={userToken}
                key={character._id}
                title={character.name}
                urlImg={character.url}
                description={character.description}
                typeCard="characters"
                idCard={character.id_api}
                switchFavorites={switchFavorites}
                favoritesCharacters={favoritesCharacters}
              />
            );
          })}
      </div>
      <h3>Comics</h3>
      <div className="cards-container">
        {favoritesComics &&
          favoritesComics.length > 0 &&
          favoritesComics.map((comic, index) => {
            return (
              <Card
                userToken={userToken}
                key={comic._id}
                title={comic.title}
                urlImg={comic.url}
                description={comic.description}
                typeCard="comics"
                idCard={comic.id_api}
                switchFavorites={switchFavorites}
                favoritesComics={favoritesComics}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Favorites;
