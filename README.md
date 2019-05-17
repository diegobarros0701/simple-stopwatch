## Simple Stopwach
Simple Stopwatch is a JS plugin made only with Vanilla JS. It has no dependencies which helps to make it fastest as possible.  

## Usage
```html
<span id="timer">00:00:00</span>
```  

```javascript
var simpleStopwatch = new SimpleStopwatch('#timer', {
    autoStart: true, // Start on create the instance, if false will need to call the start() function
    delimiter: ':', // Delimiter used in the text
    updateInterval: 1, // After each seconds update the time
    regressive: false, // If true, the stopwatch will count backwards
    stopAt: '00:00:10', // Stop at certain time
    onStop: function (stopwatchElement, stopwatchParts) {
        // Event trigged on stop
    },
    onUpdateStopwatch: function(stopwatchElement, stopwatchParts) {
        // Event trigged on each update of the stopwatch
    }
});
```  

## Events

#### # onStop(stopwatchElement, stopwatchParts)  
Called when the stopwatch reaches the value specified in the **stopAt** property.

#### # onUpdateStopwatch(stopwatchElement, stopwatchParts)  
Called when the stopwatch is updated.

## Methods
List of available methods

#### # start()
Start the stopwatch

#### # stop()
Stop the stopwatch

#### reset({ hours = 0, minutes = 0, seconds = 0})
Reset the stopwatch to the specified time

#### increment({ hours = 0, minutes = 0, seconds = 0})
Increment the stopwatch with the specified time parts.  
**Note:** You don't need to pass all the properties, pass only the ones that you need.

#### decrement({ hours = 0, minutes = 0, seconds = 0})
Decrement the stopwatch with the specified time parts.  
**Note:** You don't need to pass all the properties, pass only the ones that you need.
