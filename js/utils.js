'use strict';
(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  window.utils = {
    onEscPress: function (evt, callback) {
      if (evt.keyCode === ESC_KEYCODE) {
        callback();
      }
    },

    onEnterPress: function (evt, callback) {
      if (evt.keyCode === ENTER_KEYCODE) {
        callback();
      }
    }
  };
})();

