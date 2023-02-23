let squareViewWidth = 3;
let squareWidth = $(window).width() / (100/ squareViewWidth);

$( document ).ready(fillScreen);

function fillScreen() {
    let amount = $(window).height() / squareWidth;

    for (var i=0; i < amount; i++) {
        addRow();
    }
}


function addRow() {
    let amount = 100 / squareViewWidth;
    let row = $('<div></div>');
    row.addClass('row');
    for (var i=0; i < amount; i++) {
        createSquare(row);
    }

    $('.container').append(row);
}

function createSquare(row){
    let sq = $('<div></div>');
    sq.addClass('square');
    sq.addClass('state-1');
    sq.mouseenter(function() {flip(sq)});

    row.append(sq);
}

function flip(sq) {
    if (sq.hasClass('state-1')) {
        sq.removeClass('state-1');
        sq.addClass('state-2');
    } else {
        sq.removeClass('state-2');
        sq.addClass('state-1');
    }
}
