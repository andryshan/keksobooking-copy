'use strict';
(function () {
  var main = document.querySelector('main');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var buttonError = errorTemplate.querySelector('.error__button');

  var onErrorAlertLoadEscPress = function (evt) {
    window.utils.onEscPress(evt, closeErrorAlert);
  };

  var renderAnErrorAlert = function () {
    showErrorAlert();
  };

  var showErrorAlert = function () {
    main.appendChild(errorTemplate);
    buttonError.addEventListener('click', onButtonErrorClick);
    document.addEventListener('keydown', onErrorAlertLoadEscPress);
    document.addEventListener('click', onPopupErrorClick);
  };

  var closeErrorAlert = function () {
    main.removeChild(errorTemplate);
    document.removeEventListener('keydown', onErrorAlertLoadEscPress);
    document.removeEventListener('click', onPopupErrorClick);
  };

  var onButtonErrorClick = function () {
    closeErrorAlert();
  };

  var onPopupErrorClick = function () {
    closeErrorAlert();
  };

  window.renderError = renderAnErrorAlert;
})();

