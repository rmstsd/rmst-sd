const goodData = [
  {
    name: '拿铁',
    desc: '好喝好喝',
    price: 20,
    sale: 200,
    favoRAte: 98
  },
  {
    name: '焦糖玛奇朵',
    desc: '好喝好喝66',
    price: 10,
    sale: 400,
    favoRAte: 96
  }
]

// 单个商品
class UiGood {
  constructor(good) {
    this.data = good
    this.choose = 0
  }

  data
  choose

  increase() {
    this.choose++
  }

  decrease() {
    if (this.choose === 0) {
      return
    }
    this.choose--
  }

  isChoose() {
    return this.choose > 0
  }

  getTotalPrice() {
    return this.choose * this.data.price
  }
}

// 整个购物车, 内部管理着多个商品
class Cart {
  constructor(goods, deliveryCost, deliveryThreshold) {
    this.goods = goods.map(item => new UiGood(item))
    this.deliveryCost = deliveryCost
    this.deliveryThreshold = deliveryThreshold
  }

  goods = []
  deliveryCost = 0 // 配送费
  deliveryThreshold = 0 // 满xx 起送

  getTotalChoose() {
    return this.goods.reduce((acc, item) => acc + item.choose, 0)
  }
  getTotalPrice() {
    return this.goods.reduce((acc, item) => acc + item.getTotalPrice(), 0)
  }
  increase(index) {
    this.goods[index].increase()
  }
  decrease(index) {
    this.goods[index].decrease()
  }
  hasGoodsInCar() {
    return this.getTotalChoose() > 0
  }
  isCanDelivery() {
    return this.getTotalPrice() >= this.deliveryThreshold
  }
  isChoose(index) {
    return this.goods[index].isChoose()
  }
}

const card = new Cart(goodData, 5, 30)

console.log(card)

class UiView {
  constructor() {
    this.card = new Cart(goodData, 5, 60)

    this.createGoodsHtml()
    this.updateFooter()

    this.doms.totalCount.onanimationend = () => {
      this.doms.totalCount.classList.remove('animate')
    }
  }

  card = new Cart(goodData, 5, 30)

  doms = {
    goodContainer: document.querySelector('.good-container'),
    totalPrice: document.querySelector('.total'),
    totalCount: document.querySelector('.total-count'),
    deliveryPrice: document.querySelector('.delivery-price'),
    deliveryThresholdContainer: document.querySelector('.delivery-threshold-container'),
    deliveryThreshold: document.querySelector('.delivery-threshold')
  }

  createGoodsHtml() {
    this.doms.goodContainer.innerHTML = this.card.goods.reduce((acc, item, index) => {
      return (
        acc +
        `<div class="good-item">
          <div>名字: ${item.data.name}</div>
          <div>描述: ${item.data.desc}</div>
          <div>价格: ${item.data.price}</div>
          <div>月售: ${item.data.sale}</div>
          <div>好评: ${item.data.favoRAte}%</div>
          <div>
            <button class="decrease" data-index="${index}">-</button>
            <span class="good-count">${item.choose}</span>
            <button class="increase" data-index="${index}">+</button>
          </div>
        </div>`
      )
    }, '')
  }

  increase(index) {
    this.card.increase(index)

    this.updateGoodItemDom(index)
    this.updateFooter()
  }
  decrease(index) {
    this.card.decrease(index)

    this.updateGoodItemDom(index)
    this.updateFooter()
  }

  updateGoodItemDom(index) {
    const goodItemDom = this.doms.goodContainer.children[index]
    if (this.card.isChoose(index)) {
      goodItemDom.classList.add('active')
    } else {
      goodItemDom.classList.remove('active')
    }

    goodItemDom.querySelector('.good-count').textContent = this.card.goods[index].choose
  }

  updateFooter() {
    this.doms.deliveryPrice.textContent = this.card.deliveryCost

    const totalPrice = this.card.getTotalPrice()
    this.doms.totalPrice.textContent = totalPrice
    this.doms.totalCount.textContent = this.card.getTotalChoose()

    if (this.card.isCanDelivery()) {
      this.doms.deliveryThresholdContainer.classList.add('delivery-threshold-container-active')
    } else {
      this.doms.deliveryThresholdContainer.classList.remove('delivery-threshold-container-active')
      this.doms.deliveryThreshold.textContent = this.card.deliveryThreshold - totalPrice
    }
  }

  animate() {
    this.doms.totalCount.classList.add('animate')
  }
}

var uiView = new UiView()

uiView.doms.goodContainer.addEventListener('click', evt => {
  const target = evt.target
  const index = target.getAttribute('data-index')
  if (target.classList.contains('increase')) {
    uiView.increase(index)
  } else if (target.classList.contains('decrease')) {
    uiView.decrease(index)
  }
})
