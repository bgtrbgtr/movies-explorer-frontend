import { useContext, useState } from "react";
import { NavContext, CurrentUserContext } from "../../contexts";
import { Button, Link } from "..";

function MoviesCard({ card, handleLike, handleDelete }) {
  const savedCards = useContext(CurrentUserContext).savedMovies;
  const context = useContext(NavContext);
  const [isHovered, setIsHovered] = useState(false);

  function getFormattedDuration(totalMinutes) {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    const result = `${hours}ч ${minutes}м`;
    return result;
  }

  const onCardLike = () => {
    handleLike(card);
  };

  const onCardDelete = () => {
    handleDelete(card);
  };

  const isLiked = savedCards?.some((i) => i.nameRU === card.nameRU);

  return (
    <div
      className="movies-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={card.trailerLink}>
        <img
          className="movies-card__image"
          src={
            context.location.pathname === "/saved-movies"
              ? card.image
              : `https://api.nomoreparties.co${card.image.url}`
          }
          alt={`Постер к фильму: ${card.nameRU}`}
          style={{
            objectFit: "cover",
          }}
        />
      </Link>
      <div className="movies-card__movie-info">
        <div className="movies-card__name-container">
          <h3 className="movies-card__movie-name">{card.nameRU}</h3>
          {context.location.pathname === "/saved-movies" ? (
            <div
              className={
                isHovered
                  ? "movies-card__like-container"
                  : "movies-card__like-container movies-card__like-container_hidden"
              }
            >
              <Button
                onClick={onCardDelete}
                className="movies-card__delete-icon"
                ariaLabel="Удалить карточку"
              />
            </div>
          ) : (
            <div className="movies-card__like-container">
              <Button
                className={`movies-card__like ${
                  isLiked
                    ? "movies-card__like_status_enable"
                    : "movies-card__like_status_disable"
                }`}
                ariaLabel="Поставить/снять лайк"
                onClick={onCardLike}
              />
            </div>
          )}
        </div>
        <p className="movies-card__movie-duration">
          {getFormattedDuration(card.duration)}
        </p>
      </div>
    </div>
  );
}

export default MoviesCard;
