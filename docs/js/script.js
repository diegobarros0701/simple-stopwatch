(function() {
    document.getElementById('btn-start-stopwatch').addEventListener('click', function() {
        simpleStopwatch.start();
    }, false);

    document.getElementById('btn-stop-stopwatch').addEventListener('click', function() {
        simpleStopwatch.stop();
    }, false);

    document.getElementById('btn-reset-stopwatch').addEventListener('click', function() {
        var resetValue = document.getElementById('reset-value').value.split(':');
        simpleStopwatch.reset({
            hours: parseInt(resetValue[0]),
            minutes: parseInt(resetValue[1]),
            seconds: parseInt(resetValue[2]),
        })
    }, false);

    document.getElementById('btn-increment-stopwatch').addEventListener('click', function() {
        var incrementValue = document.getElementById('increment-value').value.split(':');
        simpleStopwatch.increment({
            hours: parseInt(incrementValue[0]),
            minutes: parseInt(incrementValue[1]),
            seconds: parseInt(incrementValue[2]),
        })
    }, false);

    document.getElementById('btn-decrement-stopwatch').addEventListener('click', function() {
        var decrementValue = document.getElementById('decrement-value').value.split(':');
        simpleStopwatch.decrement({
            hours: parseInt(decrementValue[0]),
            minutes: parseInt(decrementValue[1]),
            seconds: parseInt(decrementValue[2]),
        })
    }, false);
})()