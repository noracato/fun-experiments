let squareViewWidth = 3;
let squareWidth = $(window).width() / (100/ squareViewWidth);
let logic_state = 1

$( document ).ready(fillScreen);

function changeVars(){
    if (logic_state == 1 ){
        logic_state = 0;
    } else {
        logic_state = 1;
    }

}

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
        logicForState(sq);
    } else {
        sq.removeClass('state-2');
        sq.addClass('state-1');
        logicForState(sq);
    }

}

// maybe we need this later
function logicForState(sq) {
    if (logic_state == 1) {
        neighbourWithSameState(sq);
    } else {
        neighbourWithSameState(sq);
    }
}

function neighbourWithSameState(square, iterate=true) {
    let sq = $(square);
    let state = 'state-1';
    let otherState = 'state-2';
    if (sq.hasClass('state-2')) { state = 'state-2'; otherState='state-1'}


    let rowNumberUp = sq.parent().data('number') - 1;
    let rowNumberDown = sq.parent().data('number') + 1;
    let siblings = sq.parent().children();

    // left, rght, up, down
    let hasSame = [0,0,0,0];

    if (sq.data('number') -1 >= 0){
        var neighbour = $(siblings[sq.data('number') - 1]);
        if (sameState(neighbour, state) || invertedNeighbour(neighbour, otherState)) {
            hasSame[0] = 1;
        }
        if (iterate) {neighbourWithSameState(neighbour, false);}
    } else { hasSame[0] = 1; }
    if (sq.data('number') + 1 < siblings.length ){
        var neighbour = $(siblings[sq.data('number') + 1]);
        if (sameState(neighbour, state) || invertedNeighbour(neighbour, otherState)) {
            hasSame[1] = 1;
        }
        if (iterate) {neighbourWithSameState(neighbour, false);}
    } else { hasSame[1] = 1; }
    if (rowNumberUp >= 0){
        var neighbour = $($($('.row')[rowNumberUp]).children()[sq.data('number')]);
        if (sameState(neighbour, state) || invertedNeighbour(neighbour, otherState)) {
            hasSame[2] = 1;
        }
        if (iterate) {neighbourWithSameState(neighbour, false);}
    } else { hasSame[2] = 1; }
    if (rowNumberDown < $('.row').length){
        var neighbour = $($($('.row')[rowNumberDown]).children()[sq.data('number')]);
        if (sameState(neighbour, state) || invertedNeighbour(neighbour, otherState)){
            hasSame[3] = 1;
        }
        if (iterate) {neighbourWithSameState(neighbour, false);}
    } else { hasSame[3] = 1; }

    let circle = $(sq.children()[0]);
    circle.removeClass();
    sq.removeClass('invert-sq');

    setCss(sq, circle, hasSame, state)
}

function sameState( obj, state) {
    return $(obj).hasClass(state);
}

function invertedNeighbour(neighbour, otherState) {
    return sameState($(neighbour), otherState) && $(neighbour).hasClass('invert-sq')
}


function setCss(sq, circle, hasSame, state){
    if (logic_state == 1) {
        if (fourSided(sq, circle, ...hasSame)) { return; }
        if (threeSided(sq, circle, ...hasSame)) { return; }
        if (twoSided(sq, circle, ...hasSame)) { return; }
        if (oneSided(sq, circle, ...hasSame)) { return; }
    } else if (state == 'state-2'){
        // if (fourOrThreeSidedLS2(sq, circle, ...hasSame)) { return; }
        if (twoSidedLS2(sq, circle, ...hasSame)) { return; }
        oneSidedLS2(sq, circle, ...hasSame)
    } else {
        $(circle).addClass('full');
    }

}

// ORIGINAL
function oneSided(sq, circle, left=0, right=0, top=0, down=0){
    if (left) {
        $(circle).addClass('left');
    } else if (right) {
        $(circle).addClass('right');
    } else if (top) {
        $(circle).addClass('top');
    } else if (down) {
        $(circle).addClass('down');
    } else {
        return false;
    }
    $(circle).addClass('invert');
    $(sq).addClass('invert-sq');

    return true;
}

function twoSided(sq, circ, left=0, right=0, top=0, down=0){
    var circle = $(circ);

    if (left == down && left == 1){
        circle.addClass('left-down');
    } else if (left == top && left == 1){
        circle.addClass('left-top');
    } else if (right == down && right == 1){
        circle.addClass('right-down');
    } else if (right == top && right == 1){
        circle.addClass('right-top');
    } else if ((right == left && right == 1) || (top == down && top == 1)){
        circle.addClass('full');
    } else {
        return false;
    }

    circle.addClass('invert');
    $(sq).addClass('invert-sq');

    return true;
}

function threeSided(sq, circ, left=0, right=0, top=0, down=0){
    var circle = $(circ);

    if (left == right && right == top && left == 1){
        circle.addClass('full');
    } else if (left == right && right == down && left == 1){
        circle.addClass('full');
    } else if (left == top && top == down && left == 1){
        circle.addClass('full');
    } else if (right == top && top == down && right == 1){
        circle.addClass('full');
    } else {
        return false;
    }

    return true;
}

function fourSided(sq, circ, left=0, right=0, top=0, down=0){
    if (left == right && right == top && top == down) {
        var circle = $(circ);
        if (left == 0){
            circle.addClass('invert');
            circle.addClass('inner');
            $(sq).addClass('invert-sq');
        } else {
            circle.addClass('full');
        }
        return true;
    }

    return false
}


// CIRCLES

function fourOrThreeSidedLS2(sq, circ, left=0, right=0, top=0, down=0){
    var circle = $(circ);
    // Do nothing
    if (left == right && right == top && left == 1){
        circle.addClass('invert');
        circle.addClass('inner');
        $(sq).addClass('invert-sq');
    } else if (left == right && right == down && left == 1){
        circle.addClass('invert');
        circle.addClass('inner');
        $(sq).addClass('invert-sq');
    } else if (left == top && top == down && left == 1){
        circle.addClass('invert');
        circle.addClass('inner');
        $(sq).addClass('invert-sq');
    } else if (right == top && top == down && right == 1){
        circle.addClass('invert');
        circle.addClass('inner');
        $(sq).addClass('invert-sq');
    } else {
        return false;
    }
}

function twoSidedLS2(sq, circ, left=0, right=0, top=0, down=0){
    var circle = $(circ);

    if ((right == left && right == 1) || (top == down && top == 1)){
        circle.addClass('invert');
        circle.addClass('inner');
        $(sq).addClass('invert-sq');
        return true;
    }

    if (left == down && left == 1){
        circle.addClass('left-down-s2');
    } else if (left == top && left == 1){
        circle.addClass('left-top-s2');
    } else if (right == down && right == 1){
        circle.addClass('right-down-s2');
    } else if (right == top && right == 1){
        circle.addClass('right-top-s2');
    } else {
        return false;
    }

    circle.addClass('invert');
    $(sq).addClass('invert-sq');

    return true;
}

function oneSidedLS2(sq, circle, left=0, right=0, top=0, down=0){
    $(circle).addClass('invert');
    circle.addClass('inner');
    $(sq).addClass('invert-sq');
    return true;
}
