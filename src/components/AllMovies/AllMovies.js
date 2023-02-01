import { MoviesCard, Button } from "..";
import { useState, useRef } from "react";

function AllMovies({ cards }) {
  const [limit, setLimit] = useState(12);
  const visibleButton = limit < cards.length;
  const ref = useRef(null);

  const renderCards = cards.map((card) => {
    return <MoviesCard key={card.id} card={card} />;
  });

  function incrementLimit(e) {
    e.preventDefault();
    setLimit(limit + 3);
    ref.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  return (
    <>
      <div className="movies-card-list__list">
        {renderCards.slice(0, limit)}
      </div>
      {visibleButton && (
        <Button
          className="movies-card-list__button-more"
          buttonText="Ещё"
          ariaLabel="Загрузить больше карточек"
          onClick={incrementLimit}
        />
      )}
      <div ref={ref}></div>
    </>
  );
}

export default AllMovies;
