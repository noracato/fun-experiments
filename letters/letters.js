$( document ).ready(start);

// TODO: register backspace on input and remove!

lastLetter = ''
lastField = -1;

function start(){
    $('#letters').on('input', putLetter);
}

function setUpField(letter) {
    var field = $('<div></div>');
    field.addClass('field');
    field.data('filled', letter);
    field.html(letter);
    field.addClass('filled-1');
    $('.container').append(field);
}

function putLetter(e) {
    let newLetter = e.target.value.slice(-1);
    if (newLetter && newLetter === lastLetter) {
        var field = $($('.field')[lastField]);

        if (field.hasClass('filled-1')){
            field.removeClass('filled-1');
            field.addClass('filled-2');
        } else {
            field.removeClass('filled-2');
            field.addClass('filled-3');
        }

    } else {
        setUpField(newLetter);
        lastField += 1;
    }
    // if not yet present
    lastLetter = newLetter;
}
