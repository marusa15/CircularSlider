var options = {
	slider__1 : {
		container: 'con1',
		color: 'blue',
		maxValue: '100',
		minVvalue: '0',
		step: '1',
		radius: '30px'
	},
}



$('#circle').css({'border': '2px solid blue'});
$('#circle').css({'width': '30px'}); //radius
$('#circle').css({'height': '30px'}); //radius
$('input[name="angle"]').attr( "data-max", "100"); 
$('input[name="angle"]').attr( "data-min", "0"); 
$('input[name="angle"]').attr( "data-step", "1"); 



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

