import { Button } from "..";
import { Link } from "react-router-dom";
import logoSvg from "../../images/logo.svg";
import { AppContext, NavContext } from "../../contexts";
import { useContext } from "react";

function Header({ onPopupOpen }) {
  const appContext = useContext(AppContext);
  const navContext = useContext(NavContext);

  return (
    <header
      className={
        navContext.location.pathname === "/"
          ? "header header_location_main"
          : "header"
      }
    >
      <Link className="header__logo" to={"/"}>
        <img alt="Main logo" src={logoSvg} />
      </Link>
      {appContext.loggedIn.status ? (
        <>
          <div className="header__invisible-wrapper">
            <Link
              to={"/movies"}
              className={
                navContext.location.pathname === "/"
                  ? "header__link header__link_type_signed-bold header__link_color_white"
                  : "header__link header__link_type_signed-bold"
              }
            >
              Фильмы
            </Link>
            <Link
              to={"/saved-movies"}
              className={
                navContext.location.pathname === "/"
                  ? "header__link header__link_type_signed-regular  header__link_color_white"
                  : "header__link header__link_type_signed-regular"
              }
            >
              Сохраненные фильмы
            </Link>
            <Link
              to={"/profile"}
              className={
                navContext.location.pathname === "/"
                  ? "header__link header__link_type_signed-bold header__link_color_white"
                  : "header__link header__link_type_signed-bold"
              }
            >
              Аккаунт
            </Link>
            <Link
              to={"/profile"}
              className="header__link header__link_type_icon"
            ></Link>
          </div>
          <Button
            onClick={onPopupOpen}
            className="header__burger-menu"
          ></Button>
        </>
      ) : (
        <>
          <Link
            to={"signup"}
            className="header__link header__link_color_transparent"
          >
            Регистрация
          </Link>
          <Link to={"signin"} className="header__link header__link_color_green">
            Войти
          </Link>
        </>
      )}
    </header>
  );
}

export default Header;
