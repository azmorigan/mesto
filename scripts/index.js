let popup = document.querySelector('.popup')
let editPopup = document.querySelector('.profile__edit-button')
let closePopup = document.querySelector('.popup__close')
let profileTitle = document.querySelector('.profile__title')
let profileSubtitle = document.querySelector('.profile__subtitle')
let formElement = document.querySelector('.form')
let popupAddCard = document.querySelector('.popup_add-card')
let editPopupAddCardButton = document.querySelector('.profile__add-button')
let closePopupAddCard = document.querySelector('.popup__close_add-card')
// Доступ к input через атрибут name
let nameInput = formElement.name
let jobInput = formElement.job

// Открыть или закрыть попап для редактирования профиля
function togglePopup() {
  nameInput.value = profileTitle.textContent
  jobInput.value = profileSubtitle.textContent
  popup.classList.toggle('popup_opened')
}

// Открыть или закрыть попап для добавления карточки
function togglePopupAddCard() {
  popupAddCard.classList.toggle('popup_opened')
}

// Замена имени и деятельности с помощью формы
function formSubmitHandler(evt) {
  evt.preventDefault()
  profileTitle.textContent = nameInput.value
  profileSubtitle.textContent = jobInput.value
  togglePopup()
}

editPopup.addEventListener('click', togglePopup)
closePopup.addEventListener('click', togglePopup)
editPopupAddCardButton.addEventListener('click', togglePopupAddCard)
formElement.addEventListener('submit', formSubmitHandler)
closePopupAddCard.addEventListener('click', togglePopupAddCard)