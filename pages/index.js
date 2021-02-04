import FormValidator from '../scripts/components/FormValidator.js'
import Card from '../scripts/components/Card.js'
import Section from '../scripts/components/Section.js'
import Popup from '../scripts/components/Popup.js'
import PopupWithImage from '../scripts/components/PopupWithImage.js'
import {initialCards} from '../scripts/utils/initial-cards.js'
import {popupChangeProfileSelector,
  editPopupChangeProfileButton,
  profileName,
  profileJob,
  formChangeProfile,
  nameInputChangeProfile,
  jobInputChangeProfile,
  popupAddCardSelector,
  popupImageSelector,
  openPopupAddCardButton,
  formAddCard,
  placeInputAddCard,
  linkInputAddCard,
  listCards,
  validationConfig} from '../scripts/utils/constants.js'

// Поставить лайк
function likeCard(event) {
  event.target.classList.toggle('element__like_click')
}

// Удалить карту
function removeItem(event) {
  const removeItem = event.target.closest('.element')
  removeItem.remove()
}

//---------Отрисовка карточек-----------//
const initialCardList = new Section({
  items: initialCards,
  renderer: (item)=>{
    const card = new Card(item, "#template-card", likeCard, removeItem, handleCardClick)
    const cardElement = card.createCard()
    initialCardList.addItem(cardElement)
  }}, listCards)
initialCardList.renderItems()

function addNewCard() {
  const card = new Card({name: placeInputAddCard.value, link: linkInputAddCard.value}, "#template-card", likeCard, removeItem, handleCardClick)
  const cardElement = card.createCard()
  initialCardList.addItem(cardElement)
}
//--------------------------------------//

//-----------------Открытие попапов---------------//
function openPopup(popupSelector) {
  const popup = new Popup(popupSelector)
  popup.setEventListeners()
  popup.open()
}

function openPopupChangeProfile() {
  nameInputChangeProfile.value = profileName.textContent
  jobInputChangeProfile.value = profileJob.textContent
  profileValidator.setButtonState(formChangeProfile.checkValidity())
  profileValidator.resetValidation()
  openPopup(popupChangeProfileSelector)
}

function openPopupAddCard() {
  addCardValidator.setButtonState(formAddCard.checkValidity())
  addCardValidator.resetValidation()
  openPopup(popupAddCardSelector)
}

function handleCardClick(img, name) {
  const popup = new PopupWithImage(popupImageSelector, img, name)
  popup.setEventListeners()
  popup.open()
}
//-----------------------------------------------//


// Добавить карту
function handleCardSubmit(evt) {
  evt.preventDefault()
  addNewCard()
  closePopup(popupAddCard)
  formAddCard.reset()
}

// Замена имени и деятельности
function handleProfileSubmit(evt) {
  evt.preventDefault()
  profileName.textContent = nameInputChangeProfile.value
  profileJob.textContent = jobInputChangeProfile.value
  closePopup(popupChangeProfileSelector)
}

editPopupChangeProfileButton.addEventListener('click', () => openPopupChangeProfile())
openPopupAddCardButton.addEventListener('click', () => openPopupAddCard())
formChangeProfile.addEventListener('submit', handleProfileSubmit)
formAddCard.addEventListener('submit', handleCardSubmit)


const profileValidator = new FormValidator(validationConfig, formChangeProfile)
profileValidator.enableValidation()

const addCardValidator = new FormValidator(validationConfig, formAddCard)
addCardValidator.enableValidation()



