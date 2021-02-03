import FormValidator from '../scripts/components/FormValidator.js'
import Card from '../scripts/components/Card.js'
import Section from '../scripts/components/Section.js'
import {initialCards} from '../scripts/utils/initial-cards.js'
import {popups,
  popupChangeProfile,
  editPopupChangeProfileButton,
  profileName,
  profileJob,
  formChangeProfile,
  nameInputChangeProfile,
  jobInputChangeProfile,
  popupAddCard,
  openPopupAddCardButton,
  formAddCard,
  placeInputAddCard,
  linkInputAddCard,
  listCards,
  validationConfig} from '../scripts/utils/constants.js'

import {likeCard,
removeItem,
openPopupImage,
closePopup,
handleProfileSubmit,
openPopup
} from '../scripts/utils/utils.js'


//----------------------События-----------------------//

editPopupChangeProfileButton.addEventListener('click', () => openPopupChangeProfile())
openPopupAddCardButton.addEventListener('click', () => openPopupAddCard())
formChangeProfile.addEventListener('submit', handleProfileSubmit)
formAddCard.addEventListener('submit', handleCardSubmit)

popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    // Закрыть попап кликом по оверлэю
    if (evt.target.classList.contains('popup')) {
      closePopup(popup)
    }
    // Закрыть попап кликом на крестик
    if (evt.target.classList.contains('close-button')) {
      closePopup(popup)
    }
  })
})

//---------Отрисовка карточек-----------//
const initialCardList = new Section({
  items: initialCards,
  renderer: (item)=>{
    const card = new Card(item, "#template-card", likeCard, removeItem, openPopupImage)
    const cardElement = card.createCard()
    initialCardList.addItem(cardElement)
  }}, listCards)
initialCardList.renderItems()
//--------------------------------------//

const profileValidator = new FormValidator(validationConfig, formChangeProfile)
profileValidator.enableValidation()

const addCardValidator = new FormValidator(validationConfig, formAddCard)
addCardValidator.enableValidation()

// Открыть попап для редактирования профиля
function openPopupChangeProfile() {
  nameInputChangeProfile.value = profileName.textContent
  jobInputChangeProfile.value = profileJob.textContent
  profileValidator.setButtonState(formChangeProfile.checkValidity())
  profileValidator.resetValidation()
  openPopup(popupChangeProfile)
}

// Открыть попап для добавления карточки
function openPopupAddCard() {
  addCardValidator.setButtonState(formAddCard.checkValidity())
  addCardValidator.resetValidation()
  openPopup(popupAddCard)
}

// Добавить новую карту
function addNewCard() {
  const card = new Card({name: placeInputAddCard.value, link: linkInputAddCard.value}, "#template-card", likeCard, removeItem, openPopupImage)
  const cardElement = card.createCard()
  initialCardList.addItem(cardElement)
}
    

// Добавить карту
function handleCardSubmit(evt) {
  evt.preventDefault()
  addNewCard()
  closePopup(popupAddCard)
  formAddCard.reset()
}