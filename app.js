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

// display functions

document.body.onload = function() {

myCircle.draw(100, 100, 70, '#afb1b5');
drawSlider(100, 30);

};

function Circle(x, y, radius, color, lineWidth) {
  this.x = x || 100;
  this.y = y || 100;
  this.radius = radius || 70;
  this.startAngle = -0.5*Math.PI;
  this.endAngle = 2*Math.PI;
  this.color = color || '#afb1b5';
  this.lineWidth = lineWidth || 15;
}

var myCircle = new Circle();


Circle.prototype.draw = function(ctx) {
          var canvas = document.getElementById('c-circle');
          var ctx = canvas.getContext('2d');
              
       
          ctx.strokeStyle = this.color;
          ctx.lineWidth = 15; // does not affect the radius, goes 7.5 out and 7.5 in
          ctx.setLineDash([5, 1]);
          ctx.lineDashOffset = 5;
          ctx.beginPath();
          ctx.arc(100,100,this.radius,-0.5*Math.PI,2*Math.PI);

          ctx.stroke();
}


        // sliding button
function drawSlider(X,Y) {
        var canvas = document.getElementById('c-circle');
        var ctx = canvas.getContext('2d');

        
        ctx.strokeStyle = '#afb1b5';
        ctx.lineWidth = 1;
        ctx.setLineDash([0, 0]);
        ctx.globalAlpha = 1;
        
       
        ctx.beginPath();
        ctx.arc(X,Y,9.5,-0.5*Math.PI,2*Math.PI);
        
       
        ctx.fillStyle = '#ffffff';
        ctx.fill();
        ctx.stroke();
}

function clear() {
    var canvas = document.getElementById('c-circle');
    var ctx = canvas.getContext('2d');
  
    ctx.clearRect(0,0, 200, 200);
}


        // part of circle in color
function colorCircle(hue, radius, part) {
        var canvas = document.getElementById('c-circle');
        var ctx = canvas.getContext('2d');
        
        var startAngle = -0.5*Math.PI;

        ctx.strokeStyle = hue;
        ctx.lineWidth = 15;
        ctx.setLineDash([0, 0]); 
        ctx.globalAlpha = 0.5;
        ctx.beginPath();
        ctx.arc(100,100,radius,startAngle, part);
        ctx.stroke();        
}

function CanvasState(canvas) {
  this.canvas = canvas;
  this.valid = false; 
  var myState = this;
  this.interval = 30;
  setInterval(function(){ myState.draw(); }, myState.interval);

}





var moveSlider = function(element) {

      //  var $slider = $('#slider-' + i);
    
        var sliderW2 = 4.75;
         // shrani v spremenljivko širino drsne ploščice brez enote in deli z dva (radij)
        var sliderH2 = 4.75;  

       
        
      //  var diameter = parseInt(options[itemIndex].radius, 10);
      //  var radius = diameter/2;


        var radius = 70;
        var radiusMax = radius + sliderH2;
        var radiusMin = radius - sliderH2;

        // centre of the circle coordinates
        var x0 = 100; 
        var y0 = 100; 
        var deg = 0;
        var elP = element.offset();  //razmisli, na kakšen drugi način bi se to dalo rešit
        var elPos = { x: elP.left, y: elP.top};   //dobi koordinate kvadrata 200x200 glede na dokument 
        console.log('elpos', elPos);
        
        
        var X = 0, Y = 0;
        var mdown = false;

        // Determine if a point is inside the shape's bounds
        Circle.prototype.contains = function(x, y) {
                          
          return ((Math.sqrt((x-x0)*(x-x0) + (y-y0)*(y-y0))) <= radiusMax) && (Math.sqrt((x-x0)*(x-x0) + (y-y0)*(y-y0)) >= radiusMin);
          
        }

        var mouseHandler = function(event) {
                          var mPos = {x: event.clientX-elPos.x-30, y: event.clientY-elPos.y-30}; // polozaj x in y koordinate miske
                           
                           if (Circle.prototype.contains(event.clientX-elPos.x, event.clientY-elPos.y)) {
                             // event.prevent default in stop propagation morda da se movementi ne razširijo preveč.
                             
                             console.log('client', event.clientX, event.clientY);
                             console.log('mouseposition', mPos.x, mPos.y);
                             var atan = Math.atan2(mPos.x-radius, mPos.y-radius); // Math.atan2() vrne kot med x osjo in točko (x,y)
                             console.log('atan', atan);
                             deg = -atan/(Math.PI/180) + 180; // final (0-360 positive) degrees from mouse position 
                             console.log('-atan/(Math.PI/180)',-atan/(Math.PI/180));
                             console.log('degrees', deg);
                             
                             
                             var part = -0.5*Math.PI + deg * (Math.PI/180);

                             clear();

                             myCircle.draw(100, 100, 70, '#afb1b5');
                             colorCircle('#9c6fdb', 70, part);                                                            
                              
                             X = Math.round(radius* Math.sin(deg*Math.PI/180));    
                             Y = Math.round(radius*  -Math.cos(deg*Math.PI/180));
                             
                            // cutSlider(100,30,9.5);
                             drawSlider(X+100,Y+100); //add the center of circle coordinates
                                                    

                           

                             // PRINT DEGREES
                             $('input[name="angle"]').val(Math.ceil(deg));                            
                          } 



        }



        $('#c-circle').click(function (event) { // later on add mousemove, mouseup and mousedown
                        event.preventDefault();
                        event.stopPropagation();
                        mouseHandler(event);
                    });
        
        $('#c-circle').mousedown(function (event){ mdown = true; })
                    .mouseup(function (event) { mdown = false; })
                    .mousemove(function (event) {
                      event.preventDefault();
                      event.stopPropagation();

                      if (mdown) {
                           mouseHandler(event);     
                     
                        }
                    });   

      } 



moveSlider($('#c-circle'));





 


