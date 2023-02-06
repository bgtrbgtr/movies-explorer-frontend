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
    let onDescription =
      card?.description.toLowerCase().indexOf(searchQuery?.toLowerCase()) !==
      -1;
    let onNameRU =
      card?.nameRU.toLowerCase().indexOf(searchQuery?.toLowerCase()) !== -1;

    let onNameEN =
      card?.nameEN.toLowerCase().indexOf(searchQuery?.toLowerCase()) !== -1;
    return onDescription || onNameRU || onNameEN;
  });

  return result;
};

export const getShortFilmsFromResults = (searchResults) => {
  return searchResults?.filter((film) => {
    return film.duration < 40;
  });
};
