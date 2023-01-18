let trianglePercentage = 10;
let rotations = 0;
let marginSnap = 0.5; // fraction
let padding = 4;//pixels

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

  triangle.css('top', withinGrid(x,'x') + 'px');
  triangle.css('left', withinGrid(y,'y') + 'px');

  // drawGrid(x,y);

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
    $(window).height()/setPercentage + padding + 'px; width:' +
    $(window).width()/setPercentage + padding + 'px;"' +
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
  if (isAlreadyAGridline(coordinate, direction)) {return;}

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


function withinGrid(number, direction) {
  var grids, extraSnap;
  if (direction == 'x'){
    grids = gridsX;
    extraSnap = $(window).height()/trianglePercentage + padding;
  } else {
    grids = gridsY;
    extraSnap = $(window).width()/trianglePercentage + padding;
  }

  var currentMarginSnap = extraSnap * marginSnap;

  for (var i = 0; i < grids.length; i++) {
    if (number < grids[i] + currentMarginSnap && number > grids[i] - currentMarginSnap) {
      drawGridLine(grids[i] + extraSnap, direction);
      return grids[i];
    } else if (number + extraSnap < grids[i] + currentMarginSnap && number + extraSnap > grids[i] - currentMarginSnap){
      drawGridLine(grids[i] - extraSnap, direction);
      return grids[i] - extraSnap ;
    }
  }

  // Draw gridlines
  drawGridLine(number, direction);
  drawGridLine(number + extraSnap, direction);

  return number;
}


function isAlreadyAGridline(coordinate, direction) {
  var grids;
  if (direction == 'x'){
    grids = gridsX;
  } else {
    grids = gridsY;
  }

  for (var i = 0; i < grids.length; i++) {
    if (coordinate == grids[i]) {return true;}
  }

  return false;
}
