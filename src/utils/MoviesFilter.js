export const defineLimitToSet = (screenWidth, setLimit, setCardsToUpload) => {
  if (screenWidth > 768) {
    setLimit(12);
    setCardsToUpload(3);
  } else if (screenWidth > 480) {
    setLimit(8);
    setCardsToUpload(2);
  } else {
    setLimit(5);
    setCardsToUpload(2);
  }
};

export const getSearchResults = (cards, searchQuery) => {
  let result = cards?.filter((card) => {
    return (
      card?.nameRU.toLowerCase().indexOf(searchQuery?.toLowerCase()) !== -1
    );
  });

  return result;
};

export const getShortFilmsFromResults = (searchResults) => {
  return searchResults?.filter((film) => {
    return film.duration < 40;
  });
};
