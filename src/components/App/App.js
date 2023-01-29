import { useState, useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import {
  Main,
  Movies,
  Profile,
  Login,
  Register,
  NotFound,
  Layout,
  MenuPopup,
} from "..";
import { AppContext } from "../../contexts/AppContext";
import { moviesApi } from "../../utils/MoviesApi";

function App() {
  let location = useLocation();
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(true);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);
  const [cards, setCards] = useState();

  function getMoviesCards() {
    moviesApi
      .getMoviesInfo()
      .then((cards) => {
        setCards(cards);
      })
      .catch((e) => console.error());
  }

  function handleLogout() {
    setLoggedIn(false);
    navigate("/");
  }

  useEffect(() => {
    getMoviesCards();
  }, []);

  const handlePopupClose = () => {
    setIsPopupOpen(false);
  };

  const handlePopupOpen = () => {
    setIsPopupOpen(true);
  };

  return (
    <AppContext.Provider
      value={{
        location: location,
        loggedIn: loggedIn,
      }}
    >
      <div className="page">
        <Routes>
          <Route
            path="/"
            element={<Layout handlePopupOpen={handlePopupOpen} />}
          >
            <Route index element={<Main />} />
            <Route path="movies" element={<Movies cards={cards} />} />
            <Route path="saved-movies" element={<Movies cards={cards} />} />
          </Route>
          <Route
            path="profile"
            element={
              <Profile
                onPopupOpen={handlePopupOpen}
                handleLogout={handleLogout}
              />
            }
          />
          <Route path="signin" element={<Login />} />
          <Route path="signup" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <MenuPopup isOpen={isPopupOpen} onClose={handlePopupClose} />
      </div>
    </AppContext.Provider>
  );
}

export default App;
