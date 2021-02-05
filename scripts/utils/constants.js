// Все попапы
export const popups = document.querySelectorAll('.popup')

// Попап редактирования профиля
export const popupChangeProfileSelector = '.popup_type_edit-profile'
export const popupChangeProfile = document.querySelector('.popup_type_edit-profile')
export const editPopupChangeProfileButton = document.querySelector('.profile__edit-button')
export const profileName = document.querySelector('.profile__title')
export const profileJob = document.querySelector('.profile__subtitle')
export const formChangeProfile = popupChangeProfile.querySelector('.form_type_change-profile')
export const nameInputChangeProfile = formChangeProfile.name
export const jobInputChangeProfile = formChangeProfile.job

// Попап добавления карточек
export const popupAddCardSelector = '.popup_type_add-card'
export const popupAddCard = document.querySelector('.popup_type_add-card')
export const openPopupAddCardButton = document.querySelector('.profile__add-button')
export const formAddCard = document.querySelector('.form_type_add-card')
export const nameInputAddCard = formAddCard.name
export const linkInputAddCard = formAddCard.link

// Список карточек
export const listCards = document.querySelector('.elements__list')

// Попап изображения
export const popupImageSelector = '.popup_type_modal'
export const popupImage = document.querySelector('.popup_type_modal')
export const picturePopupImage = popupImage.querySelector('.modal__image')
export const namePopupImage = popupImage.querySelector('.modal__title')

export const validationConfig = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_disabled',
  inputErrorClass: 'form__input_state_invalid'
}