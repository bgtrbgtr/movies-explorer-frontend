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

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [cards, setCards] = useState([]);
  const token = localStorage.getItem("jwt");
  mainApi.setToken(token);
  const [loggedIn, setLoggedIn] = useState({
    status: false,
    message: "",
  });
  const [currentUser, setCurrentUser] = useState();

  const [isRegistrationOk, setIsRegistrationOk] = useState({
    status: true,
    message: "При регистрации пользователя произошла ошибка",
  });
  const [isChangeInfoOk, setIsChangeInfoOk] = useState({
    status: false,
    message: "",
  });
  const [isDeleted, setIsDeleted] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [savedMovies, setSavedMovies] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [isSavedMoviesSwitchOn, setIsSavedMoviesSwitchOn] = useState(false);

  const onSwitchToggle = (e) => {
    setIsSwitchOn(e.target.checked);
    localStorage.setItem("isSwitchOn", e.target.checked);
  };

  const onSavedMoviesSwitchToggle = (e) => {
    setIsSavedMoviesSwitchOn(e.target.checked);
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
    let formSwitchStatus = JSON.parse(localStorage.getItem("isSwitchOn"));
    setIsSwitchOn(formSwitchStatus);
  }, []);

  const downloadMoviesCards = () => {
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
          setSavedMovies([newCard, ...savedMovies]);
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
            setCards={setCards}
            setIsRegistrationOk={setIsRegistrationOk}
            setIsChangeInfoOk={setIsChangeInfoOk}
            getSavedMovies={getSavedMoviesCards}
            downloadMoviesCards={downloadMoviesCards}
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
                  cards={cards}
                  isLoading={isLoading}
                  handleLike={handleMovieLike}
                  downloadMoviesCards={downloadMoviesCards}
                />
              }
            />

            <Route
              path="saved-movies"
              element={<Movies handleDeleteCard={handleDeleteCard} />}
            />
          </Route>
        </Route>
        <Route element={<ProtectedRoute user={currentUser} />}>
          <Route
            path="profile"
            element={
              <Profile
                onPopupOpen={handlePopupOpen}
                setIsChangeInfoOk={setIsChangeInfoOk}
              />
            }
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
        isSavedMoviesSwitchOn: isSavedMoviesSwitchOn,
        onSwitchToggle: onSwitchToggle,
        onSaveMoviesSwitchToggle: onSavedMoviesSwitchToggle,
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
