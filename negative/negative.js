$( document ).ready(start);

let localStorageItemName = "R-take-a-guess";
let currentStorage = [];

function start(){
    setUpStorage();
    $('#submit').on('click', addAnswer);
    $('#hide-results').on('click', transparency);
}

function addAnswer() {
    let newValue = $('#letters')[0].value;
    let newAnswer = $('<p>'+newValue+'</p>');
    $('#letters')[0].value = '';
    $('#results').prepend(newAnswer);
    currentStorage.push(newValue);
    localStorage.setItem(localStorageItemName, currentStorage);
}

function transparency() {
    if ($('#results').hasClass('transparent')) {
        $('#results').removeClass('transparent');
    } else {
        $('#results').addClass('transparent');
    }
}

function setUpStorage() {
    let st = localStorage.getItem(localStorageItemName);
    if (st) {
        currentStorage = st.split(',');
        for (var i=0; i < currentStorage.length; i++){
            let newAnswer = $('<p>'+currentStorage[i]+'</p>');
            $('#results').prepend(newAnswer);
        }
    }
}
