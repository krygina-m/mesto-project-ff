// @todo: Темплейт карточки
// @todo: DOM узлы
/*const cardTemp = document.querySelector('#card-template').content;
const addButton = document.querySelector('.profile__add-button');*/
const cardsContainer = document.querySelector(".places__list");

// @todo: Функция создания карточки

function addCard({ name, link }, deleteCard) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  cardElement.querySelector(".card__title").textContent = name;
  cardElement.querySelector(".card__image").src = link;
  cardElement.querySelector(".card__image").alt = name;
  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => deleteCard(cardElement));

  return cardElement;
}

// @todo: Функция удаления карточки
function deleteCard(cardElement) {
  cardElement.remove();
}

// @todo: Вывести карточки на страницу
initialCards
  .map((card) => addCard(card, deleteCard))
  .forEach((card) => cardsContainer.append(card));
