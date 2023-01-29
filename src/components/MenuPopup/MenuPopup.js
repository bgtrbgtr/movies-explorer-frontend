import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../contexts/AppContext";
import { Button } from "..";

function MenuPopup({ isOpen, onClose }) {
  const [locationStatus, setLocationStatus] = useState({
    main: false,
    movies: false,
    savedMovies: false,
  });

  const context = useContext(AppContext);
  const currentLocation = context.location.pathname;

  function locate() {
    switch (currentLocation) {
      case "/":
        setLocationStatus({ main: true, movies: false, savedMovies: false });
        break;
      case "/movies":
        setLocationStatus({ main: false, movies: true, savedMovies: false });
        break;
      case "/saved-movies":
        setLocationStatus({ main: false, movies: false, savedMovies: true });
        break;
      default:
        setLocationStatus({ main: false, movies: false, savedMovies: false });
    }
  }

  useEffect(() => {
    locate();
  }, [currentLocation]);

  return (
    <>
      <div
        className={`menu-popup__underlay ${
          isOpen ? "menu-popup__underlay_visible" : null
        }`}
      >
        <nav className={`menu-popup ${isOpen ? "menu-popup_visible" : null}`}>
          <Button onClick={onClose} className="menu-popup__close-button" />
          <Link to={"/"} className="menu-popup__link">
            <Button
              onClick={onClose}
              className={`menu-popup__button ${
                locationStatus.main ? "menu-popup__button_underlined" : null
              }`}
              buttonText="Главная"
            />
          </Link>
          <Link to={"/movies"} className="menu-popup__link">
            <Button
              onClick={onClose}
              className={`menu-popup__button ${
                locationStatus.movies ? "menu-popup__button_underlined" : null
              }`}
              buttonText="Фильмы"
            />
          </Link>
          <Link to={"/saved-movies"} className="menu-popup__link">
            <Button
              onClick={onClose}
              className={`menu-popup__button ${
                locationStatus.savedMovies
                  ? "menu-popup__button_underlined"
                  : null
              }`}
              buttonText="Сохраненные фильмы"
            />
          </Link>
          <div className="menu-popup__profile-link-box">
            <Link
              to={"/profile"}
              className="header__link menu-popup__profile-link"
            >
              <Button
                onClick={onClose}
                className="header__button header__button_type_signed-bold menu-popup__profile-button"
                buttonText="Аккаунт"
              />
            </Link>
            <Link
              to={"/profile"}
              className="header__link menu-popup__profile-link"
            >
              <Button
                onClick={onClose}
                className="header__button header__button_type_icon"
              />
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}

export default MenuPopup;
