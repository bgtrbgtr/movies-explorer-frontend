import { useForm } from "react-hook-form";
import { Button } from "..";

function SearchForm() {
  const { register, handleSubmit } = useForm();
  const onSubmit = (e) => e.preventDefault();

  return (
    <>
      <form className="search-form__form">
        <input
          {...register("film", { required: true })}
          placeholder="Фильм"
          type="search"
          className="search-form__input"
          onSubmit={handleSubmit(onSubmit)}
        ></input>
        <Button type="submit" className="search-form__form-button" />
      </form>
      <div className="search-form__switch-box">
        <label className="search-form__filter-switch">
          <input
            {...register("shortFilm")}
            className="search-form__input-switch"
            type="checkbox"
          ></input>
          <span className="search-form__slider"></span>
        </label>
        <label className="search-form__switch-caption">Короткометражки</label>
      </div>
    </>
  );
}

export default SearchForm;
