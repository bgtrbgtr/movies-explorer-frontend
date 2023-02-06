import { useContext, useEffect } from "react";
import { AppContext, CurrentUserContext, NavContext } from "../../contexts";
import { useForm } from "react-hook-form";
import { Button } from "..";

function SearchForm({
  onSearchFormSubmit,
  onSearchQueryInput,
  setFirstRender,
}) {
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm({ mode: "onChange" });

  const appContext = useContext(AppContext);
  const userContext = useContext(CurrentUserContext);
  const savedMovies = userContext.savedMovies;
  const navContext = useContext(NavContext);
  const location = navContext.location;
  const isSwitchOn = appContext.isSwitchOn;

  const onSubmit = (data) => {
    return location === "/movies"
      ? onSearchFormSubmit()
      : onSearchFormSubmit(savedMovies, data);
  };

  const onRender = () => {
    setFirstRender(false);
  };

  useEffect(() => {
    let form = document.querySelector(".movies__search-form");
    let submitButton = document.querySelector(
      ".movies__search-form-input-button"
    );

    if (getValues().film) {
      form.requestSubmit(submitButton);
    }
  }, []);

  return (
    <>
      <form
        onSubmit={handleSubmit((data) => {
          localStorage.setItem("searchQuery", JSON.stringify(data.film));
          onSearchQueryInput(data.film);
          onSubmit(data.film);
        })}
        className="movies__search-form"
      >
        {location === "movies" ? (
          <input
            {...register("film", {
              required: "Нужно ввести ключевое слово",
              value: JSON.parse(localStorage.getItem("searchQuery")),
            })}
            placeholder={errors.film ? `${errors.film.message}` : "Фильм"}
            type="search"
            name="film"
            className={
              errors.film
                ? "movies__search-form-input movies__search-form-input-invalid"
                : "movies__search-form-input"
            }
          ></input>
        ) : (
          <input
            {...register("film")}
            placeholder="Фильм"
            type="search"
            name="film"
            className="movies__search-form-input"
          ></input>
        )}
        <Button
          type="submit"
          className="movies__search-form-input-button"
          onClick={onRender}
        />
      </form>
      <div className="movies__search-form-switch-box">
        <label className="movies__search-form-filter-switch">
          <input
            {...register("switch", { value: isSwitchOn })}
            onClick={appContext.onSwitchToggle}
            className="movies__search-form-input-switch"
            type="checkbox"
            name="shortFilm"
          ></input>
          <span className="movies__search-form-slider"></span>
        </label>
        <label className="movies__search-form-switch-caption">
          Короткометражки
        </label>
      </div>
    </>
  );
}

export default SearchForm;
