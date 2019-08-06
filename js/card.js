'use strict';
(function () {
  var PhotoSize = {
    WIDTH: 45,
    HEIGHT: 40
  };

  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var mapBlock = document.querySelector('.map');
  var filtersContainer = document.querySelector('.map__filters-container');

  var typeOfHousing = {
    bungalo: 'Бунгало',
    flat: 'Квартира',
    house: 'Дом',
    palace: 'Дворец'
  };

  var appendFeatureElements = function (parentElement, features) {
    parentElement.innerHTML = '';
    features.forEach(function (featureItem) {
      var featuresListElement = document.createElement('li');
      featuresListElement.classList.add('popup__feature');
      featuresListElement.classList.add('popup__feature--' + featureItem + '');
      parentElement.appendChild(featuresListElement);
    });
  };

  var appendPhotoElements = function (parentElement, photosArray) {
    parentElement.innerHTML = '';
    photosArray.forEach(function (photo) {
      var photoElement = document.createElement('img');
      photoElement.classList.add('popup__photo');
      photoElement.style.width = PhotoSize.WIDTH + 'px';
      photoElement.style.height = PhotoSize.HEIGHT + 'px';
      photoElement.alt = 'Фотография жилья';
      photoElement.src = photo;
      parentElement.appendChild(photoElement);
    });
  };

  var renderCard = function (ad) {
    var cardElement = cardTemplate.cloneNode(true);
    cardElement.querySelector('.popup__avatar').src = ad['author'].avatar;
    cardElement.querySelector('.popup__title').textContent = ad['offer'].title;
    cardElement.querySelector('.popup__text--address').textContent = ad['offer'].address;
    cardElement.querySelector('.popup__text--price').textContent = ad['offer'].price + '₽/ночь';
    cardElement.querySelector('.popup__type').textContent = typeOfHousing[ad['offer'].type];
    cardElement.querySelector('.popup__text--capacity').textContent = ad['offer'].rooms + ' комнаты для ' + ad['offer'].guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + ad['offer'].checkin + ' выезд до ' + ad['offer'].checkout;
    cardElement.querySelector('.popup__description').textContent = ad['offer'].description;

    var popupClose = cardElement.querySelector('.popup__close');
    popupClose.addEventListener('click', onCardCloseButtonClick);
    document.addEventListener('keydown', onCardEscPress);

    var featuresList = cardElement.querySelector('.popup__features');
    appendFeatureElements(featuresList, ad['offer'].features);

    if (ad['offer'].features.length === 0) {
      featuresList.remove();
    }

    var photosList = cardElement.querySelector('.popup__photos');
    appendPhotoElements(photosList, ad['offer'].photos);

    return cardElement;
  };

  var addCardToMap = function (ad) {
    var fragment = document.createDocumentFragment();
    fragment.appendChild(renderCard(ad));
    mapBlock.insertBefore(fragment, filtersContainer);
  };

  var removeCard = function () {
    var mapCard = document.querySelector('.map__card');
    if (mapCard) {
      mapCard.remove();
    }

    var activePin = document.querySelector('.map__pin--active');
    if (activePin) {
      window.pins.deactivate(activePin);
    }

    document.removeEventListener('keydown', onCardEscPress);
  };

  var onCardCloseButtonClick = function () {
    removeCard();
  };

  var onCardEscPress = function (evt) {
    window.utils.onEscPress(evt, removeCard);
  };

  window.card = {
    add: addCardToMap,
    remove: removeCard
  };
})();
