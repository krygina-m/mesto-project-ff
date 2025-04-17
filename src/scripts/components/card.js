function addCard(data, profileId, deleteCard, likeCard, handleImageClick) {
  const name = data.name;
  const link = data.link;
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  cardElement.querySelector(".card__title").textContent = name;
  cardElement.querySelector(".card__image").src = link;
  cardElement.querySelector(".card__image").alt = name;
  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => deleteCard(cardElement));

  if (data.owner._id !== profileId) {
    deleteButton.remove();
  } else {
    deleteButton.addEventListener("click", () => deleteCard(cardElement));
  }

  const cardLike = cardElement.querySelector(".card__like-button");
  cardLike.addEventListener("click", () => likeCard(cardLike));

  const cardImage = cardElement.querySelector(".card__image");
  cardImage.addEventListener("click", () => handleImageClick(data));

  return cardElement;
}

// @todo: Функция удаления карточки
function deleteCard(cardElement) {
  cardElement.remove();
}

function likeCard(cardLike) {
  cardLike.classList.toggle("card__like-button_is-active");
}

export { addCard, deleteCard, likeCard };
