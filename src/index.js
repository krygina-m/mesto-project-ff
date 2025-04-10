

// @todo: Функция создания карточки

/*function addCard({ name, link }, deleteCard) {
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
}*/
import './pages/index.css';

import { initialCards } from './scripts/cards.js';

import { addCard, deleteCard, likeCard } from './scripts/components/card.js';

import { openPopup, closePopup } from './scripts/components/modal.js';

import { addEventListenerFunction } from './scripts/components/modal.js';
// @todo: Темплейт карточки
// @todo: DOM узлы
/*const cardTemp = document.querySelector('#card-template').content;
const addButton = document.querySelector('.profile__add-button');*/
const cardsContainer = document.querySelector(".places__list");
//
// @todo: Вывести карточки на страницу
initialCards
  .map((card) => addCard(card, deleteCard, likeCard))
  .forEach((card) => cardsContainer.append(card));


const editPopupButton = document.querySelector('.profile__edit-button');// 
const popupProfileEdit = document.querySelector('.popup_type_edit'); // 

const profileAddButton = document.querySelector('.profile__add-button');//
const closePopupButton = document.querySelectorAll('.popup__close'); //
 
const imageButton = document.querySelector('.card__image');// 
const popupAddCard = document.querySelector('.popup_type_new-card'); // 
const popupImage = document.querySelector('.popup_type_image');// 
const popupBg = document.querySelector('.page__content'); //


editPopupButton.addEventListener("click", () => {
  openPopup(popupProfileEdit);
});

profileAddButton.addEventListener("click", () => {
  openPopup(popupAddCard);
});

imageButton.addEventListener("click", () => {
  openPopup(popupImage);
});

addEventListenerFunction(popupProfileEdit);
addEventListenerFunction(popupAddCard);
addEventListenerFunction(popupImage);

/*closePopupButton.addEventListener("click", () => {
  const popupOpened = document.querySelector('.popup_is-opened');
  closePopup(popupOpened);
});*/

//РЕДАКТИРОВАНИЕ ПРОФИЛЯ
// Находим форму в DOM
const formEditProfile = document.querySelector('.popup_type_edit .popup__form');
// Находим поля формы в DOM
const nameInput = formEditProfile.querySelector('.popup__input_type_name'); // Воспользуйтесь инструментом .querySelector()
const jobInput = formEditProfile.querySelector('.popup__input_type_description');// Воспользуйтесь инструментом .querySelector()

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Получите значение полей jobInput и nameInput из свойства value
    const name = nameInput.value;
    const job = jobInput.value;
    // Выберите элементы, куда должны быть вставлены значения полей
    const form = document.querySelector('.popup_type_edit .popup__form');
    const formName = form.querySelector('.popup__input_type_name');
    const formJob = form.querySelector('.popup__input_type_description');
    // Вставьте новые значения с помощью textContent\
    formName.textContent = name;
    formJob.textContent = job;
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formEditProfile.addEventListener('submit', handleFormSubmit);

//ДОБАВЛЕНИЕ НОВОЙ КАРТОЧКИ ЧЕРЕЗ ФОРМУ

const formCardAdd = document.querySelector('.popup_type_new-card .popup__form');

const nameCardInput = formCardAdd.querySelector('.popup__input_type_card-name');
const urlInput = formCardAdd.querySelector('.popup__input_type_url');

function handleFormAddCard(evt) {
  evt.preventDefault();
  const name = nameCardInput.value;
  const url = urlInput.value;

  const newCard = addCard({name, url}, deleteCard, likeCard);
  const popupNewCard = document.querySelector('.popup_type_new-card');
  cardsContainer.prepend(newCard);

  popupNewCard.classList.remove('popup_is-opened');

  formCardAdd.reset();
}

formCardAdd.addEventListener('submit', handleFormAddCard);
 
