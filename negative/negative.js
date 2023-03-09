$( document ).ready(start);

let localStorageItemName = "R-take-a-guess-";
let currentStorage = [];
let currentMap = 1;
const totalMaps = 3;

let lockNext = false

function start(){
    setUpStorage();
    $('#submit').on('click', addAnswer);
    $('#hide-results').on('click', transparency);
    $('#next').on('click', nextMap);
    $('#letters').keypress(function (e) {
        if (e.which == 13) { // the enter key code
           addAnswer();
           return false;
        }
    });
    setTimeout(function(){lockNext = false;}, 500);
}

function addAnswer() {
    let newValue = $('#letters')[0].value;
    let newAnswer = $('<p>'+newValue+'</p>');
    $('#letters')[0].value = '';
    $('#results').prepend(newAnswer);
    $('#letters')[0].focus();
    currentStorage.push(newValue);
    localStorage.setItem(localStorageItemName+currentMap, currentStorage);
}

function transparency() {
    if ($('#results').hasClass('transparent')) {
        $('#results').removeClass('transparent');
    } else {
        $('#results').addClass('transparent');
    }
}

function setUpStorage() {
    $('#results').children().remove();
    let st = localStorage.getItem(localStorageItemName+currentMap);
    if (st) {
        currentStorage = st.split(',');
        for (var i=0; i < currentStorage.length; i++){
            let newAnswer = $('<p>'+currentStorage[i]+'</p>');
            $('#results').prepend(newAnswer);
        }
    } else {
        currentStorage = [];
    }
}

function nextMap(e) {
    e.preventDefault();
    e.stopPropagation();
    if (lockNext) {return;}
    lockNext = true;

    currentMap += 1;
    if (currentMap > totalMaps) { currentMap = 1};
    $('img.map').attr('src', 'assets/map'+currentMap+'.png');
    start();
}
