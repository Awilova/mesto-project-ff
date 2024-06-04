import { addLike, removeLike, deleteServCard } from "./api.js";

// Создание карточки

function createCard(
  data,
  deleteCardCallback,
  likeCardCallback,
  clickImageCallback,
  userId
) {
  const { name, link, _id, owner, likes } = data;
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const likeCount = cardElement.querySelector(".card__like-number");
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardId = _id;
  const likeGet = likes.some((like) => like._id === userId);

  cardTitle.textContent = name;
  cardImage.src = link;
  cardImage.alt = name;
  likeCount.textContent = likes.length;

  if (likeGet) {
    likeButton.classList.add("card__like-button_is-active");
  }

  if (owner._id !== userId) {
    deleteButton.style.display = "none";
  } else {
    deleteButton.addEventListener("click", () =>
      deleteCardCallback(cardId, cardElement)
    );
  }

  likeButton.addEventListener("click", () =>
    likeCardCallback(likeButton, likeCount, cardId)
  );
  cardImage.addEventListener("click", () => clickImageCallback(name, link));

  return cardElement;
}

// Удаление карточки

function deleteCard(cardId, cardElement) {
  deleteServCard(cardId)
    .then(() => {
      cardElement.remove();
    })
    .catch((err) => {
      console.log(err);
    });
}

// Лайк карточки

function likeCard(likeButton, likeCount, cardId) {
  if (likeButton.classList.toggle("card__like-button_is-active")) {
    likeCount.textContent = Number(likeCount.textContent) + 1;
    addLike(cardId)
      .then((res) => {
        likeCount.textContent = res.likes.length;
        likeButton.classList.add("card__like-button_is-active");
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    likeCount.textContent = Number(likeCount.textContent) - 1;
    removeLike(cardId)
      .then((res) => {
        likeCount.textContent = res.likes.length;
        likeButton.classList.remove("card__like-button_is-active");
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

export { createCard, deleteCard, likeCard };
