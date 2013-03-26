var waitFor = require('./awf');

var test = waitFor();

setTimeout(function() {
    test(function() {
        console.log('world');
    });
}, 100);

setTimeout(function() {
    console.log('hello');
    test();
}, 200);

setTimeout(function() {
    test(function() {
        console.log('!');
    });
}, 150);