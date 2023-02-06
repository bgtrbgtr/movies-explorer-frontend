import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AppContext, NavContext } from "../../contexts";
import { Button } from "..";

function MenuPopup({ isOpen, onClose }) {
  const [locationStatus, setLocationStatus] = useState({
    main: false,
    movies: false,
    savedMovies: false,
  });

  const appContext = useContext(AppContext);
  const navContext = useContext(NavContext);
  const currentLocation = navContext.location.pathname;

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
        className={`page__menu-popup-underlay ${
          isOpen ? "page__menu-popup-underlay_visible" : null
        }`}
      >
        <nav
          className={`page__menu-popup ${
            isOpen ? "page__menu-popup_visible" : null
          }`}
        >
          <Button onClick={onClose} className="page__menu-popup-close-button" />
          <Link
            to={"/"}
            className={`page__menu-popup-link ${
              locationStatus.main ? "page__menu-popup-link_underlined" : null
            }`}
            onClick={onClose}
          >
            Главная
          </Link>
          <Link
            to={"/movies"}
            className={`page__menu-popup-link ${
              locationStatus.movies ? "page__menu-popup-link_underlined" : null
            }`}
            onClick={onClose}
          >
            Фильмы
          </Link>
          <Link
            to={"/saved-movies"}
            onClick={onClose}
            className={`page__menu-popup-link ${
              locationStatus.savedMovies
                ? "page__menu-popup-link_underlined"
                : null
            }`}
          >
            Сохраненные фильмы
          </Link>
          <div className="page__menu-popup-profile-link-box">
            <Link
              onClick={onClose}
              to={"/profile"}
              className="header__link header__link_type_signed-bold page__menu-popup-profile-link"
            >
              Аккаунт
            </Link>
            <Link
              onClick={onClose}
              to={"/profile"}
              className="header__link page__menu-popup-profile-link header__link_type_icon"
            ></Link>
          </div>
        </nav>
      </div>
    </>
  );
}

export default MenuPopup;
