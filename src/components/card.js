// Создание карточки

function createCard(
  data,
  deleteCardCallback,
  likeCardCallback,
  clickImageCallback
) {
  const { name, link } = data;
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");

  cardTitle.textContent = name;
  cardImage.src = link;
  cardImage.alt = name;

  deleteButton.addEventListener("click", () => deleteCardCallback(cardElement));
  likeButton.addEventListener("click", () => likeCardCallback(likeButton));
  cardImage.addEventListener("click", () => clickImageCallback(name, link));

  return cardElement;
}

// Удаление карточки

function deleteCard(cardElement) {
  cardElement.remove();
}

// Лайк карточки

function likeCard(likeButton) {
  likeButton.classList.toggle("card__like-button_is-active");
}

export { createCard, deleteCard, likeCard };
