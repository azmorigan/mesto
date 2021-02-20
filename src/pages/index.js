import FormValidator from '../scripts/components/FormValidator.js'
import Card from '../scripts/components/Card.js'
import Section from '../scripts/components/Section.js'
import PopupWithImage from '../scripts/components/PopupWithImage.js'
import PopupWithForm from '../scripts/components/PopupWithForm.js'
import UserInfo from '../scripts/components/UserInfo.js'
import Api from '../scripts/components/Api.js'
import PopupWithSubmit from '../scripts/components/PopupWithSubmit.js'
import {editPopupChangeProfileButton,
  formChangeProfile,
  popupImageSelector,
  openPopupAddCardButton,
  formAddCard,
  formEditAvatar,
  listCards,
  validationConfig,
  profileName,
  profileJob,
  nameInputChangeProfile,
  jobInputChangeProfile} from '../scripts/utils/constants.js'
import './index.css'


//-------------Определение классов---------------//

const imagePopup = new PopupWithImage(popupImageSelector)
imagePopup.setEventListeners()

const editAvatarPopup = new PopupWithImage('.popup_type_edit-avatar')
editAvatarPopup.setEventListeners()

const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-20/",
  headers: {
    authorization: 'afa481ae-bc0e-4856-9ec0-3e79ade90f5a',
    'Content-Type': 'application/json',
  }
})

const infoProfile = new UserInfo({
  nameProfileSelector: '.profile__title',
  jobProfileSelector: '.profile__subtitle',
  avatarProfileSelector: '.profile__avatar'
}, api)

const confirmDeletePopup = new PopupWithSubmit('.popup_type_delete-card')

function removeCard(card) {
  return () => {
    api.deleteCard(card.returnCardId())
      .then((res)=>{
        confirmDeletePopup.close()
        card.removeItem()
      })
      .catch(err=>console.log(err))
  }
}



//--------------Функции---------------//

// Открыть попап с картинкой
function handleCardClick(img, name) {
  imagePopup.open(img, name)
}

// Создать карточку
function createCard({name, link, owner, _id, likes}) {
  const card = new Card({name, link, owner, _id, userId: infoProfile.returnUserId(), likes}, "#template-card", handleCardClick,
  () => {
    confirmDeletePopup.setEventListeners(removeCard(card))
    confirmDeletePopup.open()
  })
  return card.createCard()
}


//--------------Отрытие и закрытие попапов---------------//
function openPopupChangeProfile() {
  nameInputChangeProfile.value = profileName.textContent
  jobInputChangeProfile.value = profileJob.textContent
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


//----------------Отправка форм-------------//
const popupFormAddCard = new PopupWithForm('.popup_type_add-card',
  {handleFormSubmit: (data) => {
    api
      .addCard(data)
      .then((res)=>{
        const cardElement = createCard(res)
        cardList.addItem(cardElement)
      })
      .catch(err=>console.log(err))
  }
})
popupFormAddCard.setEventListeners()

const popupFormEditProfile = new PopupWithForm('.popup_type_edit-profile',
 {handleFormSubmit: (data) => {
  infoProfile.setUserInfo(data)

  api
  .uploadProfileInfo(
    profileName.textContent,
    profileJob.textContent)
  .then(res=>res)
  .catch(err=>console.log(err)) 
}})
popupFormEditProfile.setEventListeners()


//-----------------Валидация----------------//
const profileValidator = new FormValidator(validationConfig, formChangeProfile)
profileValidator.enableValidation()

const addCardValidator = new FormValidator(validationConfig, formAddCard)
addCardValidator.enableValidation()

const editAvatarValidator = new FormValidator(validationConfig, formEditAvatar)
editAvatarValidator.enableValidation()


//------------Загрузка карточек--------------//
const cardList = new Section({
  renderer: (item) => {
    cardList.addItem(createCard(item))
  }
}, listCards)


api
  .getInitialCards()
  .then(res=>{
    cardList.renderItems(res)
  })
  .catch(err=>console.log(err))


//------------Загрузка профиля--------------//
api
  .getProfileInfo()
  .then((res) => {
    infoProfile.setInitialInfo({
      name: res.name,
      job: res.about,
      img: res.avatar
    })
    infoProfile.setUserId(res._id)
  })
  .catch(err=>console.log(err))