// Тоже не по ТЗ созданный файл, но если хранить функции в index.js 
// и импортировать их в Card.js, то выдает ошибку

// Поставить лайк
function likeCard(event) {
  event.target.classList.toggle('element__like_click')
}

// Удалить карту
function removeItem(event) {
  const removeItem = event.target.closest('.element')
  removeItem.remove()
}

// Открыть попап изображения
function openPopupImage(img, name) {
  picturePopupImage.src = img
  picturePopupImage.alt = name
  namePopupImage.textContent = name
  openPopup(popupImage)
}

export {likeCard, removeItem, openPopupImage}