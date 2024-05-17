const popUps = document.querySelectorAll(".popup");

function openModal(e, PopUpIndex) {
  if (
    !(
      (e.type === "click" &&
        e.target.classList.contains("card__like-button")) ||
      e.target.classList.contains("card__delete-button")
    )
  ) {
    const popup = popUps[PopUpIndex];
    popup.classList.toggle("popup_is-opened");
  }
}

function closeModal(e, index) {
  if (
    (e.type === "keydown" && e.key === "Escape") ||
    (e.type === "click" && e.target.classList.contains("popup"))
  ) {
    popUps.forEach((popup) => popup.classList.remove("popup_is-opened"));
  } else if (
    (e.type === "click" && e.target.classList.contains("popup__close")) ||
    e.target.classList.contains("popup__button")
  ) {
    const popup = popUps[index];
    popup.classList.remove("popup_is-opened");
  }
}

export { openModal, closeModal };
