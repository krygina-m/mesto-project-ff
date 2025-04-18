import { removeLikeCard, checkLikeCard, deleteCard as removeCard } from "./api";
function addCard(data, profileId, deleteCard, likeCard, handleImageClick) {
  const name = data.name;
  const link = data.link;
  const cardId = data._id;

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
    deleteButton.addEventListener("click", () => deleteCard(cardElement, cardId));
  }

  const cardLike = cardElement.querySelector(".card__like-button");
  const likeCount = cardElement.querySelector(".card__like-counter");
  if (data.likes.length != 0) {
    likeCount.textContent = data.likes.length;
  }
  cardLike.addEventListener("click", () => likeCard(event, cardId, likeCount));

  const cardImage = cardElement.querySelector(".card__image");
  cardImage.addEventListener("click", () => handleImageClick(data));

  return cardElement;
}

// @todo: Функция удаления карточки
function deleteCard(cardElement, cardId) {
  removeCard(cardId)
  .then(() => {
    cardElement.remove();
  })
  .catch((err) => {
    console.log(`Ошибка при удалении карточки: ${err}`);
  });
}

// @todo: Функция лайка карточки
function likeCard(evt, cardId, likeCount) {
  const isLiked = evt.target.classList.contains("card__like-button_is-active");
  const likeMethod = isLiked ? removeLikeCard : checkLikeCard;

  likeMethod(cardId)
    .then((data) => {
      likeCount.textContent = data.likes.length;
      if (isLiked) {
        evt.target.classList.remove("card__like-button_is-active");
        if (data.likes.length === 0) {
          likeCount.textContent = '';
        }
      } else {
        evt.target.classList.add("card__like-button_is-active");
      }
    })
    .catch((err) => {
      console.log(
        `Ошибка: ${err}`
      );
    });
}

export { addCard, deleteCard, likeCard };
