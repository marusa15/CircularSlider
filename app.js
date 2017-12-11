var options = [
	       {
      		container: 'con1',
      		color: 'blue',
      		maxValue: '100',
      		minValue: '0',
      		step: '1',
      		radius: '30', //in pixels
          category: 'Transport',
          part: -0.5*Math.PI
          
	       },
         {
          container: 'con1',
          color: 'green',
          maxValue: '1000',
          minValue: '250',
          step: '1',
          radius: '60',
          category: 'Food',
          part: -0.5*Math.PI
         },
         {
          container: 'con1',
          color: 'red',
          maxValue: '1000',
          minValue: '250',
          step: '5',
          radius: '90',
          category: 'Food',
          part: -0.5*Math.PI
         }
        ]

// state modification functions
var sliderW2 = 4.75;
var sliderH2 = 4.75;
var radius;  
var radiusMax = radius + sliderH2;
var radiusMin = radius - sliderH2;

         
var clickCircle = function(options, item) {
   currentItem = getItem(options, item);
   options.Current = item;
   options[item].clicked = true;
}

 



var canvas = document.getElementById('c-circle');
x0 = canvas.width / 2;
y0 = canvas.height / 2;

// display functions

document.body.onload = function(radius) {

  drawCircle(radius);
  drawSlider(x0, x0 - radius); // (100, 30) is initial position 30 = 100 - radius


};

function drawCircle(radius) {
        var canvas = document.getElementById('c-circle');
        var ctx = canvas.getContext('2d');
            
     
        ctx.strokeStyle = '#afb1b5';
        ctx.lineWidth = 15; // does not affect the radius, goes 7.5 out and 7.5 in
        ctx.setLineDash([5, 1]);
        ctx.lineDashOffset = 5;
        ctx.beginPath();
        ctx.arc(x0,y0,radius,-0.5*Math.PI,2*Math.PI);
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
  
    ctx.clearRect(0,0, canvas.width, canvas.height);
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
        ctx.arc(x0,y0,radius,startAngle, part);
        ctx.stroke();        
}



function CanvasState(canvas) {
  this.canvas = canvas;
  this.valid = false; 
  var myState = this; 
  this.interval = 30; // maybe this would be useful to remove black square appearing in mobile
  setInterval(function(){ myState.draw(); }, myState.interval);

}


// event listeners




var moveSlider = function(element) {

     
    
        var sliderW2 = 4.75;
        var sliderH2 = 4.75;
        
       
     

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

        // Determine if a point is inside the circle's bounds
        var circleContains = function(x, y) {
                          
          return ((Math.sqrt((x-x0)*(x-x0) + (y-y0)*(y-y0))) <= radiusMax) && (Math.sqrt((x-x0)*(x-x0) + (y-y0)*(y-y0)) >= radiusMin);
          
        }

        var whichCircle = function(event) {
          var x = event.clientX-elPos.x;
          var y = event.clientY-elPos.y;
          
          for (i=0; i < options.length; i++) {
            var radiusMax = parseInt(options[i].radius) + parseInt(sliderH2);
            var radiusMin = options[i].radius - sliderH2;
           
            if (((Math.sqrt((x-x0)*(x-x0) + (y-y0)*(y-y0))) <= radiusMax) && (Math.sqrt((x-x0)*(x-x0) + (y-y0)*(y-y0)) >= radiusMin)) {
              var radius = options[i].radius;
              console.log('recent radius', radius);
              return radius;
            }
          }

        }




        console.log('options befor event', options);
        var mouseHandler = function(event) {
                          var mPos = {x: event.clientX-elPos.x-(x0-radius), y: event.clientY-elPos.y-(x0-radius)}; // polozaj x in y koordinate miske
                           
                           if (circleContains(event.clientX-elPos.x, event.clientY-elPos.y)) {

                             // event.prevent default in stop propagation morda da se movementi ne razširijo preveč.
                            console.log('radius', radius, options);                             
                            index = options.findIndex(x => x.radius==radius);
                             
                            console.log('radius', radius, index, options[index]);
                                      
                                                    
                             
                             console.log('client', event.clientX, event.clientY);
                             console.log('mouseposition', mPos.x, mPos.y);
                             var atan = Math.atan2(mPos.x-radius, mPos.y-radius); // Math.atan2() vrne kot med x osjo in točko (x,y)
                             console.log('atan', atan);
                             deg = -atan/(Math.PI/180) + 180; // final (0-360 positive) degrees from mouse position 
                             console.log('-atan/(Math.PI/180)',-atan/(Math.PI/180));
                             console.log('degrees', deg);

                             
                             console.log('before part', options[index].part);
                          //   var part = -0.5*Math.PI + deg * (Math.PI/180);
                             options[index].part = -0.5*Math.PI + deg * (Math.PI/180);
                             console.log('after part', options[index].part);
                             console.log(options);

                             clear();
                             for (i=0; i < options.length; i++) {
                              drawCircle(options[i].radius);
                             }

                             colorCircle('#9c6fdb', radius, options[index].part);                                                            
                              
                             X = Math.round(radius* Math.sin(deg*Math.PI/180));    
                             Y = Math.round(radius*  -Math.cos(deg*Math.PI/180));
                             
                            // cutSlider(100,30,9.5);
                             drawSlider(X+x0,Y+y0); //add the center of circle coordinates
                                                    

                           

                             // PRINT DEGREES
                             $('input[name="angle"]').val(Math.ceil(deg));                            
                          } 

                          else {
                             
                          }



        }



        $('#c-circle').click(function (event) { // later on add mousemove, mouseup and mousedown
                        event.preventDefault();
                        event.stopPropagation();
                      //  mouseHandler(event);
                        whichCircle(event);
                    });
        
        $('#c-circle').mousedown(function (event){ mdown = true; })
                    .mouseup(function (event) { mdown = false; })
                    .mousemove(function (event) {
                      event.preventDefault();
                      event.stopPropagation();

                      if (mdown) {
                        //   mouseHandler(event);
                           whichCircle(event);     
                     
                        }
                    });   

      } 

for (i=0; i < options.length; i++) {
  console.log('length', options.length);
  document.body.onload(options[i].radius);
//  moveSlider($('#c-circle'), options[i].radius);
  
}

moveSlider($('#c-circle'));







 


