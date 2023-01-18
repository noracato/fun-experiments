let trianglePercentage = 10;
let rotations = 0;

let gridsX = [], gridsY = [];

$( document ).ready(function() {
  $('body').click(function(e) {
    // (Math.floor(Math.random() * rotations))
    createTriangle(e.clientY, e.clientX);
  })
});


function createTriangle(x,y) {
  let triangle = $('<div></div>');
  triangle.addClass('triangle');

  $('body').append(triangle);

  triangle.html(createSVGString());

  triangle.addClass('rotation-' + rotations);
  triangle.data('rotation', rotations);
  triangle.data('size', 1);
  triangle.find('polygon').click(enlarge);

  // var newCoords = coordinatesForGrid(x,y);
  triangle.css('top', x + 'px');
  triangle.css('left', y + 'px');

  drawGrid(x,y);

  incrementRotation();

  function enlarge(e) {
    // Enlarge the triangle if one with same rotation is placed on top
    let myRot = triangle.data('rotation');
    if (rotations == myRot) {
      var newSize = triangle.data('size') + 1;
      triangle.data('size', newSize);
      triangle.html(createSVGString(trianglePercentage/newSize));
      e.stopPropagation(); // dont create a new triangle
      incrementRotation();
    } else if (rotations == myRot + 1 || (myRot == 3 && rotations == 0)){
      var poly = triangle.find('polygon');
      console.log(poly.css('fill'));
      if (poly.css('fill') == 'none') {poly.css('fill', '#ff9824');} else {poly.css('fill', 'none');}
      e.stopPropagation(); // dont create a new triangle
      // incrementRotation();
    }
  }
}

function polyPoints(setPercentage){
  let corner1 = [0,0], corner2 = [0,0], corner3 = [0,0];
  let trHeight = $(window).height()/setPercentage;
  let trWidth = $(window).width()/setPercentage;

  switch(rotations) {
    case 0:
      corner2[0] = trWidth;
      corner3[1] = trHeight;
      break;
    case 1:
      corner2[0] = trWidth;
      corner3 = [trWidth,trHeight];
      break;
    case 2:
      corner1[0] = trWidth;
      corner2 = [trWidth,trHeight];
      corner3[1] = trHeight;
      break;
    case 3:
      corner2 = [trWidth,trHeight];
      corner3[1] = trHeight;
      break;
  }

  return 'points="'+
    corner1[0] +','+corner1[1] + ' ' +
    corner2[0] +','+corner2[1] + ' ' +
    corner3[0] +','+corner3[1] + '"';
}

function createSVGString(setPercentage) {
  if (!setPercentage) {
    setPercentage = trianglePercentage
  }
  return '<svg xmlns="http://www.w3.org/2000/svg" class="svg-triangle" style="height:' +
    $(window).height()/setPercentage + 4 + 'px; width:' +
    $(window).width()/setPercentage + 4 + 'px;"' +
    '><polygon ' +
    polyPoints(setPercentage) +
    '/></svg>'
}

function incrementRotation() {
  rotations ++;
  if (rotations == 4) {rotations = 0} //make this modulo operator?
}

function drawGrid(x,y) {
  drawGridLine(x, 'x');
  drawGridLine(y, 'y');
}

function drawGridLine(coordinate, direction) {
  let gridline = $('<div></div>');
  gridline.addClass('grid');

  if (direction == 'x'){
    gridline.addClass('grid-x');
    gridline.css('top', coordinate + 'px');
    gridline.css('left', 0);
    gridsX.push(coordinate);
  } else {
    gridline.addClass('grid-y');
    gridline.css('top', 0);
    gridline.css('left', coordinate + 'px');
    gridsY.push(coordinate);
  }

  $('body').append(gridline);
}

// this function needs to be called still
function coordinatesForGrid(x,y){
  let marginX = [$(window).width()/setPercentage + 10,$(window).width()/setPercentage - 10];
  let marginY = [$(window).height()/setPercentage + 10,$(window).height()/setPercentage - 10];

  var newX = withinGrid(x, gridsX, marginX);
  if (newX == x){
    drawGridLine(x, 'x');
  }

  var newY = withinGrid(y, gridsY, marginY);
  if (newY == y){
    drawGridLine(y, 'y');
  }

  return [newX, newY]
}

function withinGrid(number, grids, margins) {
  for (var i = 0; i < grids.length; i++) {
    if (number < grids[i] + margins[0] && number > grids[i] - margins[1]) {
      return grids[i];
    }
  }
  return number;
}
