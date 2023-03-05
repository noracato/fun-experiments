$( document ).ready(start);

const letterAmount = 20;
const letterAppear = 100;
const letterTrans = 50;

let currentRowStyle = 'right';
let maxRows = 4;

function start(){
    $('#letters').on('input', putLetter);
}

function setUpField(letter, row) {
    var field = $('<div></div>');
    field.addClass('field');
    field.data('filled', letter);
    field.html(letter);
    field.addClass('filled-1');
    row.append(field);
    setTimeout(function(){
        field.addClass('appear');
    }, letterTrans);
}

function putLetter(e) {
    if ($('.row').length > maxRows) {return;}
    if (!$('.row').length) {$('#typeme').remove()}
    let currentRow = nextRow();
    let newLetter = e.target.value.slice(-1);
    var interval = setInterval(function() {setUpField(newLetter, currentRow)}, letterAppear);
    setTimeout(function(){
        clearInterval(interval)
        animate(currentRow);
        setTimeout(function(){
            animateBack(currentRow);
            setTimeout(function(){
                animate(currentRow);
            }, 2500)
        }, 2500)
    }, (letterAmount * (letterAppear+letterTrans + 1)));

}

function nextRow() {
    var row = $('<div></div>');
    row.addClass('row');
    $('.container').append(row);
    if (currentRowStyle == 'right') {
        currentRowStyle = 'left';
        row.removeClass('reverse');
    } else {
        row.addClass('reverse');
        currentRowStyle = 'right';
    }
    return row;
}

function animate(thisRow) {
    thisRow.children().removeClass('animate-ciao');
    thisRow.children().addClass('animate-it');
}

function animateBack(thisRow) {
    thisRow.children().removeClass('animate-it');
    thisRow.children().addClass('animate-ciao');
}

function addOne(letter) {
    setTimeout(function() {setUpField(letter)}, letterAppear);
}
