$(document).ready(function() {
  $(".ripple").click(function(e) {
    var rplObj = this; //Gets the ripple object

    $(rplObj).css({"position": "relative"}); //Sets position relative for the objects
    
    $(rplObj).find("svg").remove(); //Find and remove any existing SVGs

    //Coordinates
    var x = e.pageX; //Get X coordinates of mouse
    var y = e.pageY; //Get Y coordinates of mouse
    var fixX = x - $(rplObj).offset().left; //Fix X for viewport
    var fixY = y - $(rplObj).offset().top; //Fix Y for viewport
    var setX = parseInt(fixX); //Set X to integer for some browsers
    var setY = parseInt(fixY); //Set Y to integer for some browsers

    //Shape
    $(rplObj).append('<svg><circle cx="' + setX + '" cy="' + setY + '" r="' + 0 +'"></circle></svg>'); //Set new SVG in correct location
    var ripple = $(rplObj).find("circle"); //Find ripple object
    var svg = $(rplObj).find("svg"); //Finds svg object

    //CSS
    $(svg).css({
      "position": "absolute",
      "top": "0",
      "left": "0",
      "width": "100%",
      "height": "100%"
    });

    //Stores the data-ripple-color in a variable
    var rippleColor = $(rplObj).data("ripple-color")
    var textColor = $(rplObj).css("color")
    if (rippleColor === undefined) {
      $(ripple).css({"fill": "rgba(255,255,255,0.1)"}); //Default value for the circle color
    } else if (rippleColor === "auto") {
      textColor = textColor.replace(')', ', 0.4)').replace('rgb', 'rgba'); //If value is "auto" then set ripple colour to the text colour
      $(ripple).css({"fill": textColor});
    } else {
      $(ripple).css({"fill": rippleColor, "fill-opacity": "0.4"}); //If data-ripple-color is present, then set the color of the ripple
    }

    var rippleDimensions = Math.sqrt(Math.pow($(rplObj).outerWidth() + 2, 2) + Math.pow($(rplObj).outerHeight() + 2, 2)).toFixed(2) //Sets dimensions of the ripple based on diagonal of abject
    
    //If data-ripple-speed is present, then create ripple with data-ripple-speed then fade out after .8s else create ripple with 0.2s duration and also fade out after 0.8s
    var rippleSpeed = $(rplObj).data("ripple-speed")
    if (rippleSpeed === undefined) {
      ripple.animate({"r" : rippleDimensions},{duration: 200,step : function(val){ripple.attr("r", val);}}).delay(200).fadeOut(400); //Default speed
    } else {
      ripple.animate({"r" : rippleDimensions},{duration: rippleSpeed,step : function(val){ripple.attr("r", val);}}).delay(200).fadeOut(400); //If speed is present, then set speed of animation
    }
  });
});