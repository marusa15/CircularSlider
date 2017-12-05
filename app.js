var options = [
	       {
      		container: 'con1',
      		color: 'blue',
      		maxValue: '100',
      		minValue: '0',
      		step: '1',
      		radius: '30px',
          category: 'Transport',
          clicked: 'false'
	       },
         {
          container: 'con1',
          color: 'green',
          maxValue: '1000',
          minValue: '250',
          step: '1',
          radius: '60px',
          category: 'Food',
          clicked: 'false'
         },
         {
          container: 'con1',
          color: 'red',
          maxValue: '1000',
          minValue: '250',
          step: '5',
          radius: '100px',
          category: 'Food',
          clicked: 'false'
         }
        ]



var clickCircle = function(options, item) {

  currentItem = getItem(options, item);
  options.Current = item;
  options[item].clicked = true;

}

function getItem(options, itemIndex) {
    return options[itemIndex];    
}



// display functions

document.body.onload = function() {
drawCircle();
drawSlider(100, 30);
};

var startAngle = -0.5*Math.PI;
var endAngle = 2*Math.PI;

function drawCircle(radius, x_slider, y_slider) {
        var canvas = document.getElementById('c-circle');
        var ctx = canvas.getContext('2d');
            
     
        ctx.strokeStyle = '#afb1b5';
        ctx.lineWidth = 15; // does not affect the radius, goes 7.5 out and 7.5 in
        ctx.setLineDash([5, 1]);
        ctx.lineDashOffset = 5;
        ctx.beginPath();
        ctx.arc(100,100,radius,startAngle,endAngle);
        ctx.stroke();
}

        // sliding button
function drawSlider(X,Y) {
        var canvas = document.getElementById('c-circle');
        var ctx = canvas.getContext('2d');

        ctx.strokeStyle = '#afb1b5';
        ctx.lineWidth = 1;
        ctx.setLineDash([0, 0]);
        ctx.beginPath();
        ctx.arc(X,Y,9.5,startAngle,endAngle);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
        ctx.stroke();
}

        // part of circle in color
function colorCircle(hue, radius, part) {
        var canvas = document.getElementById('c-circle');
        var ctx = canvas.getContext('2d');
        

        ctx.strokeStyle = hue;
        ctx.lineWidth = 15;
        ctx.setLineDash([0, 0]); 
        ctx.globalAlpha = 0.5;
        ctx.beginPath();
        ctx.arc(100,100,radius,startAngle, startAngle + part*endAngle);
        ctx.stroke();
}
       
       

      

drawCircle(70);


var moveSlider = function(element) {

      //  var $slider = $('#slider-' + i);
    
        var sliderW2 = 4.75;
         // shrani v spremenljivko širino drsne ploščice brez enote in deli z dva (radij)
        var sliderH2 = 4.75;  

       
        
      //  var diameter = parseInt(options[itemIndex].radius, 10);
      //  var radius = diameter/2;
        var radius = 70; 
        var deg = 0;
        var elP = element.offset();  //razmisli, na kakšen drugi način bi se to dalo rešit
        var elPos = { x: elP.left, y: elP.top};   //dobi koordinate kvadrata 200x200 glede na dokument 
        console.log('elpos', elPos);
        
        
        var X = 0, Y = 0;
        var mdown = true;

        $('#c-circle').click(function (event) {
                        if (mdown) {
                           var mPos = {x: event.clientX-elPos.x-30, y: event.clientY-elPos.y-30}; // polozaj x in y koordinate miske
                           
                           console.log('client', event.clientX, event.clientY);
                           console.log('mouseposition', mPos.x, mPos.y);
                           var atan = Math.atan2(mPos.x-radius, mPos.y-radius); // Math.atan2() vrne kot med x osjo in točko (x,y)
                           console.log('atan', atan);
                           deg = -atan/(Math.PI/180) + 180; // final (0-360 positive) degrees from mouse position 
                           console.log('-atan/(Math.PI/180)',-atan/(Math.PI/180));
                           console.log('degrees', deg);
                           
                           console.log('part', part);

                           var part = deg / 360;
                           console.log('part', part);

                           

                           colorCircle('#9c6fdb', 70, part);

                       //    $slider.css({ left: X+radius-sliderW2, top: Y+radius-sliderH2 });              
                            
                           X = Math.round(radius* Math.sin(deg*Math.PI/180));    
                           Y = Math.round(radius*  -Math.cos(deg*Math.PI/180));

                           // PRINT DEGREES
                           $('input[name="angle"]').val(Math.ceil(deg));                            
                          
                        }
                    });
      }

moveSlider($('#c-circle'));





 


