import "./pages/index.css";

import { initialCards } from "./scripts/cards.js";

import { addCard, deleteCard, likeCard } from "./scripts/components/card.js";

import { openPopup, closePopup } from "./scripts/components/modal.js";

import { addEventListenerFunction } from "./scripts/components/modal.js";
// @todo: Темплейт карточки
// @todo: DOM узлы
const cardsContainer = document.querySelector(".places__list");
//
// @todo: Вывести карточки на страницу
initialCards
  .map((card) => addCard(card, deleteCard, likeCard, handleImageClick))
  .forEach((card) => cardsContainer.append(card));

const editPopupButton = document.querySelector(".profile__edit-button"); //
const popupProfileEdit = document.querySelector(".popup_type_edit"); //

const profileAddButton = document.querySelector(".profile__add-button"); //
const closePopupButton = document.querySelectorAll(".popup__close"); //

const imageButtons = document.querySelectorAll(".card__image"); //
const popupAddCard = document.querySelector(".popup_type_new-card"); //
const popupImage = document.querySelector(".popup_type_image"); //
const popupBg = document.querySelector(".page__content"); //

editPopupButton.addEventListener("click", () => {
  openPopup(popupProfileEdit);
  const formEditProfile = document.querySelector(".popup_type_edit .popup__form");
  // Находим поля формы в DOM
  const nameInput = formEditProfile.querySelector(".popup__input_type_name"); // Воспользуйтесь инструментом .querySelector()
  const jobInput = formEditProfile.querySelector(".popup__input_type_description"); // Воспользуйтесь инструментом .querySelector()

  nameInput.value = document.querySelector(".profile__title").textContent;
  jobInput.value = document.querySelector(".profile__description").textContent;
});

profileAddButton.addEventListener("click", () => {
  openPopup(popupAddCard);
});

imageButtons.forEach(function (elem) {
  elem.addEventListener("click", () => {
    openPopup(popupImage);
  });
});

addEventListenerFunction(popupProfileEdit);
addEventListenerFunction(popupAddCard);
addEventListenerFunction(popupImage);

//РЕДАКТИРОВАНИЕ ПРОФИЛЯ
// Находим форму в DOM
const formEditProfile = document.querySelector(".popup_type_edit .popup__form");
// Находим поля формы в DOM
const nameInput = formEditProfile.querySelector(".popup__input_type_name"); // Воспользуйтесь инструментом .querySelector()
const jobInput = formEditProfile.querySelector(".popup__input_type_description"); // Воспользуйтесь инструментом .querySelector()

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Получите значение полей jobInput и nameInput из свойства value
  const name = nameInput.value;
  const job = jobInput.value;
  // Выберите элементы, куда должны быть вставлены значения полей
  const form = document.querySelector(".profile__info");
  const formName = form.querySelector(".profile__title");
  const formJob = form.querySelector(".profile__description");
  // Вставьте новые значения с помощью textContent\
  formName.textContent = name;
  formJob.textContent = job;

  document
    .querySelector(".popup_type_edit")
    .classList.remove("popup_is-opened");
  formEditProfile.reset();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formEditProfile.addEventListener("submit", handleFormSubmit);

//ДОБАВЛЕНИЕ НОВОЙ КАРТОЧКИ ЧЕРЕЗ ФОРМУ

const formCardAdd = document.querySelector(".popup_type_new-card .popup__form");
const nameCardInput = formCardAdd.querySelector(".popup__input_type_card-name");
const urlInput = formCardAdd.querySelector(".popup__input_type_url");

function handleFormAddCard(evt) {
  evt.preventDefault();

  const name = nameCardInput.value;
  const link = urlInput.value;

  const newCard = addCard(
    { name, link },
    deleteCard,
    likeCard,
    handleImageClick
  );
  const popupNewCard = document.querySelector(".popup_type_new-card");
  cardsContainer.prepend(newCard);

  popupNewCard.classList.remove("popup_is-opened");

  formCardAdd.reset();
}

formCardAdd.addEventListener("submit", handleFormAddCard);

//ОТКРЫТИЕ МОДАЛКИ С КАРТИНКОЙ
const imageInPopup = popupImage.querySelector(".popup__image");
const captionInPopup = popupImage.querySelector(".popup__caption");

export function handleImageClick(cardData) {
  imageInPopup.src = cardData.link;
  imageInPopup.alt = cardData.name;
  imageInPopup.textContent = cardData.name;
  captionInPopup.textContent = cardData.name;

  openPopup(popupImage);
}
