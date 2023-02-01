import { MoviesCard } from "..";

function SavedMovies({ cards }) {
  return (
    <div className="movies-card-list__list">
      {cards
        ? cards.map((card) => <MoviesCard key={card.id} card={card} />)
        : null}
    </div>
  );
}

export default SavedMovies;
