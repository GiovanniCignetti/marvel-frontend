const SearchAndPagination = ({
  setSearch,
  setPage,
  setLimit,
  page,
  nbPages,
  limit,
  count,
}) => {
  const handlePage = (sign) => {
    sign === "+" ? setPage(page + 1) : setPage(page - 1);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Rechercher"
        onChange={(event) => {
          setSearch(event.target.value);
          setPage(1);
        }}
      />

      {page > 1 && <button onClick={() => handlePage("-")}>Page -</button>}
      {page < nbPages && (
        <button onClick={() => handlePage("+")}>Page +</button>
      )}
      <span>{` Page ${page}/${nbPages} `}</span>
      <span>{` Nb resultat total ${count} `}</span>
      <select
        id="selectLimit"
        onChange={(event) => {
          setLimit(event.target.value);
          setPage(1);
        }}
        value={limit}
      >
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="30">30</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
    </div>
  );
};

export default SearchAndPagination;
