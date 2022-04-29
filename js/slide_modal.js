import { getElement, getElementAll } from "./getelement.js";

class SlideModal {
    constructor() {
        // elements
        this.thumbsSlide = getElementAll('.container-left__thumb img');
        this.imageProductSlide = getElement('.container-left__image-product');
        this.thumbsModal = getElementAll('.modal-container__thumbs-modal img');
        this.btnsControlSlideMobile = getElementAll('.container-left__controls-mobile i');

        // index current image thumb
        this.currentImageThumb = 0;

        // context change
        this.showModalProduct = this.showModalProduct.bind(this);
        this.exitModal = this.exitModal.bind(this);
        this.buttonsNavigationImageProduct = this.buttonsNavigationImageProduct.bind(this);
        this.navigationThumbsModal = this.navigationThumbsModal.bind(this);
    }

    // Get or set index image thumb
    setCurrentImageThumb(operator) {
        if (operator === '+') {
            this.currentImageThumb++;
            if (this.currentImageThumb > 3) {
                this.currentImageThumb = 3;
            }
        } else {
            this.currentImageThumb--;
            if (this.currentImageThumb < 1) {
                this.currentImageThumb = 0;
            }
        }
    }
    getCurrentImageThumb() {
        return this.currentImageThumb;
    }
    // ###############

    createEventListeners() {
        this.imageProductSlide.addEventListener('click', this.showModalProduct);
    }
    browseAllThumbsSlide() {
        this.thumbsSlide.forEach((thumbImg, index) => {

            const selectImageThumb = (event) => {
                this.currentImageThumb = index;
                this.selectProductImage(index, getElement('.container-left__image-product img'));
                getElementAll('.container-left__thumb img').forEach(thumbImg => {
                    thumbImg.style.border = '2px solid transparent';
                    thumbImg.style.opacity = '';
                });
                event.currentTarget.style.border = '2px solid hsl(26, 100%, 55%)';
                event.currentTarget.style.opacity = '0.4';
            }

            thumbImg.addEventListener('click', selectImageThumb);
        });
    }
    selectProductImage(imageIndex, element) {
        element.src = `../images/image-product-${imageIndex + 1}.jpg`;
    }
    showModalProduct() {
        getElement('.image-content-modal__product-modal').src = `../images/image-product-${this.currentImageThumb + 1}.jpg`;
        getElement('.modal').classList.add('active');
        getElement('.modal').addEventListener('click', this.exitModal);
        getElement('.image-content-modal__btn-back--to-back').addEventListener('click', this.buttonsNavigationImageProduct);
        getElement('.image-content-modal__btn-next--to-next').addEventListener('click', this.buttonsNavigationImageProduct);
    }
    exitModal(event) {
        if (getElement('.image-content-modal__btn--btn-exit').contains(event.target)) {
            getElement('.modal').classList.remove('active');

            // Removing event listeners from elements
            getElement('.modal').removeEventListener('click', this.exitModal);
            getElement('.image-content-modal__btn-back--to-back').removeEventListener('click', this.buttonsNavigationImageProduct);
            getElement('.image-content-modal__btn-next--to-next').removeEventListener('click', this.buttonsNavigationImageProduct);
        }
    }
    buttonsNavigationImageProduct(event) {
        if (event.currentTarget.dataset.direction === 'back') {
            this.setCurrentImageThumb('-');
            this.selectProductImage(this.getCurrentImageThumb(), getElement('.image-content-modal__product-modal'));
        } else {
            this.setCurrentImageThumb('+');
            this.selectProductImage(this.getCurrentImageThumb(), getElement('.image-content-modal__product-modal'));
        }
    }
    navigationThumbsModal() {
        this.thumbsModal.forEach((thumbImg, index) => {
            const selectThumbImageModal = (event) => {
                this.currentImageThumb = index;
                this.selectProductImage(index, getElement('.image-content-modal__product-modal'));
                getElementAll('.modal-container__thumbs-modal img').forEach(thumbImg => {
                    thumbImg.style.border = '2px solid transparent';
                    thumbImg.style.opacity = '';
                });
                event.currentTarget.style.border = '2px solid hsl(26, 100%, 55%)';
                event.currentTarget.style.opacity = '0.4';
            }
            thumbImg.addEventListener('click', selectThumbImageModal);
        });
    }
    controlBtnsSlideMobile() {
        this.btnsControlSlideMobile.forEach((btn) => {
            btn.addEventListener('click', () => {
                if(btn.dataset.direction === 'back'){
                    this.setCurrentImageThumb('-');
                    this.selectProductImage(this.getCurrentImageThumb(), getElement('.container-left__image-product img'));
                } else {
                    this.setCurrentImageThumb('+');
                    this.selectProductImage(this.getCurrentImageThumb(), getElement('.container-left__image-product img'));
                }
            });
        });
    }
}

const slideModal = new SlideModal();
slideModal.createEventListeners();
slideModal.browseAllThumbsSlide();
slideModal.navigationThumbsModal();
slideModal.controlBtnsSlideMobile();