import { useContext, useEffect } from "react";
import { AppContext } from "../../contexts";
import { useForm } from "react-hook-form";
import { Button } from "..";

function SearchForm({ onSearchQueryInput }) {
  const { register, handleSubmit, getValues } = useForm({
    mode: "onChange",
  });

  const appContext = useContext(AppContext);
  const isSavedMoviesSwitchOn = appContext.isSavedMoviesSwitchOn;
  const onSwitchToggle = appContext.onSaveMoviesSwitchToggle;

  useEffect(() => {
    let form = document.querySelector(".movies__search-form");
    let submitButton = document.querySelector(
      ".movies__search-form-input-button"
    );

    if (getValues().film) {
      form.requestSubmit(submitButton);
    }

    return () => onSearchQueryInput({ saved: "" });
  }, []);

  return (
    <>
      <form
        onChange={(e) => {
          if (e.target.value === "") {
            onSearchQueryInput({ saved: "" });
          }
        }}
        onSubmit={handleSubmit((data) => {
          onSearchQueryInput({ saved: data.film });
        })}
        className="movies__search-form"
      >
        <input
          {...register("film")}
          className="movies__search-form-input"
          placeholder={"Фильм"}
          type="search"
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
