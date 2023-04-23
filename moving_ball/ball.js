$( document ).ready(function() {
    let circle = $('<div></div>');
    circle.addClass('circle');
    $('body').append(circle);
    startMoving(circle);
})

let ballSize = 60;

function startMoving(elem) {
    let directionX = 1, directionY = 1;

    setInterval(function(){
      if (elem.offset().top + ballSize > $(window).height()) {
        directionY = -1;
      } else if (elem.offset().top  < 0) {
        directionY = 1;
      }

      if (elem.offset().left + ballSize > $(window).width()) {
        directionX = -1;
      } else if (elem.offset().left < 0) {
        directionX = 1;
      }

      elem.css('top', elem.offset().top + (Math.floor(Math.random() * 5) * directionY) + 'px');
      elem.css('left', elem.offset().left + (Math.floor(Math.random() * 5) * directionX) + 'px');
    }, Math.floor(Math.random() * 10))

  }
