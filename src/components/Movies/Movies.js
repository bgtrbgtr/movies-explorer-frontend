import { useState } from "react";
import { MoviesCardList, SearchForm, Preloader } from "..";

function Movies({
  onSearchFormSubmit,
  cards,
  isLoading,
  handleLike,
  handleDeleteCard,
}) {
  const [searchQuery, setSearchQuery] = useState();
  const [firstRender, setFirstRender] = useState(true);

  return (
    <section className="movies">
      <SearchForm
        onSearchFormSubmit={onSearchFormSubmit}
        onSearchQueryInput={setSearchQuery}
        setFirstRender={setFirstRender}
        firstRender={firstRender}
      />
      {isLoading ? (
        <Preloader />
      ) : (
        <MoviesCardList
          cards={cards}
          searchQuery={searchQuery}
          handleLike={handleLike}
          handleDeleteCard={handleDeleteCard}
          firstRender={firstRender}
        />
      )}
    </section>
  );
}

export default Movies;
