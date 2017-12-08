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

myCircle.draw(100, 100, 70);
drawSlider(100, 30);

};

function Circle(x, y, radius) {
  this.x = x || 100;
  this.y = y || 100;
  this.radius = radius || 70;
  this.startAngle = -0.5*Math.PI;
  this.endAngle = 2*Math.PI;
  
}

var myCircle = new Circle();

// Draws this shape to a given context
Circle.prototype.draw = function(ctx) {
          var canvas = document.getElementById('c-circle');
          var ctx = canvas.getContext('2d');
              
       
          ctx.strokeStyle = '#afb1b5';
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
        
       
        ctx.beginPath();
        ctx.arc(X,Y,9.5,-0.5*Math.PI,2*Math.PI);
        
       
        ctx.fillStyle = '#ffffff';
        ctx.fill();
        ctx.stroke();
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

 
      
    

/*

var canvasState = function(canvas) {
        this.valid = false; // when set to true, the canvas will redraw everything
        this.shapes = [];  // the collection of things to be drawn - imeli bom več krogov različnih
        this.dragging = false; // Keep track of when we are dragging
        // the current selected object.
        // In the future we could turn this into an array for multiple selection
        this.selection = null;
        this.dragoffx = 0; // See mousedown and mousemove events for explanation
        this.dragoffy = 0;

        // Right here "this" means the CanvasState. But we are making events on the Canvas itself,
        // and when the events are fired on the canvas the variable "this" is going to mean the canvas!
        // Since we still want to use this particular CanvasState in the events we have to save a reference to it.
        // This is our reference!
        var myState = this;
        
        //fixes a problem where double clicking causes text to get selected on the canvas
        canvas.addEventListener('selectstart', function(e) { e.preventDefault(); return false; }, false); //
        // Up, down, and move are for dragging
        canvas.addEventListener('mousedown', function(e) {
          var mouse = myState.getMouse(e);
          var mx = mouse.x;
          var my = mouse.y;
          var shapes = myState.shapes;
          var l = shapes.length;
          for (var i = l-1; i >= 0; i--) {
            if (shapes[i].contains(mx, my)) {
              var mySel = shapes[i];
              // Keep track of where in the object we clicked
              // so we can move it smoothly (see mousemove)
              myState.dragoffx = mx - mySel.x;
              myState.dragoffy = my - mySel.y;
              myState.dragging = true;
              myState.selection = mySel;
              myState.valid = false;
              return;
            }
          }
          // havent returned means we have failed to select anything.
          // If there was an object selected, we deselect it
          if (myState.selection) {
            myState.selection = null;
            myState.valid = false; // Need to clear the old selection border
          }
        }, true);
        canvas.addEventListener('mousemove', function(e) {
          if (myState.dragging){
            var mouse = myState.getMouse(e);
            // We don't want to drag the object by its top-left corner,
            // we want to drag from where we clicked.
            // Thats why we saved the offset and use it here
            myState.selection.x = mouse.x - myState.dragoffx;
            myState.selection.y = mouse.y - myState.dragoffy;   
            myState.valid = false; // Something's dragging so we must redraw
          }
        }, true);
        canvas.addEventListener('mouseup', function(e) {
            myState.dragging = false;
          }, true);
        // add the click event as well

        // **** Options! ****
          
          
          this.interval = 30;
          setInterval(function() { myState.draw(); }, myState.interval);

          // While draw is called as often as the INTERVAL variable demands,
          // It only ever does something if the canvas gets invalidated by our code
          CanvasState.prototype.draw = function() {
            // if our state is invalid, redraw and validate!
            if (!this.valid) {
              var ctx = this.ctx;
              var shapes = this.shapes;
              this.clear();
              
              // ** Add stuff you want drawn in the background all the time here **
              // grey circle
              
              // draw all shapes
              var l = shapes.length;
              for (var i = 0; i < l; i++) {
                var shape = shapes[i];
                // We can skip the drawing of elements that have moved off the screen:
                if (shape.x > this.width || shape.y > this.height ||
                    shape.x + shape.w < 0 || shape.y + shape.h < 0) continue;
                shapes[i].draw(ctx);
              }
              
              // draw selection
              // right now this is just a stroke along the edge of the selected Shape
              if (this.selection != null) {
                ctx.strokeStyle = this.selectionColor;
                ctx.lineWidth = this.selectionWidth;
                var mySel = this.selection;
                ctx.strokeRect(mySel.x,mySel.y,mySel.w,mySel.h);
              }
              
              // ** Add stuff you want drawn on top all the time here **
              
              this.valid = true;
            }

            // Creates an object with x and y defined,

              // set to the mouse position relative to the state's canvas
              // If you wanna be super-correct this can be tricky,
              // we have to worry about padding and borders
              CanvasState.prototype.getMouse = function(e) {
                var element = this.canvas, offsetX = 0, offsetY = 0, mx, my;
                
                // Compute the total offset
                if (element.offsetParent !== undefined) {
                  do {
                    offsetX += element.offsetLeft;
                    offsetY += element.offsetTop;
                  } while ((element = element.offsetParent));
                }

                // Add padding and border style widths to offset
                // Also add the offsets in case there's a position:fixed bar
                offsetX += this.stylePaddingLeft + this.styleBorderLeft + this.htmlLeft;
                offsetY += this.stylePaddingTop + this.styleBorderTop + this.htmlTop;

                mx = e.pageX - offsetX;
                my = e.pageY - offsetY;
                
                // We return a simple javascript object (a hash) with x and y defined
                return {x: mx, y: my};
              }
                        }
}
*/

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



        $('#c-circle').click(function (event) { // later on add mousemove, mouseup and mousedown
                        if (mdown) {
                           var mPos = {x: event.clientX-elPos.x-30, y: event.clientY-elPos.y-30}; // polozaj x in y koordinate miske

                           // event.prevent default in stop propagation morda da se movementi ne razširijo preveč.
                           
                           console.log('client', event.clientX, event.clientY);
                           console.log('mouseposition', mPos.x, mPos.y);
                           var atan = Math.atan2(mPos.x-radius, mPos.y-radius); // Math.atan2() vrne kot med x osjo in točko (x,y)
                           console.log('atan', atan);
                           deg = -atan/(Math.PI/180) + 180; // final (0-360 positive) degrees from mouse position 
                           console.log('-atan/(Math.PI/180)',-atan/(Math.PI/180));
                           console.log('degrees', deg);
                           
                           
                           var part = -0.5*Math.PI + deg * (Math.PI/180);

                          
                           colorCircle('#9c6fdb', 70, part);                                                            
                            
                           X = Math.round(radius* Math.sin(deg*Math.PI/180));    
                           Y = Math.round(radius*  -Math.cos(deg*Math.PI/180));
                           
                          // cutSlider(100,30,9.5);
                           drawSlider(X+100,Y+100); //add the center of circle coordinates
                                                  

                         

                           // PRINT DEGREES
                           $('input[name="angle"]').val(Math.ceil(deg));                            
                          
                        }
                    });
      }

moveSlider($('#c-circle'));





 


