import {} from "./pages/index.css";
import { initialCards } from "./components/cards.js";
import { createCard, deleteCard, likeCard } from "./components/card.js";
import { openModal, closeModal } from "./components/modal.js";

// Переменные - создание и редактирование карточки

const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const listElement = document.querySelector(".places__list");
const profilePopup = document.querySelector(".popup_type_edit");
const cardPopup = document.querySelector(".popup_type_new-card");
const imagePopup = document.querySelector(".popup_type_image");

const cardPopupCaption = imagePopup.querySelector(".popup__caption");
const cardPopupImage = imagePopup.querySelector(".popup__image");

// Переменные - добавление карточки на страницу

const formCard = cardPopup.querySelector(".popup__form");
const inputNameOfCard = document.querySelector(".popup__input_type_card-name");
const inputLinkOfCard = document.querySelector(".popup__input_type_url");

// Переменные - редактирование имени и информации о себе

const formProfile = profilePopup.querySelector(".popup__form");
const nameInput = formProfile.querySelector(".popup__input_type_name");
const jobInput = formProfile.querySelector(".popup__input_type_description");
const nameContent = document.querySelector(".profile__title");
const jobContent = document.querySelector(".profile__description");

// Вывод карточек на экран

export function renderCards() {
  initialCards.forEach((data) => {
    const card = createCard(data, deleteCard, likeCard, clickImage);
    listElement.appendChild(card);
  });
}

renderCards();

// Открытие модального окна

export function clickImage(name, link) {
  cardPopupCaption.textContent = name;
  cardPopupImage.src = link;
  cardPopupImage.alt = name;
  openModal(imagePopup);
}

function handleClickModalEdit() {
  nameInput.value = nameContent.textContent;
  jobInput.value = jobContent.textContent;
  openModal(profilePopup);
}

function handleClickOpenAddCard() {
  openModal(cardPopup);
}

profileEditButton.addEventListener("click", handleClickModalEdit);
profileAddButton.addEventListener("click", handleClickOpenAddCard);

// Редактирование профиля

function handleFormProfileSubmit(e) {
  e.preventDefault();

  nameContent.textContent = nameInput.value;
  jobContent.textContent = jobInput.value;

  closeModal(profilePopup);
}

formProfile.addEventListener("submit", handleFormProfileSubmit);

// Добавление карточки

function handleClickAddCard(e) {
  e.preventDefault();

  const newCard = createCard(
    {
      name: inputNameOfCard.value,
      link: inputLinkOfCard.value,
    },
    deleteCard,
    likeCard,
    clickImage
  );

  listElement.prepend(newCard);

  inputNameOfCard.value = "";
  inputLinkOfCard.value = "";

  closeModal(cardPopup);
}

formCard.addEventListener("submit", handleClickAddCard);
