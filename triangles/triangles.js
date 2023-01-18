let trianglePercentage = 10;
let rotations = 0;

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
  triangle.click(enlarge);

  if (x && y) {
    triangle.css('top', x + 'px');
    triangle.css('left', y + 'px');
  }

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
