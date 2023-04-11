$( document ).ready(start);

function start(){
    $('.to-swallow').click(swallow);

    if ($('#timer').length) {
        countDown()
    }
    if ($('.gummy').length) {
        $('.gummy').click(function(e){
            $(e.target).addClass('swallowed');
        })
    }
}

function emptyScreen(){
    $('.pill').addClass('down');
    $('.gummy').addClass('down');
    $('.instructions').addClass('down');
    setTimeout(function(){
        window.location.href = 'index.html'
    }, 3200)
}

function swallow(e){
    let pill = $(e.target);
    if (!pill.hasClass('to-swallow')){
        pill = pill.parent();
    }

    if (pill.hasClass('swallowed')){
        return;
    }

    pill.addClass('swallowed');

    if ($('.to-swallow').length == $('.swallowed').length){
        setTimeout(showJuice, 1200);
    }
}

function showJuice(){
    let juice = $('<div></div>');
    juice.addClass('juice');
    juice.click(drink);



    $('body').append(juice);
    juice.append($('<div class="top"></div>'));
    juice.append($('<div class="juicy"></div>'));
    juice.append($('<div class="fluid"></div>'));
    juice.append($('<div class="bottom"></div>'));
}

function drink(){
    $('.juice').addClass('drinking');
    setTimeout(movieScreen, 2500);
}

function movieScreen() {
    $('#empty').addClass('spin');
    $('#empty').addClass('go-right');
    $('body').append($('<div class="fill-up"></div>'));
    setTimeout(function() {
        $('.fill-up').addClass('start');
        $('.juice').addClass('swallowed');
    },50)

    setTimeout(function() {
        $('.fill-up').addClass('down');
        $('#empty').addClass('swallowed');
        setTimeout(function() {
            $('body').append($('<div class="soon">Artwork by Nicolette Ni </br> Starting soon</div>'));
        }, 3000)
    }, 3000)
}


function countDown() {
    var countDownDate = new Date("Apr 11, 2023 21:37:25").getTime();

    // Update the count down every 1 second
    var x = setInterval(function() {

    // Get today's date and time
    var now = new Date().getTime();

    // Find the distance between now and the count down date
    var distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result in the element with id="demo"
    document.getElementById("timer").innerHTML = days + "d " + hours + "h "
    + minutes + "m " + seconds + "s ";

    // If the count down is finished, write some text
    if (distance < 0) {
        clearInterval(x);
        document.getElementById("timer").innerHTML = "EXPIRED";
    }
    }, 1000);
}
