import axios from "axios";

import { useState, useEffect } from "react";
import Card from "../components/Card";
import SearchAndPagination from "../components/SearchAndPagination";

import { Link } from "react-router-dom";

const Characters = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [nbPages, setNbPages] = useState();
  const [limit, setLimit] = useState(100);

  useEffect(() => {
    const fetchData = async () => {
      // construction de l'URL
      let url = `https://marvel-backend-giovanni.herokuapp.com/characters?name=${search}&skip=${
        (page - 1) * limit
      }&limit=${limit}`;

      try {
        const response = await axios.get(
          // `http://localhost:3001/characters`
          url
        );
        // console.log(response.data);
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
        {data.results.length > 0 &&
          data.results.map((character, index) => {
            return (
              <Link
                to={`/comics/${character._id}`}
                key={character._id ? character._id : index}
              >
                <Card
                  title={character.name}
                  urlImg={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                  description={character.description}
                />
              </Link>
            );
          })}
      </div>
    </>
  );
};

export default Characters;
