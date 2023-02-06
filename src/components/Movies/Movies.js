import { useState, useContext } from "react";
import { NavContext } from "../../contexts";
import { MoviesCardList, SearchForm, SearchSavedForm, Preloader } from "..";

function Movies({
  onSearchFormSubmit,
  cards,
  isLoading,
  handleLike,
  handleDeleteCard,
}) {
  const [searchQuery, setSearchQuery] = useState();
  const [firstRender, setFirstRender] = useState(true);
  const navContext = useContext(NavContext);
  const location = navContext.location.pathname;

  return (
    <section className="movies">
      {location === "/movies" ? (
        <SearchForm
          onSearchFormSubmit={onSearchFormSubmit}
          onSearchQueryInput={setSearchQuery}
          setFirstRender={setFirstRender}
          firstRender={firstRender}
        />
      ) : (
        <SearchSavedForm
          onSearchFormSubmit={onSearchFormSubmit}
          onSearchQueryInput={setSearchQuery}
        />
      )}
      {isLoading ? (
        <Preloader />
      ) : (
        <MoviesCardList
          cards={cards}
          searchQuery={searchQuery}
          handleLike={handleLike}
          handleDeleteCard={handleDeleteCard}
          firstRender={firstRender}
        />
      )}
    </section>
  );
}

export default Movies;
