var canvas = document.getElementById('c-circle');
x0 = canvas.width / 2;
y0 = canvas.height / 2;
var sliderW2 = 4.75;
var sliderH2 = 4.75;
var radius;  
var radiusMax = radius + sliderH2;
var radiusMin = radius - sliderH2;


var options = [
	       {
  		  container: 'con1',
  		  color: 'blue',
  		  maxValue: '100',
  		  minValue: '0',
  		  step: '1',
  		  radius: '30', //in pixels
          category: 'Transport',
          part: -0.5*Math.PI,
          sliderX: x0,
          sliderY: y0 - this.radius,
          deg: 0
          
	       },
         {
          container: 'con1',
          color: 'green',
          maxValue: '1000',
          minValue: '250',
          step: '1',
          radius: '60',
          category: 'Food',
          part: -0.5*Math.PI,
          sliderX: x0,
          sliderY: y0 - this.radius,
          deg: 0
         },
         {
          container: 'con1',
          color: 'red',
          maxValue: '1000',
          minValue: '250',
          step: '5',
          radius: '90',
          category: 'Food',
          part: -0.5*Math.PI,
          sliderX: x0,
          sliderY: y0 - this.radius,
          deg: 0
         },
         {
          container: 'con1',
          color: '#239fd1',
          maxValue: '1000',
          minValue: '250',
          step: '5',
          radius: '120',
          category: 'Food',
          part: -0.5*Math.PI,
          sliderX: x0,
          sliderY: y0 - this.radius,
          deg: 0
         },
         {
          container: 'con1',
          color: '#872fd8',
          maxValue: '1000',
          minValue: '250',
          step: '5',
          radius: '150',
          category: 'Food',
          part: -0.5*Math.PI,
          sliderX: x0,
          sliderY: y0 - this.radius,
          deg: 0
         },
        ]

// state modification functions


    
// display functions



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

// event listeners


var moveSlider = function(element) {
     //   var deg = 0;
        var elP = element.offset();  //razmisli, na kakšen drugi način bi se to dalo rešit
        var elPos = { x: elP.left, y: elP.top};   //dobi koordinate kvadrata 200x200 glede na dokument 
    //    var X = 0, Y = 0;
        var mdown = false;


        function circleContains(x, y) { // Determine if a point is inside the circle's bounds
          var radiusMax = parseInt(radius) + parseInt(sliderH2);
          var radiusMin = radius - sliderH2;
                         
          return ((Math.sqrt((x-x0)*(x-x0) + (y-y0)*(y-y0))) <= radiusMax) && (Math.sqrt((x-x0)*(x-x0) + (y-y0)*(y-y0)) >= radiusMin);
        }

        function whichCircle (event) {
              var x = event.clientX-elPos.x;
              var y = event.clientY-elPos.y;

              
              for (i=0; i < options.length; i++) {
                var radiusMax = parseInt(options[i].radius) + parseInt(sliderH2);
                var radiusMin = options[i].radius - sliderH2;
               
                if (((Math.sqrt((x-x0)*(x-x0) + (y-y0)*(y-y0))) <= radiusMax) && (Math.sqrt((x-x0)*(x-x0) + (y-y0)*(y-y0)) >= radiusMin)) {
                  radius = options[i].radius;
                }     
              } 
              return radius;  
            }   

        function mouseHandler(event, radius) {
            var mPos = {x: event.clientX-elPos.x-(x0-radius), y: event.clientY-elPos.y-(x0-radius)}; // polozaj x in y koordinate miske
            var index = options.findIndex(x => x.radius==radius);
                          
            if (circleContains(event.clientX-elPos.x, event.clientY-elPos.y)) {
                
                var atan = Math.atan2(mPos.x-radius, mPos.y-radius); // Math.atan2() vrne kot med x osjo in točko (x,y)                                                
                deg = -atan/(Math.PI/180) + 180; // final (0-360 positive) degrees from mouse position                                    
                             
                var part = -0.5*Math.PI + deg * (Math.PI/180);
                X = Math.round(radius* Math.sin(deg*Math.PI/180));    
                Y = Math.round(radius*  -Math.cos(deg*Math.PI/180));             
                             
                function updateState() {
                    options[index].part = part;
                    options[index].sliderX = X;
                    options[index].sliderY = Y;
                    options[index].deg = Math.ceil(deg);                                       
                }          
                updateState();               
                clear();             

                for (i=0; i < options.length; i++) {
                              drawCircle(options[i].radius);
                              colorCircle(options[i].color, options[i].radius, options[i].part);
                              drawSlider(options[i].sliderX + x0, options[i].sliderY + y0); 
                    }                          
            }                  
        } 

         $('#c-circle').click(function (event) { // later on add mousemove, mouseup and mousedown
                        event.preventDefault();
                        event.stopPropagation();
                        
                        whichCircle(event);
                        mouseHandler(event, radius);
                    });
        
        $('#c-circle').mousedown(function (event){ mdown = true; })
                    .mouseup(function (event) { mdown = false; })
                    .mousemove(function (event) {
                      event.preventDefault();
                      event.stopPropagation();

                      if (mdown) {
                           
                           whichCircle(event);
                           mouseHandler(event, radius);     
                     
                        }
                    });                               
}

document.body.onload = function(radius) {

  drawCircle(radius);
  drawSlider(x0, y0 - radius); 

};

for (i=0; i < options.length; i++) {
  console.log('length', options.length);
  document.body.onload(options[i].radius);
}

moveSlider($('#c-circle'));                             
                            
                             


                             
                             

                             

                             
                             
                               

                        
                                                                     

                           

                                                       
                                         
                          

                          

        
        
       
        
        
        


      
        
       
     
        

        
   
     
       
        



       

       









 


