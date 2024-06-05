// Открытие модального окна
function openModal(popup) {
  popup.classList.toggle("popup_is-opened");
  document.addEventListener("keydown", closeModalByEsc);
}

// Закрытие модального окна

function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeModalByEsc);
}

// Закрытие модального окна по overlay

function closeModalByOverlay(evt) {
  if (evt.target.classList.contains("popup_is-opened")) {
    closeModal(evt.target);
  }
}

// Закрытие модального окна по Escape

function closeModalByEsc(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    closeModal(openedPopup);
  }
}

export { openModal, closeModal, closeModalByOverlay };
