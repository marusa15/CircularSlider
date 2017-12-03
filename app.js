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

function draw(hue, radius) {
        var canvas = document.getElementById('c-circle');
        var ctx = canvas.getContext('2d');
        var startAngle = -0.5*Math.PI;
        var endAngle = 2*Math.PI;
        var part = 0.1;

        // full grey circle for background
        ctx.strokeStyle = '#afb1b5';
        ctx.lineWidth = 15;
        ctx.setLineDash([5, 1]);
        ctx.lineDashOffset = 5;
        ctx.beginPath();
        ctx.arc(95,95,radius,startAngle,endAngle);
        ctx.stroke();

        // part of circle in color

        ctx.strokeStyle = hue;
        ctx.lineWidth = 15;
        ctx.setLineDash([0, 0]); 
        ctx.globalAlpha = 0.5;
        ctx.beginPath();
        ctx.arc(95,95,radius,startAngle, startAngle + part*endAngle);
        ctx.stroke();

        // round slider

        ctx.strokeStyle = '#afb1b5';
        ctx.lineWidth = 1;
        ctx.setLineDash([0, 0]);
         ctx.globalAlpha = 1;        
        ctx.beginPath();
        ctx.arc(95,25,9.5,startAngle, endAngle);
        ctx.fill();
        ctx.fillStyle = '#ffffff';
        ctx.stroke();
       

      }

draw('#9c6fdb', 70);



 
var displayCircle = function(options, element) {
  var circleInstance = $('<div class="circle" id="circle-1" circle-id="1"><div id="slider-1" class="slider"></div></div>');

  for(var i = 2; i <= options.length; i++) {
    circleInstance = circleInstance.append('<div class="circle" circle-id="' + i + '" id="circle-' 
      + i + '"><div class="slider" id="slider-' + i +
     '"></div></div>');
    
  }
    element.append(circleInstance);
  } 




var displayInput = function(options, element) {
    var inputElement='';
    var inputElement = '<input id="value-number" type="text" value="0"' + 
    ' class="range" data-max="' + options[0].maxValue + '" data-min="' + options[0].minValue +
     '"data-step="' + options[0].step +'" name="angle"><div class="category">' + options[0].category +
          '</div>';
  

    return element.html(inputElement);
} 


