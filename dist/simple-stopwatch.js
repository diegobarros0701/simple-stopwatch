"use strict";

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var SimpleStopwatch =
/*#__PURE__*/
function () {
  function SimpleStopwatch(selector) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, SimpleStopwatch);

    this._options = Object.assign({
      autoStart: true,
      delimiter: ':',
      updateInterval: 1,
      regressive: false,
      stopAt: '01:00:00',
      onStop: function onStop(currentStopwatchTime, stopwatchParts) {},
      onUpdateStopwatch: function onUpdateStopwatch(currentStopwatchTime, stopwatchParts) {}
    }, options);
    this._stopwatch = document.querySelector(selector);

    if (this._stopwatch == null) {
      console.error("Can't find the element.");
    } else {
      this._stopwatchParts = {
        hours: 0,
        minutes: 0,
        seconds: 0
      };

      this._splitStopwatch();

      if (this._options.autoStart) this.start();
    }
  }

  _createClass(SimpleStopwatch, [{
    key: "start",
    value: function start() {
      var _this = this;

      if (this._stopwatch != null) {
        this._stopwatchInterval = setInterval(function () {
          if (_this._stopwatch.innerText == _this._options.stopAt) {
            _this.stop();

            _this._options.onStop(_this._stopwatch, _this._stopwatchParts);
          } else {
            _this._updateStopwatch();
          }
        }, this._options.updateInterval * 1000);
      }
    }
  }, {
    key: "stop",
    value: function stop() {
      if (this._stopwatch != null) {
        clearInterval(this._stopwatchInterval);
      }
    }
  }, {
    key: "reset",
    value: function reset() {
      if (this._stopwatch != null) {
        this._stopwatchParts.hours = 0;
        this._stopwatchParts.minutes = 0;
        this._stopwatchParts.seconds = 0;

        this._updateStopwatchText();
      }
    }
  }, {
    key: "increment",
    value: function increment(_ref) {
      var _ref$hours = _ref.hours,
          hours = _ref$hours === void 0 ? 0 : _ref$hours,
          _ref$minutes = _ref.minutes,
          minutes = _ref$minutes === void 0 ? 0 : _ref$minutes,
          _ref$seconds = _ref.seconds,
          seconds = _ref$seconds === void 0 ? 0 : _ref$seconds;
      this._stopwatchParts.hours += hours;
      this._stopwatchParts.minutes += minutes;
      this._stopwatchParts.seconds += seconds;

      this._adjustStopwatch();

      this._updateStopwatchText();
    }
  }, {
    key: "decrement",
    value: function decrement(_ref2) {
      var _ref2$hours = _ref2.hours,
          hours = _ref2$hours === void 0 ? 0 : _ref2$hours,
          _ref2$minutes = _ref2.minutes,
          minutes = _ref2$minutes === void 0 ? 0 : _ref2$minutes,
          _ref2$seconds = _ref2.seconds,
          seconds = _ref2$seconds === void 0 ? 0 : _ref2$seconds;
      this._stopwatchParts.hours -= hours;
      this._stopwatchParts.minutes -= minutes;
      this._stopwatchParts.seconds -= seconds;

      this._adjustStopwatch();

      this._updateStopwatchText();
    }
  }, {
    key: "_splitStopwatch",
    value: function _splitStopwatch() {
      var stopwatchParts = this._stopwatch.innerText.split(this._options.delimiter);

      this._stopwatchParts.hours = parseInt(stopwatchParts[0]);
      this._stopwatchParts.minutes = parseInt(stopwatchParts[1]);
      this._stopwatchParts.seconds = parseInt(stopwatchParts[2]);
    }
  }, {
    key: "_updateStopwatch",
    value: function _updateStopwatch() {
      if (this._options.regressive) {
        if (this._stopwatchParts.seconds == 0) {
          this._stopwatchParts.seconds = 59;

          if (this._stopwatchParts.minutes == 0) {
            this._stopwatchParts.minutes = 59;
            this._stopwatchParts.hours -= 1;
          } else {
            this._stopwatchParts.minutes -= 1;
          }
        } else {
          this._stopwatchParts.seconds -= 1;
        }
      } else {
        if (this._stopwatchParts.seconds == 59) {
          this._stopwatchParts.seconds = 0;

          if (this._stopwatchParts.minutes == 59) {
            this._stopwatchParts.minutes = 0;
            this._stopwatchParts.hours += 1;
          } else {
            this._stopwatchParts.minutes += 1;
          }
        } else {
          this._stopwatchParts.seconds += 1;
        }
      }

      this._updateStopwatchText();

      this._options.onUpdateStopwatch(this._stopwatch, this._stopwatchParts);
    }
  }, {
    key: "_adjustStopwatch",
    value: function _adjustStopwatch() {
      var minutesToAdd = parseInt(this._stopwatchParts.seconds / 60);
      this._stopwatchParts.minutes += minutesToAdd;
      this._stopwatchParts.seconds -= minutesToAdd * 60;
      var hoursToAdd = parseInt(this._stopwatchParts.minutes / 60);
      this._stopwatchParts.hours += hoursToAdd;
      this._stopwatchParts.minutes -= hoursToAdd * 60;
    }
  }, {
    key: "_updateStopwatchText",
    value: function _updateStopwatchText() {
      this._stopwatch.innerText = "".concat(this._addPadding(this._stopwatchParts.hours)).concat(this._options.delimiter).concat(this._addPadding(this._stopwatchParts.minutes)).concat(this._options.delimiter).concat(this._addPadding(this._stopwatchParts.seconds));
    }
  }, {
    key: "_addPadding",
    value: function _addPadding(value) {
      var modifiedValue = value.toString().replace('-', '').padStart(2, '0');
      return value < 0 ? '-' + modifiedValue : modifiedValue;
    }
  }]);

  return SimpleStopwatch;
}();