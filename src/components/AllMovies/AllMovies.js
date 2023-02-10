import { useRef } from "react";
import { MoviesCard, Button } from "..";

function AllMovies({
  cards,
  handleLike,
  limit,
  setLimit,
  cardsToUpload,
  firstRender,
}) {
  const visibleButton = limit < cards?.length;
  const ref = useRef(null);

  const renderCards = cards?.map((card) => {
    return <MoviesCard handleLike={handleLike} key={card.id} card={card} />;
  });

  function incrementLimit() {
    setLimit(limit + cardsToUpload);
    ref.current.lastElementChild.scrollIntoView({
      behavior: "smooth",
    });
  }

  return (
    <>
      {cards?.length === 0 && !firstRender ? (
        <h2 className="movies-card-list__not-found-heading">
          Ничего не найдено
        </h2>
      ) : (
        <>
          <div ref={ref} className="movies-card-list__list">
            {renderCards?.slice(0, limit)}
          </div>
          {visibleButton && (
            <Button
              className="movies-card-list__button-more"
              buttonText="Ещё"
              ariaLabel="Загрузить больше карточек"
              onClick={incrementLimit}
            />
          )}
        </>
      )}
    </>
  );
}

export default AllMovies;
