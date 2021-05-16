import axios from "axios";
import { useState, useEffect } from "react";
import Card from "../components/Card";
import SearchAndPagination from "../components/SearchAndPagination";

const Comics = ({ userToken, favoritesComics, switchFavorites }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [nbPages, setNbPages] = useState();
  const [limit, setLimit] = useState(100);

  useEffect(() => {
    const fetchData = async () => {
      // console.log(url);
      let url = `https://marvel-backend-giovanni.herokuapp.com/comics?title=${search}&skip=${
        (page - 1) * limit
      }&limit=${limit}`;

      try {
        const response = await axios.get(url);
        setNbPages(Math.ceil(response.data.count / response.data.limit));
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [search, page, limit]);

  return isLoading ? (
    <span>En cours de chargement... </span>
  ) : (
    <>
      {/* composant Recherche et pagination */}
      <SearchAndPagination
        setSearch={setSearch}
        setPage={setPage}
        setLimit={setLimit}
        page={page}
        nbPages={nbPages}
        limit={limit}
        count={data.count}
      />
      <div className="cards-container">
        {data &&
          data.results &&
          data.results.length > 0 &&
          data.results.map((comic, index) => {
            return (
              <Card
                userToken={userToken}
                key={comic._id}
                title={comic.title}
                urlImg={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                description={comic.description}
                typeCard="comics"
                idCard={comic._id}
                switchFavorites={switchFavorites}
                favoritesComics={favoritesComics}
              />
            );
          })}
      </div>
    </>
  );
};

export default Comics;
