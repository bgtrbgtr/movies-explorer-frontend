import { useContext, useState } from "react";
import { AppContext } from "../../contexts/AppContext";
import { Button } from "..";

function MoviesCard({ card }) {
  const context = useContext(AppContext);
  const [isHovered, setIsHovered] = useState(false);

  function getFormattedDuration(totalMinutes) {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    const result = `${hours}ч ${minutes}м`;
    return result;
  }

  return (
    <div
      className={
        context.location.pathname === "/saved-movies"
          ? "movies-card movies-card_type_saved"
          : "movies-card"
      }
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        className="movies-card__image"
        src={`https://api.nomoreparties.co/${card.image.url}`}
        alt={`Постер к фильму: ${card.nameRU}`}
        style={{
          objectFit: "cover",
        }}
      />
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
                className="movies-card__delete-icon"
                ariaLabel="Удалить карточку"
              />
            </div>
          ) : (
            <div className="movies-card__like-container">
              <Button
                className="movies-card__like movies-card__like_status_disable"
                ariaLabel="Поставить/снять лайк"
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
