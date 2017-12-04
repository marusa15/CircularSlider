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

var startAngle = -0.5*Math.PI;
var endAngle = 2*Math.PI;

function drawCircle(radius, x_slider, y_slider) {
        var canvas = document.getElementById('c-circle');
        var ctx = canvas.getContext('2d');
            
     
        ctx.strokeStyle = '#afb1b5';
        ctx.lineWidth = 15;
        ctx.setLineDash([5, 1]);
        ctx.lineDashOffset = 5;
        ctx.beginPath();
        ctx.arc(100,100,radius,startAngle,endAngle);
        ctx.stroke();

        ctx.strokeStyle = '#afb1b5';
        ctx.lineWidth = 1;
        ctx.setLineDash([0, 0]);
        ctx.globalAlpha = 1;        
        ctx.beginPath();
        ctx.arc(100,30,9.5,startAngle,endAngle);
        ctx.fill();
        ctx.fillStyle = '#ffffff';
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
        var elP = element.offset(); 
        var elPos = { x: elP.left, y: elP.top};   //dobi koordinate kvadrata 200x200 glede na dokument 
        console.log(elPos);
        
        
        var X = 0, Y = 0;
        var mdown = false;

        $('#c-circle').mousedown(function (event){ mdown = true; })
                    .mouseup(function (event) { mdown = true; })
                    .mousemove(function (event) {
                        if (mdown) {
                           var mPos = {x: event.clientX-elPos.x, y: event.clientY-elPos.y}; // polozaj x in y koordinate miske
                           console.log(mPos);
                           var atan = Math.atan2(mPos.x-radius, mPos.y-radius); // Math.atan2() vrne kot med x osjo in točko (x,y)
                           deg = -atan/(Math.PI/180) + 180; // final (0-360 positive) degrees from mouse position 
                           console.log('degrees', deg);

                           var part = deg / 360;
                           console.log('part', part);

                           colorCircle('#9c6fdb', 70, part);
                            
                           X = Math.round(radius* Math.sin(deg*Math.PI/180));    
                           Y = Math.round(radius*  -Math.cos(deg*Math.PI/180));

                          
                        }
                    });
      }

moveSlider($('#c-circle'));





 


