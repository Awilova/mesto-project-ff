export const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

// @todo: Функция создания карточки

function createCard(
  data,
  deleteCardCallback,
  likeCardCallback,
  clickImageCallback
) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const cardImageClick = cardElement.querySelector(".card__image");

  cardElement.querySelector(".card__image").src = data.link;
  cardElement.querySelector(".card__image").alt = data.name;
  cardElement.querySelector(".card__title").textContent = data.name;

  deleteButton.addEventListener("click", function () {
    deleteCardCallback(cardElement);
  });

  function likeCardCallback(e) {
    e.target.classList.toggle("card__like-button_is-active");
  }

  likeButton.addEventListener("click", likeCardCallback);

  function clickImageCallback() {
    document.querySelector(".popup__image").src = data.link;
    document.querySelector(".popup__caption").textContent = data.name;
  }
  cardImageClick.addEventListener("click", clickImageCallback);

  return cardElement;
}

// Функция вывода карточек

function renderCards() {
  const listElement = document.querySelector(".places__list");
  while (listElement.firstChild) {
    listElement.removeChild(listElement.firstChild);
  }
  initialCards.forEach((cardData) => {
    const card = createCard(cardData, function (cardElement) {
      cardElement.remove();
    });
    listElement.appendChild(card);
  });
}

// Функция добавления карточки

const inputNameOfCard = document.querySelector(".popup__input_type_card-name");
const inputLinkOfCard = document.querySelector(".popup__input_type_url");

function handleClickAddCard(e) {
  e.preventDefault();
  const newCard = {
    name: inputNameOfCard.value,
    link: inputLinkOfCard.value,
  };
  initialCards.unshift(newCard);
  renderCards();

  inputNameOfCard.value = "";
  inputLinkOfCard.value = "";
}

export {renderCards, handleClickAddCard};
