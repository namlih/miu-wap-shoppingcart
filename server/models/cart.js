

const Product = require("./product");

let cartDB = [];
let counter = 0;


module.exports = class Cart {

    constructor(id, userId, productId, productName, quantity, price, total) {
        this.id = id;
        this.userId = userId;
        this.productId = productId;
        this.productName = productName;
        this.quantity = quantity; 
        this.price = price;
        this.total = total;
    }

    static getCarts(userId) {
        if (userId) {
            return cartDB.filter((cart) => cart.userId == userId);
        }
        throw new Error('User not found');
    }


    save() {
        const product = Product.find(this.productId);
        if (product.stock <= 0){
            throw new Error('Out of stock');
        }
        else{
            this.id = ++counter;
            cartDB.push(this);
            return cartDB.filter((cart) => cart.userId == this.userId);
        }        
    }

    static update(id, quantity) {
        
        const ind = cartDB.findIndex((s) => s.id == id);
        if (ind > -1) {
            const cart = cartDB[ind];
            const product = Product.find(cart.productId);
            cart.quantity += parseInt(quantity);

            if (cart.quantity > product.stock){
                cart.quantity -= parseInt(quantity);
                throw new Error('Out of stock');
            }
            else if (cart.quantity <= 0){
                cartDB = cartDB.filter(c => c.id != cart.id);
                return cartDB.filter((c) => c.userId == cart.userId);
            }
            else {
                cart.total = (cart.price * cart.quantity).toFixed(2);
                cartDB.splice(ind, 1, cart);
                return cartDB.filter((c) => c.userId == cart.userId);
            }
        } else {
            throw new Error('update - Item not found');
        }
        
    }

    static empty(userId) {
        cartDB = cartDB.filter((c) => c.userId != userId);
    }

}