import {} from "./index.css";
import { renderCards, handleClickAddCard } from "../components/cards.js";
import { openModal, closeModal } from "../components/modal.js";

// @todo: Темплейт карточки
// @todo: DOM узлы

const ProfileEditButton = document.querySelector(".profile__edit-button");
const ProfileAddButton = document.querySelector(".profile__add-button");
const listElement = document.querySelector(".places__list");
const popUps = document.querySelectorAll(".popup");

// @todo: Вывести карточки на страницу

document.addEventListener("DOMContentLoaded", renderCards);

// Открытие модального окна

ProfileEditButton.addEventListener("click", (e) => openModal(e, 0));
ProfileAddButton.addEventListener("click", (e) => openModal(e, 1));
listElement.addEventListener("click", (e) => openModal(e, 2));

// Закрытие модального окна

document.addEventListener("keydown", closeModal);
popUps.forEach((popup, index) =>
  popup.addEventListener("click", (e) => closeModal(e, index))
);

//Редактирование имени и информации о себе

const formElement = document.querySelector(".popup__form");
const nameInput = formElement.querySelector(".popup__input_type_name");
const jobInput = formElement.querySelector(".popup__input_type_description");
const modalEdit = document.querySelector(".profile__edit-button");
const nameContent = document.querySelector(".profile__title");
const jobContent = document.querySelector(".profile__description");

// Обработчик «отправки» формы

function handleFormSubmit(e) {
  e.preventDefault();
}

function handleClickModalEdit() {
  nameInput.value = nameContent.textContent;
  jobInput.value = jobContent.textContent;
}

modalEdit.addEventListener("click", handleClickModalEdit);
formElement.addEventListener("submit", (e) => handleFormSubmit(e));

// Добавление карточки

const buttonAddCard = document.querySelectorAll(".popup__button");
buttonAddCard[1].addEventListener("click", (e) => handleClickAddCard(e));
