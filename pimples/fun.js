// grabbing circles
$( document ).ready(function() {
  let max = 300;
  createCircle(Math.floor(Math.random() * max),Math.floor(Math.random() * max),false, false);

  $('body').click(function(e) {
    createCircle(e.clientY - 30, e.clientX -30, false, true, 500, true);
  })
});



let colors = ['#ff3751', '#fff', 'rgba(218,218,218)', '#0e0cff', '#859ed4']

function createCircle(x,y, relatedElem, dies, dieTime, static){
  let circle = $('<div></div>');
  circle.addClass('circle');

  // should add in random space
  $('body').append(circle);

  if (!static) {startMoving(circle)}


  makeDraggable(circle);

  if (x && y) {
    circle.css('top', x + 'px');
    circle.css('left', y + 'px');
  } else if (relatedElem) {
    circle.css('top', $(relatedElem).offset().top + 10 + 'px');
    circle.css('left', $(relatedElem).offset().left + 10 + 'px');
  }

  circle.dblclick(function() {createCircle(false,false,circle,true)});

  // some colors
  circle.css(
    'background',
    'radial-gradient(circle at center,' +
      colors[(Math.floor(Math.random() * colors.length))] + ' 0%,' +
      colors[(Math.floor(Math.random() * colors.length))] + ' 67%,'+
      colors[(Math.floor(Math.random() * colors.length))] +' 100%)'
  )

  circle.click(backgroundChange);

  if (dies) {setTimeout(function() {circle.remove()}, dieTime || 10000);}
}

function startMoving(elem) {
  let directionX = 1, directionY = 1;

  setInterval(function(){
    if (elem.offset().top + 10 > $(window).height()) {
      directionY = -1;
    } else if (elem.offset().top -10 < 0) {
      directionY = 1;
    }

    if (elem.offset().left + 10 > $(window).width()) {
      directionX = -1;
    } else if (elem.offset().left -10 < 0) {
      directionX = 1;
    }

    elem.css('top', elem.offset().top + (Math.floor(Math.random() * 5) * directionY) + 'px');
    elem.css('left', elem.offset().left + (Math.floor(Math.random() * 5) * directionX) + 'px');
  }, Math.floor(Math.random() * 10))

}

function backgroundChange(e) {
  var circle = $(e.target);
  $('body').css('background', circle.css('background'));
}

// https://www.w3schools.com/howto/howto_js_draggable.asp
function makeDraggable(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

  elmnt.mousedown(dragMouseDown);
  elmnt.mousedown(changeColor);


  function changeColor(e) {
    setTimeout(function(){
      if (e.clientX == pos3 && e.clientY == pos4 && elmnt.is(":active")){
        elmnt.css(
          'background',
          'radial-gradient(circle at center,' +
            colors[(Math.floor(Math.random() * colors.length))] + ' 0%,' +
            colors[(Math.floor(Math.random() * colors.length))] + ' 67%,'+
            colors[(Math.floor(Math.random() * colors.length))] +' 100%)'
        )
      }
    }, 500)
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.css('top', (elmnt.offset().top - pos2) + "px");
    elmnt.css('left', (elmnt.offset().left - pos1) + "px");

    createCircle(pos3, pos4,false,true);
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
