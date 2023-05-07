let sounds = [
    {
        "keepPlaying": false,
        "sound": 'кттп',
        "voice": "ru-RU",
        "icon": "✯"
    },
    {
        "keepPlaying": false,
        "sound": 'бщк',
        "voice": "ru-RU",
        "icon": "☙"
    },
    {
        "keepPlaying": false,
        "sound": 'пв',
        "voice": "ru-RU",
        "icon": "❀"
    },
    {
        "keepPlaying": false,
        "sound": 'кт',
        "voice": "ru-RU",
        "icon": "⁌"
    },
    {
        "keepPlaying": false,
        "sound": 'бб',
        "voice": "ru-RU",
        "icon": "□"
    },
    {
        "keepPlaying": false,
        "sound": 'бк',
        "voice": "ru-RU",
        "icon": "✹"
    }

]

const soundsPerRow = 3;

const delay = ms => new Promise(res => setTimeout(res, ms));

buildAll();

function play(soundIndex){
    playByText(sounds[soundIndex]["voice"], sounds[soundIndex]["sound"])
}

const hold = async (soundIndex) => {
    // Check if already playing
    if (sounds[soundIndex]["keepPlaying"]){
        return;
    }

    sounds[soundIndex]["keepPlaying"] = true;
    while(sounds[soundIndex]["keepPlaying"]){
        play(soundIndex);
        await delay(1000);
    }
};

function stopPlaying(soundIndex){
    sounds[soundIndex]["keepPlaying"] = false;
}


function buildAll() {
    var container = $('#buttons');

    for (var i = 0; i < sounds.length; i+=soundsPerRow){
        container.append(buildSoundRow(i, i+soundsPerRow));
    }
}

function buildSoundRow(startIndex, endIndex){
    let row = $('<div></div>');
    row.addClass("row blacks");

    for (var i = startIndex; i < endIndex; i++){
        row.append(buildSoundButton(i));
    }

    return row;
}


function buildSoundButton(index, row) {
    let container = $('<div></div>');
    let ball = $('<a><p>'+ sounds[index]["icon"] +'</p></a>');
    ball.click(function() { play(index); })

    let controls = $('<div></div>');
    controls.addClass("row controls");

    let holdControl = $('<div>HOLD</div>');
    holdControl.click(function () {
        if (holdControl.hasClass("on")){
            holdControl.removeClass('on');
            stopPlaying(index);
        } else {
            holdControl.addClass('on');
            hold(index);
        }
    });

    controls.append(holdControl);
    container.append(ball);
    container.append(controls);

    return container;
}
