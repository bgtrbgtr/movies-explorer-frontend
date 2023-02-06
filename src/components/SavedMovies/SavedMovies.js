import { useContext, useEffect } from "react";
import { AppContext } from "../../contexts";
import { MoviesCard } from "..";

function SavedMovies({ handleDeleteCard, cards }) {
  const appContext = useContext(AppContext);
  const getSavedMoviesCards = appContext.getSavedMoviesCards;
  const deleted = appContext.isDeleted;

  useEffect(getSavedMoviesCards, [deleted]);

  const renderCards = cards?.map((card) => {
    return (
      <MoviesCard handleDelete={handleDeleteCard} key={card._id} card={card} />
    );
  });

  return <div className="movies-card-list__list">{renderCards}</div>;
}

export default SavedMovies;
