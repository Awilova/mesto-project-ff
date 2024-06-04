import {} from "./pages/index.css";
import { createCard, deleteCard, likeCard } from "./components/card.js";
import { openModal, closeModal } from "./components/modal.js";
import {
  validationStructure,
  enableValidation,
  clearValidation,
} from "./components/validation.js";
import {
  getUserProfile,
  getCards,
  editProfile,
  addCard,
  changeAvatar,
} from "./components/api.js";

// Переменные - создание и редактирование карточки

const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const listElement = document.querySelector(".places__list");
const profilePopup = document.querySelector(".popup_type_edit");
const cardPopup = document.querySelector(".popup_type_new-card");
const imagePopup = document.querySelector(".popup_type_image");
const avatarPopup = document.querySelector(".popup_type_change_avatar");

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
const imageProfile = document.querySelector(".profile__picture");
const avatarEditButton = document.querySelector(
  ".profile__picture_change_button"
);
const formAvatar = document.querySelector(".popup_form_change_avatar");

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
  clearValidation(profilePopup, validationStructure);
  openModal(profilePopup);
}

function handleClickOpenAddCard() {
  clearValidation(profilePopup, validationStructure);
  openModal(cardPopup);
}

function handleClickOpenAvatar() {
  clearValidation(formAvatar, validationStructure);
  openModal(avatarPopup);
}

profileEditButton.addEventListener("click", handleClickModalEdit);
profileAddButton.addEventListener("click", handleClickOpenAddCard);
avatarEditButton.addEventListener("click", handleClickOpenAvatar);

// Редактирование профиля
function handleFormProfileSubmit(e) {
  e.preventDefault();
  loadingButton(true, profilePopup);
  nameContent.textContent = nameInput.value;
  jobContent.textContent = jobInput.value;

  editProfile(nameContent.textContent, jobContent.textContent)
    .then((user) => {
      nameContent.textContent = user.name;
      jobContent.textContent = user.about;
      closeModal(profilePopup);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      loadingButton(false, profilePopup);
    });
}

formProfile.addEventListener("submit", handleFormProfileSubmit);

// Добавление карточки
function handleClickAddCard(e) {
  e.preventDefault();
  loadingButton(true, cardPopup);
  const nameOfCard = inputNameOfCard.value;
  const linkOfCard = inputLinkOfCard.value;
  addCard(nameOfCard, linkOfCard)
    .then((card) => {
      const newCard = createCard(
        card,
        deleteCard,
        likeCard,
        clickImage,
        card.owner._id
      );
      listElement.prepend(newCard);

      inputNameOfCard.value = "";
      inputLinkOfCard.value = "";

      closeModal(cardPopup);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      loadingButton(false, cardPopup);
    });
}

formCard.addEventListener("submit", handleClickAddCard);

// Обновление аватара пользователя
function handleFormAvatarSubmit(e) {
  e.preventDefault();
  loadingButton(true, avatarPopup);
  const inputUrlValue = document.querySelector(
    ".popup__input_type_avatar_url"
  ).value;
  changeAvatar(inputUrlValue)
    .then((user) => {
      imageProfile.src = user.avatar;
      closeModal(avatarPopup);
      formAvatar.reset();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      loadingButton(false, avatarPopup);
    });
}

formAvatar.addEventListener("submit", handleFormAvatarSubmit);

// Включение валидации

enableValidation(validationStructure);

// Промисы

Promise.all([getUserProfile(), getCards()])
  .then(([user, cards]) => {
    nameContent.textContent = user.name;
    jobContent.textContent = user.about;
    imageProfile.src = user.avatar;

    cards.forEach((card) => {
      const newCard = createCard(
        card,
        deleteCard,
        likeCard,
        clickImage,
        user._id
      );

      listElement.appendChild(newCard);
    });
  })
  .catch((err) => {
    console.log(err);
  });

// Улучшенный UX всех форм
function loadingButton(loading, popupName) {
  const popupButtonLoading = popupName.querySelector(".popup__button");
  if (loading) {
    popupButtonLoading.textContent = "Сохранение...";
  } else {
    popupButtonLoading.textContent = "Сохранить";
  }
}
