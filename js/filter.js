'use strict';
(function () {
  var housingType = document.querySelector('#housing-type');
  var housingPrice = document.querySelector('#housing-price');
  var housingRooms = document.querySelector('#housing-rooms');
  var housingGuests = document.querySelector('#housing-guests');
  var housingFeatures = document.querySelectorAll('.map__filters input[name=features]');

  var housingPricesMap = {
    low: {
      min: 0,
      max: 10000
    },
    high: {
      min: 50000,
      max: Infinity
    },
    middle: {
      min: 10000,
      max: 50000
    }
  };

  var checkHousingType = function (ad) {
    return housingType.value === 'any' || ad.offer.type === housingType.value;
  };

  var checkHousingPrice = function (ad) {
    return housingPrice.value === 'any' || ad.offer.price >= housingPricesMap[housingPrice.value].min && ad.offer.price <= housingPricesMap[housingPrice.value].max;
  };

  var checkHousingRooms = function (ad) {
    return housingRooms.value === 'any' || ad.offer.rooms === Number(housingRooms.value);
  };

  var checkHousingGuests = function (ad) {
    return housingGuests.value === 'any' || ad.offer.guests === Number(housingGuests.value);
  };

  var checkFeatures = function (ad, selectedFeatures) {
    return selectedFeatures.every(function (feature) {
      return ad.offer.features.includes(feature);
    });
  };

  var getSelectedFeatures = function () {
    var selectedFeatures = [];
    housingFeatures.forEach(function (input) {
      if (input.checked) {
        selectedFeatures.push(input.value);
      }
    });
    return selectedFeatures;
  };

  var filteringData = function (data) {
    var filteredPins = data.filter(function (it) {
      var filteredFeatures = getSelectedFeatures();
      return checkHousingType(it) &&
        checkHousingPrice(it) &&
        checkHousingRooms(it) &&
        checkHousingGuests(it) &&
        checkFeatures(it, filteredFeatures);
    });
    return filteredPins;
  };

  window.filter = filteringData;
})();

