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

// state modification functions

var addCSSProperties = function(options) {
  var circle = document.querySelector('#circle-1');

  circle.style.setProperty('border', '2px solid ' + options[0].color);
  circle.style.setProperty('width', options[0].radius);
  circle.style.setProperty('height', options[0].radius);

  var circle = document.querySelector('#circle-2');

  circle.style.setProperty('border', '2px solid ' + options[1].color);
  circle.style.setProperty('width', options[1].radius);
  circle.style.setProperty('height', options[1].radius);

  var circle = document.querySelector('#circle-3');

  circle.style.setProperty('border', '2px solid ' + options[2].color);
  circle.style.setProperty('width', options[2].radius);
  circle.style.setProperty('height', options[2].radius);
}

var clickCircle = function(options, item) {

  currentItem = getItem(options, item);
  options.Current = item;
  options[item].clicked = true;

}

function getItem(options, itemIndex) {
    return options[itemIndex];    
}



// display functions

function draw() {
        var canvas = document.getElementById('c-circle');
        var ctx = canvas.getContext('2d');
        ctx.strokeStyle = '#afb1b5';
        ctx.lineWidth = 15;
        ctx.setLineDash([5, 1]);
        ctx.lineDashOffset = 5;
        ctx.beginPath();
        ctx.arc(95,95,40,0,2*Math.PI);
        ctx.stroke();

      }

 
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


