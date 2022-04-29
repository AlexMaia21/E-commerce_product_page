import clickOutSide from "./clickoutside.js";
import { getElement, getElementAll } from './getelement.js';

class EcommercePageApp {
    constructor() {
        // Event listener elements
        this.iconHamburguer = getElement('.box-left__icon-hamburguer');
        this.cartIcon = getElement('.box-right__cart-icon');
        this.btnAddQuantityProduct = getElement('.quantity__add.quantity__add--add-product');
        this.btnRemoveQuantityProduct = getElement('.quantity__remove.quantity__remove--reduce');
        this.btnAddToCart = getElement('.button-purchase__add-cart--buy');
        this.btnDeleteProduct = getElement('.cart-finally-product__icon-delete');

        // Number counts
        this.cartNumberCount = 0;
        this.quantityNumberButtonRemoveAdd = 0;

        // Context change
        this.toggleCartContainer = this.toggleCartContainer.bind(this);
        this.addOrReduceProductCart = this.addOrReduceProductCart.bind(this);
        this.addProductToCart = this.addProductToCart.bind(this);
        this.deleteProduct = this.deleteProduct.bind(this);
    }
    createEventListeners() {
        this.iconHamburguer.addEventListener('click', this.showMenuMobile);
        this.cartIcon.addEventListener('click', this.toggleCartContainer);
        this.btnAddQuantityProduct.addEventListener('click', this.addOrReduceProductCart);
        this.btnRemoveQuantityProduct.addEventListener('click', this.addOrReduceProductCart);
        this.btnAddToCart.addEventListener('click', this.addProductToCart);
        this.btnDeleteProduct.addEventListener('click', this.deleteProduct);
    }
    showMenuMobile(event) {
        getElement('.menu-hamburguer').classList.add('active');
        document.body.classList.add('background-show');
        clickOutSide(getElement('.menu-hamburguer'), event.currentTarget, getElement('.btn-hide-menu-hamburguer'));
    }
    toggleCartContainer(event) {
        getElement('.cart-container').classList.toggle('active');
        clickOutSide(getElement('.cart-container'), event.currentTarget);
        this.updateItemsCart();
    }
    addOrReduceProductCart(event) {
        if (event.currentTarget === getElement('.quantity__remove.quantity__remove--reduce')) {
            this.quantityNumberButtonRemoveAdd--;
            if (this.quantityNumberButtonRemoveAdd < 1) {
                this.quantityNumberButtonRemoveAdd = 0;
            }
            getElement('.quantity__number').innerText = this.quantityNumberButtonRemoveAdd;
        } else {
            this.quantityNumberButtonRemoveAdd++;
            getElement('.quantity__number').innerText = this.quantityNumberButtonRemoveAdd;
        }
    }
    addProductToCart() {
        if (this.quantityNumberButtonRemoveAdd > 0) {
            getElement('.cart-description__amount').innerText = this.quantityNumberButtonRemoveAdd;
            getElement('.cart-description__total span').innerText = `${125 * this.quantityNumberButtonRemoveAdd}`;
            this.cartNumberCount = this.quantityNumberButtonRemoveAdd;
            getElement('.box-right__cart-number').innerText = this.cartNumberCount;

            getElement('.alerta-compra').classList.add('show');
            setTimeout(function () {
                getElement('.alerta-compra').classList.remove('show');
            }, 2000);
            this.quantityNumberButtonRemoveAdd = 0;
            getElement('.quantity__number').innerText = 0;
        }
    }
    deleteProduct() {
        this.cartNumberCount = 0;
        getElement('.box-right__cart-number').innerText = 0;
        this.updateItemsCart();
    }
    updateItemsCart() {
        if (this.cartNumberCount === 0) {
            getElement('.cart-product').style.display = 'none';
            getElement('.container__cart-product-empty').style.display = 'flex';
        } else {
            getElement('.cart-product').style.display = 'block';
            getElement('.container__cart-product-empty').style.display = 'none';
        }
    }
}

const instanceEcommercePageApp = new EcommercePageApp();
instanceEcommercePageApp.createEventListeners();