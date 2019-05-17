class SimpleStopwatch {

    constructor(selector, options = {}) {
        this._options = Object.assign({
            autoStart: true,
            delimiter: ':',
            updateInterval: 1,
            regressive: false,
            stopAt: '01:00:00',
            onStop: function (currentStopwatchTime, stopwatchParts) { },
            onUpdateStopwatch: function (currentStopwatchTime, stopwatchParts) { }
        }, options);

        this._stopwatch = document.querySelector(selector);

        if (this._stopwatch == null) {
            console.error("Can't find the element.");
        } else {
            this._stopwatchParts = { hours: 0, minutes: 0, seconds: 0 };
            this._splitStopwatch();

            if (this._options.autoStart) this.start();
        }
    }


    start() {
        if (this._stopwatch != null) {
            this._stopwatchInterval = setInterval(() => {
                if (this._stopwatch.innerText == this._options.stopAt) {
                    this.stop();
                    this._options.onStop(this._stopwatch, this._stopwatchParts);
                } else {
                    this._updateStopwatch();
                }
            }, this._options.updateInterval * 1000);
        }
    }

    stop() {
        if (this._stopwatch != null) {
            clearInterval(this._stopwatchInterval);
        }
    }

    reset() {
        if (this._stopwatch != null) {
            this._stopwatchParts.hours = 0;
            this._stopwatchParts.minutes = 0;
            this._stopwatchParts.seconds = 0;

            this._updateStopwatchText();
        }
    }

    increment({ hours = 0, minutes = 0, seconds = 0 }) {
        this._stopwatchParts.hours += hours;
        this._stopwatchParts.minutes += minutes;
        this._stopwatchParts.seconds += seconds;

        this._adjustStopwatch();
        this._updateStopwatchText();
    }

    decrement({ hours = 0, minutes = 0, seconds = 0 }) {
        this._stopwatchParts.hours -= hours;
        this._stopwatchParts.minutes -= minutes;
        this._stopwatchParts.seconds -= seconds;

        this._adjustStopwatch();
        this._updateStopwatchText();
    }

    _splitStopwatch() {
        let stopwatchParts = this._stopwatch.innerText.split(this._options.delimiter);
        this._stopwatchParts.hours = parseInt(stopwatchParts[0]);
        this._stopwatchParts.minutes = parseInt(stopwatchParts[1]);
        this._stopwatchParts.seconds = parseInt(stopwatchParts[2]);
    }

    _updateStopwatch() {
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

    _adjustStopwatch() {
        let minutesToAdd = parseInt(this._stopwatchParts.seconds / 60);
        this._stopwatchParts.minutes += minutesToAdd;
        this._stopwatchParts.seconds -= minutesToAdd * 60;

        let hoursToAdd = parseInt(this._stopwatchParts.minutes / 60);
        this._stopwatchParts.hours += hoursToAdd;
        this._stopwatchParts.minutes -= hoursToAdd * 60;
    }

    _updateStopwatchText() {
        this._stopwatch.innerText = `${this._addPadding(this._stopwatchParts.hours)}${this._options.delimiter}${this._addPadding(this._stopwatchParts.minutes)}${this._options.delimiter}${this._addPadding(this._stopwatchParts.seconds)}`;
    }

    _addPadding(value) {
        let modifiedValue = value.toString().replace('-', '').padStart(2, '0');

        return value < 0 ? ('-' + modifiedValue) : modifiedValue;
    }
}