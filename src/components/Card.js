import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Card = ({
  userToken,
  title,
  urlImg,
  description,
  // isFavorites,
  typeCard,
  idCard,
  switchFavorites,
  favoritesCharacters,
  favoritesComics,
}) => {
  // // fonction qui permet de vérifier si l'element est dans les favoris de l'utilisateur

  const [isFavorites, setIsFavorites] = useState(false);
  useEffect(() => {
    const checkFavorites = (
      typeCard,
      favoritesCharacters,
      favoritesComics,
      idCard
    ) => {
      setIsFavorites(false);

      // recherche dans  les perso ou comics
      if (typeCard === "characters") {
        // boucle sur les favoris
        favoritesCharacters &&
          favoritesCharacters.length > 0 &&
          favoritesCharacters.map((character, index) => {
            if (character.id_api === idCard) {
              setIsFavorites(true);
            }
          });
      }
      if (typeCard === "comics") {
        // boucle sur les favoris
        favoritesComics &&
          favoritesComics.length > 0 &&
          favoritesComics.map((comic, index) => {
            if (comic.id_api === idCard) {
              setIsFavorites(true);
            }
          });
      }
    };
    checkFavorites(typeCard, favoritesCharacters, favoritesComics, idCard);
  }, [favoritesCharacters, favoritesComics]);

  return (
    <div className="card">
      <span>{title}</span>
      {typeCard === "characters" ? (
        <Link to={`/comics/${idCard}`} key={idCard}>
          <img className="card-img" src={urlImg} alt="" />
        </Link>
      ) : (
        <img className="card-img" src={urlImg} alt="" />
      )}
      <span>{description}</span>
      {userToken && (
        <button
          onClick={() =>
            switchFavorites(
              userToken,
              title,
              urlImg,
              description,
              typeCard,
              idCard
            )
          }
        >
          {isFavorites ? "supprimer des favoris" : "mettre en favoris"}
        </button>
      )}
    </div>
  );
};

export default Card;
