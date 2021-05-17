import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import Card from "../components/Card";
import Loader from "../components/Loader";

const ComicsByCharacter = ({ userToken, favoritesComics, switchFavorites }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  // récupération du paramètre de depuis l'URL (useParams)
  const { idCharacter } = useParams();

  let url = `https://marvel-backend-giovanni.herokuapp.com/comics/${idCharacter}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  // console.log(data);

  return isLoading ? (
    <Loader />
  ) : (
    <div className="container">
      <div>
        <h2>Liste des comics de {data.name}</h2>
      </div>
      <div className="cards-container">
        {data &&
          data.comics &&
          data.comics.length > 0 &&
          data.comics.map((comic, index) => {
            return (
              <Card
                userToken={userToken}
                key={comic._id ? comic._id : index}
                title={comic.title}
                urlImg={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                description={comic.description}
                typeCard="comics"
                idCard={comic._id}
                isFavorites={true}
                switchFavorites={switchFavorites}
                favoritesComics={favoritesComics}
              />
            );
          })}
      </div>
    </div>
  );
};

export default ComicsByCharacter;
