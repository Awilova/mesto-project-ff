// @todo: Темплейт карточки
// @todo: DOM узлы
// @todo: Функция создания карточки
// @todo: Функция удаления карточки
// @todo: Вывести карточки на страницу

function createCard(data, deleteCardCallback) {
    const cardTemplate = document.querySelector('#card-template').content; 
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

cardElement.querySelector('.card__image').src = data.link;
cardElement.querySelector('.card__image').alt = data.name;
cardElement.querySelector('.card__title').textContent = data.name;

const deleteButton = cardElement.querySelector('.card__delete-button');

deleteButton.addEventListener('click', function () {
  deleteCardCallback(cardElement);
});
  return cardElement;
}

function renderCards() {
    const listElement = document.querySelector(".places__list");
    initialCards.forEach((cardData) => {
      const card = createCard(cardData, function (cardElement) {
        cardElement.remove(); 
      });
      listElement.appendChild(card); 
    });
  }

  document.addEventListener("DOMContentLoaded", renderCards);
