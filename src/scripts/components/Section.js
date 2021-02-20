export default class Section {
  constructor({renderer}, containerOfCards) {
    this._containerOfCards = containerOfCards
    this._renderer = renderer
  }

  addItem(element) {
    this._containerOfCards.prepend(element)
  }

  renderItems(items) {
    items.forEach(item=>{
      this._renderer(item)
    })
  }
}