//----------------------Функции-----------------------//
import {popupChangeProfile,
  profileName,
  profileJob,
  nameInputChangeProfile,
  jobInputChangeProfile,
  popupAddCard,
  placeInputAddCard,
  linkInputAddCard,
  popupImage,
  picturePopupImage,
  namePopupImage,} from './constants.js'

// Поставить лайк
export function likeCard(event) {
  event.target.classList.toggle('element__like_click')
}

// Удалить карту
export function removeItem(event) {
  const removeItem = event.target.closest('.element')
  removeItem.remove()
}

// Открыть попап изображения
export function openPopupImage(img, name) {
  picturePopupImage.src = img
  picturePopupImage.alt = name
  namePopupImage.textContent = name
  openPopup(popupImage)
}

// Открыть любой попап
export function openPopup(popup) {
  popup.classList.add('popup_opened')
  document.addEventListener('keydown', closePopupWithEsc)
}

// Закрыть любой попап
export function closePopup(popup) {
  popup.classList.remove('popup_opened')
  document.removeEventListener('keydown', closePopupWithEsc)
}

// Закрыть попап с помощью Esc
export function closePopupWithEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened')
    closePopup(openedPopup)
  }
}

// Замена имени и деятельности
export function handleProfileSubmit(evt) {
  evt.preventDefault()
  profileName.textContent = nameInputChangeProfile.value
  profileJob.textContent = jobInputChangeProfile.value
  closePopup(popupChangeProfile)
}