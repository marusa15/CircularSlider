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


function drawCircle(radius, x_slider, y_slider) {
        var canvas = document.getElementById('c-circle');
        var ctx = canvas.getContext('2d');
            
     
        ctx.strokeStyle = '#afb1b5';
        ctx.lineWidth = 15; // does not affect the radius, goes 7.5 out and 7.5 in
        ctx.setLineDash([5, 1]);
        ctx.lineDashOffset = 5;
        ctx.beginPath();
        ctx.arc(100,100,radius,-0.5*Math.PI,2*Math.PI);

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

function cutSlider(x, y, radius){
    var canvas = document.getElementById('c-circle');
    var ctx = canvas.getContext('2d');

    ctx.globalCompositeOperation = 'destination-out'
    ctx.beginPath();
    ctx.arc(100, 30, 9.5, startAngle, endAngle);
    ctx.fill();
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





 


