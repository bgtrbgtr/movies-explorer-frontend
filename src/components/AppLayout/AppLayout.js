import { NavContext } from "../../contexts";
import { useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { auth, mainApi } from "../../utils";
import { MenuPopup } from "..";

function AppLayout({
  setLoggedIn,
  setCurrentUser,
  isPopupOpen,
  onPopupClose,
  setSavedMovies,
  setCards,
  setIsRegistrationOk,
  setIsChangeInfoOk,
  getSavedMovies,
  downloadMoviesCards,
}) {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    checkToken();
    if (localStorage.getItem("jwt")) {
      downloadMoviesCards();
    }
  }, []);

  function checkToken() {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth.getContent(jwt).then((res) => {
        setLoggedIn({ status: true });
        setCurrentUser(res);
        getSavedMovies();
      });
    } else {
      setLoggedIn({
        status: false,
        message:
          "При авторизации произошла ошибка. Токен не передан или передан не в том формате",
      });
    }
  }

  const handleLogin = ({ email, password }) => {
    auth
      .authorize(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          setLoggedIn({ status: true });
          checkToken();
        }
      })
      .then(() => {
        navigate("/movies");
        if (localStorage.getItem("jwt")) {
          downloadMoviesCards();
        }
      })
      .catch((e) => {
        if (e === 401) {
          setLoggedIn({
            status: false,
            message: "Вы ввели неправильный логин или пароль",
          });
        } else if (e === 500) {
          setLoggedIn({
            status: false,
            message: "500 На сервере произошла ошибка",
          });
        } else if (e === 404) {
          setLoggedIn({
            status: false,
            message: "404 Страница по указанному маршруту не найдена",
          });
        } else {
          setLoggedIn({ status: false });
        }
      });
  };

  function handleLogout() {
    setLoggedIn({ status: false });
    localStorage.clear();
    setCurrentUser({});
    setSavedMovies([]);
    setCards([]);
    navigate("/");
  }

  function handleRegistration({ name, email, password }) {
    auth
      .register(name, email, password)
      .then(() => {
        setIsRegistrationOk({ status: true });
        handleLogin({ email, password });
      })
      .then(() => {
        navigate("/movies");
        if (localStorage.getItem("jwt")) {
          downloadMoviesCards();
        }
      })
      .catch((e) => {
        if (e === 409) {
          setIsRegistrationOk({
            status: false,
            message: "Пользователь с таким email уже существует",
          });
        } else if (e === 500) {
          setIsRegistrationOk({
            status: false,
            message: "500 На сервере произошла ошибка",
          });
        } else if (e === 404) {
          setIsRegistrationOk({
            status: false,
            message: "404 Страница по указанному маршруту не найдена",
          });
        } else {
          setIsRegistrationOk({ status: false });
        }
      });
  }

  function handleChangeUserInfo({ name, email }) {
    mainApi
      .changeUserInfo({ name, email })
      .then((res) => {
        setCurrentUser(res);
        setIsChangeInfoOk({
          status: true,
          message: "Информация успешно обновлена",
        });
      })
      .catch((e) => {
        if (e === 503) {
          setIsChangeInfoOk({
            status: false,
            message: "Пользователь с таким email уже существует",
          });
        } else if (e === 500) {
          setIsChangeInfoOk({
            statis: false,
            message: "500 На сервере произошла ошибка",
          });
        } else if (e === 404) {
          setIsChangeInfoOk({
            statis: false,
            message: "404 Страница по указанному маршруту не найдена",
          });
        } else {
          setIsChangeInfoOk({
            status: false,
            message: "При обновлении профиля произошла ошибка",
          });
        }
      });
  }

  return (
    <NavContext.Provider
      value={{
        location: location,
        onLogin: handleLogin,
        setCurrentUser: setCurrentUser,
        onLogout: handleLogout,
        onRegistration: handleRegistration,
        onChangeUserInfo: handleChangeUserInfo,
      }}
    >
      <div className="page">
        <Outlet />
        <MenuPopup isOpen={isPopupOpen} onClose={onPopupClose} />
      </div>
    </NavContext.Provider>
  );
}

export default AppLayout;
