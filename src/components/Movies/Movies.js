import { MoviesCardList, SearchForm } from "..";

function Movies({ cards }) {
  return (
    <section className="movies">
      <SearchForm />
      <MoviesCardList cards={cards} />
    </section>
  );
}

export default Movies;
