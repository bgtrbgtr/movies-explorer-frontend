import { useContext, useEffect } from "react";
import { AppContext, CurrentUserContext } from "../../contexts";
import { useForm } from "react-hook-form";
import { Button } from "..";

function SearchForm({ onSearchFormSubmit, onSearchQueryInput }) {
  const { register, handleSubmit, getValues } = useForm({
    mode: "onChange",
  });

  const appContext = useContext(AppContext);
  const userContext = useContext(CurrentUserContext);
  const savedMovies = userContext.savedMovies;
  const isSavedMoviesSwitchOn = appContext.isSavedMoviesSwitchOn;
  const onSwitchToggle = appContext.onSaveMoviesSwitchToggle;

  const onSubmitSavedMovies = (data) => {
    onSearchFormSubmit(savedMovies, data);
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
          localStorage.setItem(
            "searchSavedMoviesQuery",
            JSON.stringify(data.film)
          );
          onSearchQueryInput(data.film);
          onSubmitSavedMovies(data.film);
        })}
        className="movies__search-form"
      >
        <input
          {...register("film", {
            value: JSON.parse(localStorage.getItem("searchSavedMoviesQuery")),
          })}
          placeholder="Фильм"
          type="search"
          className="movies__search-form-input"
        ></input>
        <Button type="submit" className="movies__search-form-input-button" />
      </form>
      <div className="movies__search-form-switch-box">
        <label className="movies__search-form-filter-switch">
          <input
            {...register("switch", { value: isSavedMoviesSwitchOn })}
            onClick={onSwitchToggle}
            className="movies__search-form-input-switch"
            type="checkbox"
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
