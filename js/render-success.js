'use strict';
(function () {
  var main = document.querySelector('main');
  var successTemplate = document.querySelector('#success').content.querySelector('.success');

  var onSuccessAlertLoadEscPress = function (evt) {
    window.utils.onEscPress(evt, closeSuccessAlert);
  };

  var renderAnSuccessAlert = function () {
    openSuccessAlert();
  };

  var openSuccessAlert = function () {
    main.appendChild(successTemplate);
    document.addEventListener('keydown', onSuccessAlertLoadEscPress);
    document.addEventListener('click', onSuccessAlertClick);
  };

  var closeSuccessAlert = function () {
    main.removeChild(successTemplate);
    document.removeEventListener('keydown', onSuccessAlertLoadEscPress);
    document.removeEventListener('click', onSuccessAlertClick);
  };

  var onSuccessAlertClick = function () {
    closeSuccessAlert();
  };

  window.renderSuccess = renderAnSuccessAlert;
})();

