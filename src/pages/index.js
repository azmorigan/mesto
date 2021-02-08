import FormValidator from '../scripts/components/FormValidator.js'
import Card from '../scripts/components/Card.js'
import Section from '../scripts/components/Section.js'
import PopupWithImage from '../scripts/components/PopupWithImage.js'
import PopupWithForm from '../scripts/components/PopupWithForm.js'
import UserInfo from '../scripts/components/UserInfo.js'
import {editPopupChangeProfileButton,
  formChangeProfile,
  popupImageSelector,
  openPopupAddCardButton,
  formAddCard,
  nameInputChangeProfile,
  jobInputChangeProfile,
  listCards,
  validationConfig} from '../scripts/utils/constants.js'
import {initialCards} from '../scripts/utils/initial-cards.js'
import './index.css'


//-------------Определение классов---------------//

const imagePopup = new PopupWithImage(popupImageSelector)

const infoProfile = new UserInfo({
  nameProfileSelector: '.profile__title',
  jobProfileSelector: '.profile__subtitle'
}, nameInputChangeProfile, jobInputChangeProfile)


//--------------Функции---------------//

// Поставить лайк
function likeCard(event) {
  event.target.classList.toggle('element__like_click')
}

// Удалить карту
function removeItem(event) {
  const removeItem = event.target.closest('.element')
  removeItem.remove()
}

// Открыть попап с картинкой
function handleCardClick(img, name) {
  imagePopup.setEventListeners()
  imagePopup.open(img, name)
}

// Создать карточку
function createCard(data) {
  const card = new Card(data, "#template-card", likeCard, removeItem, handleCardClick)
  const cardElement = card.createCard()
  return cardElement
}

//---------Отрисовка карточек-----------//
const initialCardList = new Section({
  items: initialCards,
  renderer: (item)=>{
    const cardElement = createCard(item)
    initialCardList.addItem(cardElement)
  }}, listCards)
initialCardList.renderItems()

//--------------Отрытие и закрытие попапов---------------//

function openPopupChangeProfile() {
  infoProfile.openProfile()
  profileValidator.setButtonState(formChangeProfile.checkValidity())
  profileValidator.resetValidation()
  popupFormEditProfile.open()
}

function openPopupAddCard() {
  addCardValidator.setButtonState(formAddCard.checkValidity())
  addCardValidator.resetValidation()
  popupFormAddCard.open()
}

editPopupChangeProfileButton.addEventListener('click', () => openPopupChangeProfile())
openPopupAddCardButton.addEventListener('click', () => openPopupAddCard())
//-----------------------------------------------//

//----------------Отправка форм-------------//

const popupFormAddCard = new PopupWithForm('.popup_type_add-card',
  {handleFormSubmit: (data) => {
    const cardElement = createCard(data)
    initialCardList.addItem(cardElement)
  }
})
popupFormAddCard.setEventListeners()

const popupFormEditProfile = new PopupWithForm('.popup_type_edit-profile', {handleFormSubmit: (data) => {
  infoProfile.setUserInfo(data)
}})
popupFormEditProfile.setEventListeners()

//-----------------Валидация----------------//
const profileValidator = new FormValidator(validationConfig, formChangeProfile)
profileValidator.enableValidation()

const addCardValidator = new FormValidator(validationConfig, formAddCard)
addCardValidator.enableValidation()



