const product1 = {
  name: "Demo 1",
  price: 100,
  stock: 50,
  sold: 0,
};

const product2 = {
  name: "Demo 2",
  price: 10,
  stock: 50,
  sold: 0,
  vat: 5,
};
const product3 = {
  name: "Demo 3",
  price: 90,
  stock: 50,
  sold: 0,
};

class CartItem {
  constructor(product, quantity) {
    this.product = product;
    this.pricePerUnit = product.price || 0;
    this.vatPerUnit = product && product.vat ? product.vat : 0;
    this.quantity = quantity;
    this.addedAt = new Date();
    this.updatedAt = new Date();
  }
}

// const Cart = {
//   items: [],
//   totalVat: 0,
//   totalPriceBeforeVat: 0,
//   totalPrice: this.totalPriceBeforeVat - this.totalVat,
// };

const item1 = new CartItem(product1, 5);
const item2 = new CartItem(product2, 5);
const item3 = new CartItem(product3, 5);
const item4 = new CartItem(product1, 4);

class Cart {
  constructor() {
    this.items = [];
    this.totalVat = 0;
    this.totalPriceBeforeVat = 0;
    this.totalPrice = 0;
  }

  getItems() {
    return this.items;
  }

  addItem(item) {
    const isExist = this.items.find(
      (i) => i.product.name === item.product.name
    );

    if (isExist) {
      this.items = this.items.map((i) => {
        if (i.product.name === item.product.name) {
          i.quantity += item.quantity;
        }

        return i;
      });
    } else {
      this.items.push(item);
    }

    this.totalPriceBeforeVat += item.pricePerUnit * item.quantity;
    this.totalVat += item.vatPerUnit * item.quantity;

    this.totalPrice = this.totalPriceBeforeVat + this.totalVat;
    return this;
  }

  removeItem(item) {
    this.items = this.items.filter((i) => i.product.name !== item.product.name);

    this.totalPriceBeforeVat -= item.pricePerUnit * item.quantity;
    this.totalVat -= item.vatPerUnit * item.quantity;

    this.totalPrice = this.totalPriceBeforeVat + this.totalVat;
    return this;
  }

  calculatePrices() {
    console.log(this.items.length);
  }
}

const cart = new Cart();

// const item4 = new CartItem(product1, 5);
// console.log(item1, item2, item3);

// console.log(cart);

cart.addItem(item1);
cart.addItem(item4);

cart.addItem(item2);
cart.addItem(item3);
// cart.removeItem(item1);

console.log(cart);
