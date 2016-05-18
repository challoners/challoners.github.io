$(document).ready(function() {
  $(".ripple").click(function(e) {
    /* 
    Set-up
    - Gets the element clicked
    - Changes base CSS properties for element
    - Removes any existing SVGs
    */
    var rplObj = this;
    $(rplObj).css({"position": "relative"});
    $(rplObj).find("svg").remove();

    /* 
    Coordinates
    - Gets X and Y position of where clicked happened
    - Fixes X and Y position for the viewport
    - Turns coordinates into integers for some browsers
    */
    var x = e.pageX;
    var y = e.pageY;
    var fixX = x - $(rplObj).offset().left;
    var fixY = y - $(rplObj).offset().top;
    var setX = parseInt(fixX);
    var setY = parseInt(fixY);

    /* 
    Shape
    - Creates the SVG circle and appends to the element clicked
    - Assigns the circle and svg to variables to be acessed later on
    - Sets up CSS properties for the SVG element
    - Creates dimensions for the circle element to use
    */
    $(rplObj).append('<svg><circle cx="' + setX + '" cy="' + setY + '" r="' + 0 +'"></circle></svg>');
    var ripple = $(rplObj).find("circle");
    var svg = $(rplObj).find("svg");
    var rippleDimensions = Math.sqrt(Math.pow($(rplObj).outerWidth() + 2, 2) + Math.pow($(rplObj).outerHeight() + 2, 2)).toFixed(2)
    $(svg).css({
      "position": "absolute",
      "top": "0",
      "left": "0",
      "width": "100%",
      "height": "100%"
    });

    /* 
    Ripple Color
    - Checks if data-ripple-color is present on element
    - Checks to see if value is auto, then sets to elements text color
    - Checks if data-ripple-color is present on element then sets ripple color to that value
    */
    var rippleColor = $(rplObj).data("ripple-color")
    var textColor = $(rplObj).css("color")

    if (rippleColor === undefined) {
      //No value
      $(ripple).css({"fill": "rgba(255,255,255,0.1)"});
    } else if (rippleColor === "auto") {
      //Auto
      textColor = textColor.replace(')', ', 0.4)').replace('rgb', 'rgba');
      $(ripple).css({"fill": textColor});
    } else {
      //Asign value
      $(ripple).css({"fill": rippleColor, "fill-opacity": "0.4"}); //If data-ripple-color is present, then set the color of the ripple
    }

    /* 
    Ripple Animation
    - Checks if data-ripple-delay, data-ripple-fade or data-ripple-speed is present on element
    - If any are present, then sets value to be the value given by element
    - Runs the final animation using settings that were calculated
    */
    var rippleDelay = $(rplObj).data("ripple-delay")
    var rippleFade = $(rplObj).data("ripple-fade")
    var rippleSpeed = $(rplObj).data("ripple-speed")

    //DELAY
    if (rippleDelay === undefined) {
      //Default
      rippleDelay = 200
    } else {
      //Asign value
      rippleDelay = $(rplObj).data("ripple-delay")
    }

    //FADE
    if (rippleFade === undefined) {
      //Default
      rippleFade = 400
    } else {
      //Asign value
      rippleFade = $(rplObj).data("ripple-fade")
    }

    //SPEED
    if (rippleSpeed === undefined) {
      //Default
      rippleSpeed = 200
    } else {
      //Asign value
      rippleSpeed = rippleSpeed = $(rplObj).data("ripple-speed")
    }

    //Animates the circles radius to fill the container it's in, with the settings calculated above
    ripple.animate({"r" : rippleDimensions},{duration: rippleSpeed,step : function(val){ripple.attr("r", val);}}).delay(rippleDelay).fadeOut(rippleFade); //If speed is present, then set speed of animation
  });
});
