import { useContext, useState, useEffect } from "react";
import { NavContext, AppContext, CurrentUserContext } from "../../contexts";
import { AllMovies, SavedMovies } from "..";
import useScreenWidth from "../../hooks/useScreenWidth";
import { moviesFilter } from "../../utils";

function MoviesCardList({
  cards,
  searchQuery,
  handleLike,
  handleDeleteCard,
  firstRender,
}) {
  const context = useContext(NavContext);
  const savedMovies = useContext(CurrentUserContext).savedMovies;
  const [limit, setLimit] = useState(12);
  const [cardsToUpload, setCardsToUpload] = useState(3);
  const appContext = useContext(AppContext);
  const isSavedMoviesSwitchOn = appContext.isSavedMoviesSwitchOn;

  const screenWidth = useScreenWidth();

  useEffect(() => {
    moviesFilter.defineLimitToSet(screenWidth, setLimit, setCardsToUpload);
  }, [screenWidth]);

  const searchResults = moviesFilter.getSearchResults(cards, searchQuery);

  const savedSearchResults = moviesFilter.getSearchResults(
    savedMovies,
    searchQuery
  );
  let shortFilmsResults = moviesFilter.getShortFilmsFromResults(searchResults);
  let shortSavedResults = moviesFilter.getShortFilmsFromResults(
    savedSearchResults.length === 0 ? savedMovies : savedSearchResults
  );

  if (context.location.pathname === "/movies") {
    return (
      <section className="movies-card-list">
        <AllMovies
          limit={limit}
          setLimit={setLimit}
          cardsToUpload={cardsToUpload}
          handleLike={handleLike}
          firstRender={firstRender}
          cards={appContext.isSwitchOn ? shortFilmsResults : searchResults}
        />
      </section>
    );
  } else if (context.location.pathname === "/saved-movies") {
    return (
      <section className="movies-card-list">
        <SavedMovies
          handleDeleteCard={handleDeleteCard}
          cards={isSavedMoviesSwitchOn ? shortSavedResults : savedMovies}
          searchResults={
            isSavedMoviesSwitchOn ? shortSavedResults : savedSearchResults
          }
        />
      </section>
    );
  }
}

export default MoviesCardList;
