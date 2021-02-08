// Попап редактирования профиля
export const popupChangeProfile = document.querySelector('.popup_type_edit-profile')
export const editPopupChangeProfileButton = document.querySelector('.profile__edit-button')
export const formChangeProfile = popupChangeProfile.querySelector('.form_type_change-profile')
export const nameInputChangeProfile = formChangeProfile.name
export const jobInputChangeProfile = formChangeProfile.job

// Попап добавления карточек
export const openPopupAddCardButton = document.querySelector('.profile__add-button')
export const formAddCard = document.querySelector('.form_type_add-card')
export const nameInputAddCard = formAddCard.name
export const linkInputAddCard = formAddCard.link

// Список карточек
export const listCards = document.querySelector('.elements__list')

// Попап изображения
export const popupImageSelector = '.popup_type_modal'
export const popupImage = document.querySelector(popupImageSelector)

export const validationConfig = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_disabled',
  inputErrorClass: 'form__input_state_invalid'
}