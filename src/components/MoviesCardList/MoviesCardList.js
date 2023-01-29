import { useContext } from "react";
import { AppContext } from "../../contexts/AppContext";
import { AllMovies, SavedMovies } from "..";

function MoviesCardList({ cards }) {
  const context = useContext(AppContext);

  return (
    <section className="movies-card-list">
      {context.location.pathname === "/movies" ? (
        <AllMovies cards={cards} />
      ) : (
        <SavedMovies cards={cards} />
      )}
    </section>
  );
}

export default MoviesCardList;
