/*jshint esversion: 6 */

const pageHeader = document.querySelector('.page-header');
const burgerClosed = document.querySelector('.burger-closed');
const burgerOpen = document.querySelector('.burger-open');
const burgerTop = document.querySelector('.burger-closed__top-line');
const burgerBottom = document.querySelector('.burger-closed__bottom-line');
const burgerMiddle = document.querySelector('.burger-closed__middle-line');
const navigationItem = document.querySelectorAll('.page-header__navigation-item');
const navItemArray = Array.from(navigationItem);
const burgerMenuItems = Array.from(document.querySelectorAll('.burger-open__list-item-wrapper'));
const logoTablet = document.querySelector('.page-header__tablet');
const mainNavigation = document.querySelector('.main-navigation');
const pageMain = document.querySelector('.page-main');
const aboutUsBlock = document.querySelector('.about-us__logo');
const centerContainer = document.querySelector('.center-container');

mainNavigation.classList.remove('main-navigation--fixed');

window.addEventListener('DOMContentLoaded', correctHeaderHeight);
let pageHeaderHeight = pageHeader.getBoundingClientRect().height;
pageMain.style.marginTop = `-${pageHeaderHeight}px`;

window.addEventListener('resize', () => {
  pageHeaderHeight = pageHeader.getBoundingClientRect().height;
  pageMain.style.marginTop = `-${pageHeaderHeight}px`;
  pageHeader.addEventListener('change', correctHeaderHeight);
});


function correctHeaderHeight() {
  pageHeaderHeight = pageHeader.getBoundingClientRect().height;
  pageMain.style.marginTop = `-${pageHeaderHeight}px`;
}

// BURGER MENU

aboutUsBlock.classList.add('about-us__logo--disappear');
mainNavigation.classList.add('main-navigation--disappear');
logoTablet.classList.add('page-header__tablet-disappear');
burgerClosed.classList.add('burger-closed--change-display');
burgerOpen.classList.add('burger-open--appear');
pageHeader.classList.remove('page-header--background-color');
navItemArray.forEach((item) => {
  item.classList.add('page-header__navigation-item--disappear');
});

burgerOpen.classList.add('burger-open__action');

burgerClosed.addEventListener('click', () => {
  burgerOpen.classList.toggle('burger-open__action');
  burgerTop.classList.toggle('burger-closed__top-line--transform');
  burgerBottom.classList.toggle('burger-closed__bottom-line--transform');
  burgerMiddle.classList.toggle('visually-hidden');
  burgerClosed.classList.toggle('burger-closed--background-color');
  centerContainer.classList.toggle('center-container--fixed');

  burgerMenuItems.forEach((item) => {
    item.addEventListener('click', () => {
      centerContainer.classList.remove('center-container--fixed');
      burgerOpen.classList.add('burger-open__action');
      burgerTop.classList.remove('burger-closed__top-line--transform');
      burgerBottom.classList.remove('burger-closed__bottom-line--transform');
      burgerMiddle.classList.remove('visually-hidden');
      burgerClosed.classList.remove('burger-closed--background-color');
    });
  });
});


//FORM VALIDATION

const shape = document.querySelector('.shape');
const userName = document.querySelector('#user-name');
const nameWrapper = document.querySelector('.shape__enter-name');
const tel = document.querySelector('#user-phone');
const telWrapper = document.querySelector('.shape__enter-phone');

function validateName(name) {
  const re = /^[a-z\d. !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~А-яЁё]{3,}$/i;
  return re.test(String(name));
}

function validatePhone(phone) {
  const re = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/;
  return re.test(String(phone));
}

shape.onsubmit = function() {
  const nameVal = userName.value,
    phoneVal = tel.value;

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

  if (phoneVal === '') {
    telWrapper.classList.add('shape__error');
    return false;
  } else {
    telWrapper.classList.remove('shape__error');
  }

  if (!validatePhone(phoneVal)) {
    telWrapper.classList.add('shape__error');
    return false;
  } else {
    telWrapper.classList.remove('shape__error');
  }
};
