/*jshint esversion: 6 */

const sitePartitionsTitle = document.querySelector('.partitions')
  .querySelector('h3');
const sitePartitionsList = document.querySelector('.partitions__list');
const siteAddressTitle = document.querySelector('.address')
  .querySelector('h3');
const siteAddressContacts = document.querySelector('.address__inner');
const pageHeaderButton = document.querySelector('.page-header__contacts').querySelector('button');
const bodyTag = document.querySelector('.page-body');
const popup = document.querySelector('#popup').content.querySelector('.popup');
const popupCloseButton = popup.querySelector('.popup__close-button');
const popupShapeInputName = popup.querySelector('.popup__shape-inner-enter-name').querySelector('input');
const shape = document.querySelector('.shape');
const shapeName = document.querySelector('#name-input');
const shapePhone = document.querySelector('#tel-input');
const shapeTextarea = document.querySelector('#text-input');
const popupShape = popup.querySelector('.popup__shape');
const popupShapeName = popup.querySelector('#name-popup-input');
const popupShapePhone = popup.querySelector('#tel-popup-input');

//ACORDION

let sitePartitionsOpen = false;
let addressOpen = false;

sitePartitionsList.classList.remove('partitions__list--appear');
sitePartitionsTitle.classList.add('partitions--plus-appear');
siteAddressContacts.classList.remove('address__inner--appear');
siteAddressTitle.classList.add('address--plus-appear');

sitePartitionsTitle.addEventListener('click', () => {
  sitePartitionsOpen = !sitePartitionsOpen;
  sitePartitionsList.classList.toggle('partitions__list--appear');
  sitePartitionsTitle.classList.toggle('partitions--plus-appear');

  if (addressOpen === true) {
    siteAddressContacts.classList.remove('address__inner--appear');
    siteAddressTitle.classList.add('address--plus-appear');
    addressOpen = !addressOpen;
  }
});

siteAddressTitle.addEventListener('click', () => {
  addressOpen = !addressOpen;
  siteAddressContacts.classList.toggle('address__inner--appear');
  siteAddressTitle.classList.toggle('address--plus-appear');

  if (sitePartitionsOpen === true) {
    sitePartitionsList.classList.remove('partitions__list--appear');
    sitePartitionsTitle.classList.add('partitions--plus-appear');
    sitePartitionsOpen = !sitePartitionsOpen;
  }
});

//POPUP
const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

const createPopup = () => {
  const errorMessageTemplate = popup.cloneNode(true);
  bodyTag.appendChild(popup);
  return errorMessageTemplate;
};

const closePopupClick = () => {
  popup.remove();
  popupCloseButton.removeEventListener('click', closePopupClick);
};

const closePopupEsc = (evt) => {
  if (isEscEvent(evt)) {
    popup.remove();
  }
  window.removeEventListener('keydown', closePopupEsc);
};

const closePopupOverlay = (evt) => {
  if (evt.target === popup) {
    popup.remove();
    window.removeEventListener('click', closePopupOverlay);
  }
};

const closePopup = () => {
  popupCloseButton.addEventListener('click', closePopupClick);
  window.addEventListener('keydown', closePopupEsc);
  window.addEventListener('click', closePopupOverlay);
};

function install() {
  createPopup();
  setTimeout(() => {
    closePopup();
  }, 50);
  popupShapeInputName.focus();
}

// install();

pageHeaderButton.addEventListener('click', install);

//LOCAL STORAGE
shape.addEventListener('submit', () => {
  // evt.preventDefault();
  localStorage.setItem('name', `${shapeName.value}`);
  localStorage.setItem('tel', `${shapePhone.value}`);
  localStorage.setItem('question', `${shapeTextarea.value}`);
  // shape.reset();
});

//FORM VALIDATION
const nameWrapper = document.querySelector('.shape__inner-enter-name');
const phoneWrapper = document.querySelector('.shape__inner-enter-phone');

function validateName(name) {
  const re = /^[a-z\d. !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~А-яЁё]{3,}$/i;
  return re.test(String(name));
}

shape.onsubmit = function() {
  const nameVal = shapeName.value,
    telVal = shapePhone.value;

  if (nameVal === '') {
    nameWrapper.classList.add('shape__error');
    return false;
  } else {
    nameWrapper.classList.remove('shape__error');
  }

  if (!validateName(nameVal)) {
    nameWrapper.classList.add('shape__error');
    return false;
  } else {
    nameWrapper.classList.remove('shape__error');
  }

  if (telVal === '' || telVal.length < 17) {
    phoneWrapper.classList.add('shape__error');
    return false;
  } else {
    phoneWrapper.classList.remove('shape__error');
  }
};

//POPUP VALIDATION
const popupNameWrapper = popup.querySelector('.popup__shape-inner-enter-name');
const popupTelWrapper = popup.querySelector('.popup__shape-inner-enter-phone');

function validatePopupName(name) {
  const re = /^[a-z\d. !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~А-яЁё]{3,}$/i;
  return re.test(String(name));
}

popupShape.onsubmit = function() {
  const popupNameVal = popupShapeName.value,
    popupTelVal = popupShapePhone.value;

  if (popupNameVal === '') {
    popupNameWrapper.classList.add('popup__shape-error');
    return false;
  } else {
    popupNameWrapper.classList.remove('popup__shape-error');
  }

  if (!validatePopupName(popupNameVal)) {
    popupNameWrapper.classList.add('popup__shape-error');
    return false;
  } else {
    popupNameWrapper.classList.remove('popup__shape-error');
  }

  if (popupTelVal === '' || popupTelVal.length < 17) {
    popupTelWrapper.classList.add('popup__shape-error');
    return false;
  } else {
    popupTelWrapper.classList.remove('popup__shape-error');
  }
};

//MASK
const mask = (selector) => {

  const setCursorPosition = (pos, elem) => {
    elem.focus();

    if (elem.setSelectionRange) {
      elem.setSelectionRange(pos, pos);
    } else if (elem.createTextRange) {
      const range = elem.createTextRange();

      range.collapse(true);
      range.moveEnd('character', pos);
      range.moveStart('character', pos);
      range.select();
    }
  };

  function createMask(event) {
    const matrix = '+7(___) ___ __ __',
      def = matrix.replace(/\D/g, '');

    let i = 0,
      val = this.value.replace(/\D/g, '');
    if (def.length >= val.length) {
      val = def;
    }

    // eslint-disable-next-line no-nested-ternary
    this.value = matrix.replace(/./g, (a) => /[_\d]/.test(a) && i < val.  length ? val.charAt(i++) : i >= val.length ? '' : a);

    if (event.type === 'blur') {
      if (this.value.length === 2) {
        this.value = '';
      }
    } else {
      setCursorPosition(this.value.length, this);
    }
  }

  selector.addEventListener('input', createMask);
  selector.addEventListener('focus', createMask);
  selector.addEventListener('blur', createMask);
};

mask(shapePhone);
mask(popupShapePhone);


const pageHeader = document.querySelector('.page-header');
const pageMain = document.querySelector('.page-main');
let svgHeight = 12;

const maxTablet = window.matchMedia('(max-width: 1023px) and (min-width: 768px)');
const maxMobile = window.matchMedia('(max-width: 767px)');

window.addEventListener('DOMContentLoaded', correctHeaderHeight);
if (maxTablet.matches) {
  svgHeight = 23;
} else if (maxMobile.matches) {
  svgHeight = 39;
}

let pageHeaderHeight = pageHeader.getBoundingClientRect().height;
pageMain.style.marginTop = `-${pageHeaderHeight + svgHeight}px`;

window.addEventListener('resize', () => {
  pageHeaderHeight = pageHeader.getBoundingClientRect().height;
  pageMain.style.marginTop = `-${pageHeaderHeight + svgHeight}px`;
  pageHeader.addEventListener('change', correctHeaderHeight);
});

function correctHeaderHeight() {
  pageHeaderHeight = pageHeader.getBoundingClientRect().height;
  pageMain.style.marginTop = `-${pageHeaderHeight + svgHeight}px`;
}

