let squareViewWidth = 3;
let squareWidth = $(window).width() / (100/ squareViewWidth);

$( document ).ready(fillScreen);

function fillScreen() {
    let amount = $(window).height() / squareWidth;

    for (var i=0; i < amount; i++) {
        addRow(i);
    }
}


function addRow(i) {
    let amount = 100 / squareViewWidth;
    let row = $('<div></div>');
    row.addClass('row');
    row.data('number', i);
    for (var i=0; i < amount; i++) {
        createSquare(row, i);
    }

    $('.container').append(row);
}

function createSquare(row, i){
    let sq = $('<div></div>');
    sq.addClass('square');
    sq.addClass('state-1');
    sq.data('number', i);
    sq.mouseenter(function() {flip(sq)});

    let innerCircle = $('<div></div>');
    innerCircle.addClass('full');
    sq.append(innerCircle);

    row.append(sq);
}

function flip(sq) {
    if (sq.hasClass('state-1')) {
        sq.removeClass('state-1');
        sq.addClass('state-2');
        neighbourWithSameState(sq);
    } else {
        sq.removeClass('state-2');
        sq.addClass('state-1');
        neighbourWithSameState(sq);
    }

}

function neighbourWithSameState(square, iterate=true) {
    let sq = $(square);
    let state = 'state-1';
    let otherState = 'state-2';
    if (sq.hasClass('state-2')) { state = 'state-2'; otherState='state-1'}


    let rowNumberUp = sq.parent().data('number') + 1;
    let rowNumberDown = sq.parent().data('number') - 1;
    let siblings = sq.parent().children();

    // left, rght, up, down
    let hasSame = [0,0,0,0];

    // TODO: something with neighbour having inverterd stuff AND being the other state

    if (sq.data('number') -1 >= 0){
        var neighbour = $(siblings[sq.data('number') - 1]);
        if (sameState(neighbour, state) || invertedNeighbour(neighbour, otherState)) {
            hasSame[0] = 1;
        }
        if (iterate) {neighbourWithSameState(neighbour, false);}
    } if (sq.data('number') + 1 < siblings.length ){
        var neighbour = $(siblings[sq.data('number') + 1]);
        if (sameState(neighbour, state) || invertedNeighbour(neighbour, otherState)) {
            hasSame[1] = 1;
        }
        if (iterate) {neighbourWithSameState(neighbour, false);}
    } if (rowNumberUp >= 0){
        var neighbour = $($($('.row')[rowNumberUp]).children()[sq.data('number')]);
        if (sameState(neighbour, state) || invertedNeighbour(neighbour, otherState)) {
            hasSame[2] = 1;
        }
        if (iterate) {neighbourWithSameState(neighbour, false);}
    } if (rowNumberDown < $('.row').length){
        var neighbour = $($($('.row')[rowNumberDown]).children()[sq.data('number')]);
        if (sameState(neighbour, state) || invertedNeighbour(neighbour, otherState)){
            hasSame[3] = 1;
        }
        if (iterate) {neighbourWithSameState(neighbour, false);}
    }

    // if our negighrbours state is inverted - we invert our hasSame?



    let circle = $(sq.children()[0]);
    circle.removeClass();
    sq.removeClass('invert-sq');

    // with four
    if (hasSame[0] == hasSame[1] && hasSame[1] == hasSame[2] && hasSame[2] == hasSame[3]) {
        if (hasSame[0] == 0){
            circle.addClass('invert');
            circle.addClass('inner');
            sq.addClass('invert-sq');
        } else {
            circle.addClass('full');
        }
        return;
    }

    // with three
    // left, right, top
    if (hasSame[0] == hasSame[1] && hasSame[1] == hasSame[2]) {
        if (hasSame[0] == 1){
            circle.addClass('full');
            return;
        }
    }
    // left, right, down
    if (hasSame[0] == hasSame[1] && hasSame[1] == hasSame[3]) {
        if (hasSame[0] == 1){
            circle.addClass('full');
            return;
        }
    }
    // left, top, down
    if (hasSame[0] == hasSame[2] && hasSame[2] == hasSame[3]) {
        if (hasSame[0] == 1){
            circle.addClass('full');
            return;
        }
    }
    // rigth, top, down
    if (hasSame[1] == hasSame[2] && hasSame[2] == hasSame[3]) {
        if (hasSame[1] == 1){
            circle.addClass('full');
            return;
        }
    }

    // with two
    // left, top
    if (hasSame[0] == hasSame[2]) {
        if (hasSame[0] == 1){
            circle.addClass('left-down');
            circle.addClass('invert');
            sq.addClass('invert-sq');
            return;
        }
    }
    // left, down
    if (hasSame[0] == hasSame[3]) {
        if (hasSame[0] == 1){
            circle.addClass('left-top');
            circle.addClass('invert');
            sq.addClass('invert-sq');
            return;
        }
    }
    // rigth, top
    if (hasSame[1] == hasSame[2]) {
        if (hasSame[1] == 1){
            circle.addClass('right-down');
            circle.addClass('invert');
            sq.addClass('invert-sq');
            return;
        }
    }
    // right, down
    if (hasSame[1] == hasSame[3]) {
        if (hasSame[1] == 1){
            circle.addClass('right-top');
            circle.addClass('invert');
            sq.addClass('invert-sq');
            return;
        }
    }
    // right, left or top, down
    if (hasSame[1] == hasSame[0]) {
        if (hasSame[1] == 1){
            circle.addClass('full');
            return;
        }
    } if (hasSame[2] == hasSame[3]) {
        if (hasSame[2] == 1){
            circle.addClass('full');
            return;
        }
    }

    // with one
    if (hasSame[0] == 1) {
        circle.addClass('left');
        circle.addClass('invert');
        sq.addClass('invert-sq');
        return;
    }
    if (hasSame[1] == 1) {
        circle.addClass('right');
        circle.addClass('invert');
        sq.addClass('invert-sq');
        return;
    }
    if (hasSame[3] == 1) {
        circle.addClass('top');
        circle.addClass('invert');
        sq.addClass('invert-sq');
        return;
    }
    if (hasSame[2] == 1) {
        circle.addClass('down');
        circle.addClass('invert');
        sq.addClass('invert-sq');
        return;
    }
}

function sameState( obj, state) {
    return $(obj).hasClass(state);
}

function invertedNeighbour(neighbour, otherState) {
    return sameState($(neighbour), otherState) && $(neighbour).hasClass('invert-sq')
}
