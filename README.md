## Pure File Drop
Simple Stopwatch is a JS plugin made only with Vanilla JS. It has no dependencies which helps to make it fastest as possible.  

## Usage
```html
<span id="timer">00:00:00</span>
```  

```javascript
var simpleStopwatch = new SimpleStopwatch('#timer', {
    autoStart: true, // start on create, if false will need to call the start() function
    delimiter: ':', // delimiter use in the text
    updateInterval: 1, // update the stopwatch after each 1 second
    regressive: false, // if true, will go backwards
    stopAt: '00:00:10', // stop at certain time
    onStop: function (currentStopwatchTime, stopwatchParts) {
        // Event trigged on stop
    },
    onUpdateStopwatch: function(currentStopwatchTime, stopwatchParts) {
        // Event trigged on each update of the stopwatch
    }
});
```

## Methods
List of available methods

#### start()
Start the stopwatch

#### stop()
Stop the stopwatch

#### reset(to = '00:00:00')
Reset the stopwatch to the specified time

#### increment({ hour: 0, minutes: 0, seconds: 0 })
Increment the stopwatch with the specified time parts.  
**Note:** You don't need to pass all the properties, pass only the ones that you need.

#### decrement({ hour: 0, minutes: 0, seconds: 0 })
Decrement the stopwatch with the specified time parts.  
**Note:** You don't need to pass all the properties, pass only the ones that you need.