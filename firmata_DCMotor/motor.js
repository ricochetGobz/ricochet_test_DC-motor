var five = require("johnny-five");
var board, motor, led;

var VEL = 2;
var TIMER = 5;

var MAX_SENSOR = 255;
var MEDIUM_SENSOR = 150;
var MIN_SENSOR = 80;

var speed = 0;
var decrementActive = false;

function decrementSpeed() {
  speed -= VEL;
  console.log(speed);

  motor.speed(speed);

  board.wait(TIMER, function() {
    if(speed > 0.5) {
      decrementSpeed(speed);
    } else {
      decrementActive = false;
    }
  });
}

function setSpeed(_speed) {
  console.log("set speed");
  if(_speed > speed) {
    speed = _speed;

    console.log("ok");

    if(!decrementActive) {
      decrementActive = true;
      decrementSpeed();
    }
  }
}


board = new five.Board();

board.on("ready", function() {
  // Create a new `motor` hardware instance.
  motor = new five.Motor({
    pin: 3
  });

  motor.on("start", function() {
    console.log("start", Date.now());

    setSpeed(MIN_SENSOR);

    board.wait(1000, function() {
      setSpeed(MEDIUM_SENSOR);
    });

    board.wait(2000, function() {
      setSpeed(MAX_SENSOR);
    });

    board.wait(3000, function() {
      setSpeed(MAX_SENSOR);
    });

    board.wait(8000, function() {
      setSpeed(MIN_SENSOR);
    });

    // Demonstrate motor stop in 2 seconds
    board.wait(10000, function() {
      motor.stop();
    });
  });

  motor.on("stop", function() {
    console.log("stop", Date.now());
  });

  motor.start();
});
