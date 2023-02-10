import { useContext } from "react";
import { Link } from "react-router-dom";
import { NavContext } from "../../contexts";
import { Button } from "..";

function MenuPopup({ isOpen, onClose }) {
  const navContext = useContext(NavContext);
  const currentLocation = navContext.location.pathname;

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
              currentLocation === "/"
                ? "page__menu-popup-link_underlined"
                : null
            }`}
            onClick={onClose}
          >
            Главная
          </Link>
          <Link
            to={"/movies"}
            className={`page__menu-popup-link ${
              currentLocation === "/movies"
                ? "page__menu-popup-link_underlined"
                : null
            }`}
            onClick={onClose}
          >
            Фильмы
          </Link>
          <Link
            to={"/saved-movies"}
            onClick={onClose}
            className={`page__menu-popup-link ${
              currentLocation === "/saved-movies"
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
