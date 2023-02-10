import { MoviesCard } from "..";

function SavedMovies({ handleDeleteCard, cards, searchResults }) {
  const renderCards =
    searchResults.length === 0
      ? cards?.map((card) => {
          return (
            <MoviesCard
              handleDelete={handleDeleteCard}
              key={card._id}
              card={card}
            />
          );
        })
      : searchResults?.map((card) => {
          return (
            <MoviesCard
              handleDelete={handleDeleteCard}
              key={card._id}
              card={card}
            />
          );
        });

  return <div className="movies-card-list__list">{renderCards}</div>;
}

export default SavedMovies;
