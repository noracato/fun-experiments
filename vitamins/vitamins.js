$( document ).ready(start);

function start(){
    $('.to-swallow').click(swallow);
}

function emptyScreen(){
    $('.pill').addClass('down');
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
            $('body').append($('<div class="soon">Starting soon</div>'));
        }, 3000)
    }, 3000)
}
