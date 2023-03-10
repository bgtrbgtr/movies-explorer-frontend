import { Button } from "..";
import { Link } from "react-router-dom";
import logoSvg from "../../images/logo.svg";
import { AppContext, NavContext } from "../../contexts";
import { useContext } from "react";

function Header({ onPopupOpen }) {
  const appContext = useContext(AppContext);
  const navContext = useContext(NavContext);
  const currentLocation = navContext.location.pathname;
  const loggedIn = appContext.loggedIn.status;

  return (
    <header
      className={
        currentLocation === "/" ? "header header_location_main" : "header"
      }
    >
      <Link className="header__logo" to={"/"}>
        <img alt="Main logo" src={logoSvg} />
      </Link>
      {loggedIn ? (
        <>
          <div className="header__invisible-wrapper">
            <Link
              to={"/movies"}
              className={
                currentLocation === "/"
                  ? "header__link header__link_type_signed-regular header__link_color_white"
                  : "header__link header__link_type_signed-regular" &&
                    currentLocation === "/movies"
                  ? "header__link header__link_type_signed-bold"
                  : "header__link header__link_type_signed-regular"
              }
            >
              Фильмы
            </Link>
            <Link
              to={"/saved-movies"}
              className={
                currentLocation === "/"
                  ? "header__link header__link_type_signed-regular  header__link_color_white"
                  : "header__link header__link_type_signed-regular" &&
                    currentLocation === "/saved-movies"
                  ? "header__link header__link_type_signed_bold"
                  : "header__link header__link_type_signed_regular"
              }
            >
              Сохраненные фильмы
            </Link>
            <Link
              to={"/profile"}
              className={
                currentLocation === "/"
                  ? "header__link header__link_type_signed-regular header__link_color_white"
                  : "header__link header__link_type_signed-regular" &&
                    currentLocation === "/profile"
                  ? "header__link header__link_type_signed-bold"
                  : "header__link header__link_type_signed-regular"
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
