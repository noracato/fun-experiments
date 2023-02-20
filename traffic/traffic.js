

let currentDestiantion = 0;
let destinations =
    [
        // City, youtube, color, startseconds
        ['Delhi', 'lQw6qHj43iU', '#ffdce2', '13'],
        ['Delft', 'WnktRwn_aog', 'rgb(182 105 105)', '13'],
        ['Hanoi', 'AFHGVQKH6Fc', 'rgb(255 221 168)', '13'],
        ['Naples', 'S0_Xpcty6zo', 'rgb(166 96 192)', '13'],
        ['New York', 'WgVn_s45pmw', 'rgb(255 103 103)', '75'], 
        ['Puebla', 'XrmuH_kK1mA', 'rgb(176 255 103)', '68'],
        ['Tokyo', 'XfBCPlR10Hk', 'rgb(74 139 126)', '13'],
        ['Somewhere in Brasil', 'WkRnUSKzFT0', 'rgb(113 163 213)', '52'],

    ];

$( document ).ready(nextDestination);

function nextDestination() {
    setLocation();
    $('#current-location').html(destinations[currentDestiantion][0]);
    setupIFrame();
    $('.ninja').css('border-color', destinations[currentDestiantion][2])
}

function setupIFrame() {
    var url = "https://www.youtube.com/embed/" + destinations[currentDestiantion][1] + "?start="+destinations[currentDestiantion][3]+"&autoplay=1&mute=1&loop=1&controls=0";
    var width = $(window).width() * 0.65;
    var height = width * 0.56;
    var frame = $('<iframe width="'+width+'" height="'+height+'" src='+url+ '</iframe>');

    $('.container').html(frame);
}

function setLocation() {
    // linear looping
    // currentDestiantion += 1;
    // if (currentDestiantion == destinations.length) {
    //     currentDestiantion = 0;
    // }

    // random
    var next = randomNew();
    while (currentDestiantion == next){
        next = randomNew();
    }
    currentDestiantion = next;
}

function randomNew() {
    return Math.floor(Math.random() * destinations.length);
}