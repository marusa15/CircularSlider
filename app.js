var canvas = document.getElementById('default');
x0 = canvas.width / 2;
y0 = canvas.height / 2;
var sliderW2 = 4.75;
var sliderH2 = 4.75;
var radius; 
 
var radiusMax = radius + sliderH2;
var radiusMin = radius - sliderH2;


var options = [
	       {
      		container: 'default',
      		color: 'blue',
      		maxValue: '100',
      		minValue: '0',
      		step: '1',
      		radius: '150', //in pixels
            category: 'Transport',
            part: -0.5*Math.PI,
            sliderX: x0,
            sliderY: y0 - this.radius,
            deg: 0
                     
	       },
         {
          container: 'default',
          color: 'green',
          maxValue: '1000',
          minValue: '250',
          step: '1',
          radius: '120',
          category: 'Food',
          part: -0.5*Math.PI,
          sliderX: x0,
          sliderY: y0 - this.radius,
          deg: 0
         },
         {
          container: 'default',
          color: 'red',
          maxValue: '1000',
          minValue: '250',
          step: '5',
          radius: '90',
          category: 'Insurance',
          part: -0.5*Math.PI,
          sliderX: x0,
          sliderY: y0 - this.radius,
          deg: 0
         },
         {
          container: 'default',
          color: '#239fd1',
          maxValue: '1000',
          minValue: '250',
          step: '5',
          radius: '60',
          category: 'Health care',
          part: -0.5*Math.PI,
          sliderX: x0,
          sliderY: y0 - this.radius,
          deg: 0
         },
         {
          container: 'default',
          color: '#872fd8',
          maxValue: '100',
          minValue: '0',
          step: '5',
          radius: '30',
          category: 'Food',
          part: -0.5*Math.PI,
          sliderX: x0,
          sliderY: y0 - this.radius,
          deg: 0
         },
        ]

// state modification functions


    
// display functions

function setCanvas() {
    var canvasArray = [];
    var uniqueCanvases = [];

    for (i=0; i < options.length; i++) {
        if (options[i].container != 'default') {
            canvasArray.push(options[i].container);
        }
    }


    function eliminateDuplicates(canvasArray) {
      var i,
          len=canvasArray.length,
          obj={};

      for (i=0;i<len;i++) {
        obj[canvasArray[i]]=0;
      }
      for (i in obj) {
        uniqueCanvases.push(i);
      }
      
      return uniqueCanvases;
    }

    eliminateDuplicates(canvasArray);
    


    for (i=0; i < uniqueCanvases.length; i++) {
        
        $('.js-container').append('<canvas id="' + uniqueCanvases[i] + '" width="320" height="320">This text is displayed if your browser does not support HTML5 Canvas.</canvas>'+
             '<div class="instructions">ADJUST DIAL TO ENTER EXPENSES</div>');

    }      
} 
       
function drawCircle(radius) {
        var canvas = document.getElementById('default');
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
        var canvas = document.getElementById('default');
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
    var canvas = document.getElementById('default');
    var ctx = canvas.getContext('2d');
  
    ctx.clearRect(0,0, canvas.width, canvas.height);
}


        
function colorCircle(hue, radius, part) {
        var canvas = document.getElementById('default');
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
        var elP = element.offset();  //razmisli, na kakšen drugi način bi se to dalo rešit
        var elPos = { x: elP.left, y: elP.top};   //dobi koordinate kvadrata 200x200 glede na dokument 
        console.log(elPos.x, elPos.y);
        var mdown = false;
        var deg = 0;


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
                console.log(options);               
                clear();



                for (i=0; i < options.length; i++) {
                              drawCircle(options[i].radius);
                              colorCircle(options[i].color, options[i].radius, options[i].part);
                              drawSlider(options[i].sliderX + x0, options[i].sliderY + y0); 


                    }    
                                 
            }
            function displayValues(options, element) {
                              var value = options.map(function(item, index) {
                              item.cost = parseInt((parseInt(item.deg) / 360)*(item.maxValue - item.minValue)); 
                              
                              return '<div><input id="value-'+ index +'" class="list-item" style="border:0px" type="text" value="$' + item.cost + 
                              '" class="range" data-max="' + item.maxValue + '" data-min="' + item.minValue + '" data-step="' + item.step +
                              '" name="angle"><span class="category-'+ index +'" style="color:' + item.color + '">' + item.category +'</span></div>'
                              });
                              return  element.html(value); 
                             }                   
                            
                             displayValues(options, $('#js-values'));



                             for (i=0; i < options.length; i++) {
                              
                              $('input[id="value' + i +'"]').val();
                            }     

    
        } 

                                              
                             
       




        

       


         $('#default').click(function (event) { // later on add mousemove, mouseup and mousedown
                        event.preventDefault();
                        event.stopPropagation();
                        
                        whichCircle(event);
                        mouseHandler(event, radius);
                    });
        
        $('#default').mousedown(function (event){ mdown = true; })
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
    document.body.onload(options[i].radius);
}

moveSlider($('#default'));

setCanvas();                             
                            
                             


                             
                             

                             

                             
                             
                               

                        
                                                                     

                           

                                                       
                                         
                          

                          

        
        
       
        
        
        


      
        
       
     
        

        
   
     
       
        



       

       









 


