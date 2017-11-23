var options = [
	       {
      		container: 'con1',
      		color: 'blue',
      		maxValue: '100',
      		minValue: '0',
      		step: '1',
      		radius: '30px',
          category: 'Transport'
	       }
        ]

var displayCircle = function(options) {
  var circle = document.querySelector('#circle');

  circle.style.setProperty('border', '2px solid ' + options[0].color);
  circle.style.setProperty('width', options[0].radius);
  circle.style.setProperty('height', options[0].radius);
}

displayCircle(options);


var displayInput = function(options, element) {
    var inputElement='';
    var inputElement = '<input id="value-number" type="text" value="0"' + 
    ' class="range" data-max="' + options[0].maxValue + '" data-min="' + options[0].minValue +
     '"data-step="' + options[0].step +'" name="angle"><div class="category">' + options[0].category +
          '</div>';
  

    return element.html(inputElement);
} 

displayInput(options, $('.js-container__left')); 



var circulate = function() {
        var $container = $('#circle'); //?
        var $slider = $('#slider');
    
        var sliderW2 = $slider.width()/2;  // shrani v spremenljivko širino drsne ploščice brez enote in deli z dva (radij)
        var sliderH2 = $slider.height()/2;  

        var radius = 15; //radij vrtenja?
        var deg = 0;    
        var elP = $('#circle').offset();
        var elPos = { x: elP.left, y: elP.top}; // shrani v object koordinate el. #circle, kroznice
        var X = 0, Y = 0;
        var mdown = false;

        $('#circle').mousedown(function (e){ mdown = true; })
                    .mouseup(function (e) { mdown = true; })
                    .mousemove(function (e) {
                        if (mdown) {
                           var mPos = {x: e.clientX-elPos.x, y: e.clientY-elPos.y}; // polozaj x in y koordinate miske
                           var atan = Math.atan2(mPos.x-radius, mPos.y-radius); // Math.atan2() vrne kot med x osjo in točko (x,y)
                           deg = -atan/(Math.PI/180) + 180; // final (0-360 positive) degrees from mouse position 
                            
                           X = Math.round(radius* Math.sin(deg*Math.PI/180));    
                           Y = Math.round(radius*  -Math.cos(deg*Math.PI/180));

                           $slider.css({ left: X+radius-sliderW2, top: Y+radius-sliderH2 });              
                           // AND FINALLY apply exact degrees to ball rotation
                           $slider.css({ WebkitTransform: 'rotate(' + deg + 'deg)'});
                           $slider.css({ '-moz-transform': 'rotate(' + deg + 'deg)'});
                           //
                           // PRINT DEGREES
                           $('input[name="angle"]').val(Math.ceil(deg));
                        }
                    });
}


$(function(){ 
  circulate();

});

