import { useState, useEffect } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import {
  Main,
  Movies,
  Profile,
  Login,
  Register,
  NotFound,
  Layout,
  ProtectedRoute,
} from "..";
import { mainApi, moviesApi } from "../../utils";
import { AppContext, CurrentUserContext } from "../../contexts";
import AppLayout from "../AppLayout/AppLayout";
import { moviesFilter } from "../../utils";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [cards, setCards] = useState([]);
  const token = localStorage.getItem("jwt");
  mainApi.setToken(token);
  const [loggedIn, setLoggedIn] = useState({
    status: false,
    message: "",
  });
  const [currentUser, setCurrentUser] = useState({});
  const [isRegistrationOk, setIsRegistrationOk] = useState({
    status: true,
    message: "При регистрации пользователя произошла ошибка",
  });
  const [isChangeInfoOk, setIsChangeInfoOk] = useState({
    status: true,
    message: "При обновлении профиля произошла ошибка",
  });
  const [isDeleted, setIsDeleted] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [savedMovies, setSavedMovies] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isSwitchOn, setIsSwitchOn] = useState(true);

  const onSwitchToggle = (e) => {
    setIsSwitchOn(e.target.checked);
    localStorage.setItem("isSwitchOn", e.target.checked);
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
  };

  const getSavedMoviesCards = () => {
    mainApi
      .getSavedMovies()
      .then((res) => setSavedMovies(res))
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    if (loggedIn.status) {
      getSavedMoviesCards();
    }
  }, []);

  const filterSavedMoviesCards = (savedMovies, query) => {
    return moviesFilter.getSearchResults(savedMovies, query);
  };

  const getMoviesCards = () => {
    setIsLoading(true);
    moviesApi
      .getMoviesInfo()
      .then((cards) => {
        setCards(cards);
        setIsLoading(false);
      })
      .catch((e) => console.error(e));
  };

  const handlePopupOpen = () => {
    setIsPopupOpen(true);
  };

  const handleDeleteCard = (card) => {
    mainApi
      .deleteMovie(card._id)
      .then((res) => {
        setIsDeleted(!isDeleted);
        const newSaved = savedMovies.filter((c) => c.nameRU !== res.nameRU);
        setSavedMovies(newSaved);
      })
      .catch((e) => console.log(e));
  };

  function handleMovieLike(card) {
    let savedCard;
    const isLiked = savedMovies.some((i) => {
      savedCard = i.nameRU === card.nameRU ? i : null;
      return i.nameRU === card.nameRU;
    });
    if (!isLiked) {
      mainApi.addMovieToSaved(card).then((res) => {
        mainApi.likeCard(res, false).then((newCard) => {
          setSavedMovies([...savedMovies, newCard]);
        });

        setIsLiked(!isLiked);
      });
    } else {
      handleDeleteCard(savedCard);
    }
  }

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        element={
          <AppLayout
            setLoggedIn={setLoggedIn}
            setCurrentUser={setCurrentUser}
            isPopupOpen={isPopupOpen}
            onPopupClose={handlePopupClose}
            setSavedMovies={setSavedMovies}
            setIsRegistrationOk={setIsRegistrationOk}
            setIsChangeInfoOk={setIsChangeInfoOk}
          />
        }
      >
        <Route path="/" element={<Layout handlePopupOpen={handlePopupOpen} />}>
          <Route index element={<Main />} />

          <Route element={<ProtectedRoute user={currentUser} />}>
            <Route
              path="movies"
              index
              element={
                <Movies
                  onSearchFormSubmit={getMoviesCards}
                  cards={cards}
                  isLoading={isLoading}
                  handleLike={handleMovieLike}
                />
              }
            />

            <Route
              path="saved-movies"
              element={
                <Movies
                  onSearchFormSubmit={filterSavedMoviesCards}
                  handleDeleteCard={handleDeleteCard}
                />
              }
            />
          </Route>
        </Route>
        <Route element={<ProtectedRoute user={currentUser} />}>
          <Route
            path="profile"
            element={<Profile onPopupOpen={handlePopupOpen} />}
          />
        </Route>
        <Route path="signin" element={<Login />} />
        <Route path="signup" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );

  return (
    <AppContext.Provider
      value={{
        loggedIn: loggedIn,
        isRegistrationOk: isRegistrationOk,
        isChangeInfoOk: isChangeInfoOk,
        isDeleted: isDeleted,
        isLiked: isLiked,
        isSwitchOn: isSwitchOn,
        onSwitchToggle: onSwitchToggle,
        getSavedMoviesCards: getSavedMoviesCards,
      }}
    >
      <CurrentUserContext.Provider value={{ currentUser, savedMovies }}>
        <RouterProvider router={router} />
      </CurrentUserContext.Provider>
    </AppContext.Provider>
  );
}

export default App;
