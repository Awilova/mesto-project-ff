// Улучшенный UX всех форм
export function loadingButton(loading, popupName) {
  const popupButtonLoading = popupName.querySelector(".popup__button");
  if (loading) {
    popupButtonLoading.textContent = "Сохранение...";
  } else {
    popupButtonLoading.textContent = "Сохранить";
  }
}
