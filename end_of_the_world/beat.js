let sounds = [
    {
        "keepPlaying": false,
        "sound": 'aa aa',
        "voice": "es-ES",
        "icon": "❖"
    },
    {
        "keepPlaying": false,
        "sound": 'ксж',
        "voice": "ru-RU",
        "icon": "✶"
    },
    {
        "keepPlaying": false,
        "sound": 'бр',
        "voice": "ru-RU",
        "icon": "❂"
    },
    {
        "keepPlaying": false,
        "sound": 'rrr',
        "voice": "ro-RO",
        "icon": "✯"
    },
    {
        "keepPlaying": false,
        "sound": 'ввв',
        "voice": "ru-RU",
        "icon": "◎"
    },
    {
        "keepPlaying": false,
        "sound": '我',
        "voice": "zh-HK",
        "icon": "❀"
    },
    {
        "keepPlaying": false,
        "sound": '브',
        "voice": "ko-KR",
        "icon": "⁌"
    },
    {
        "keepPlaying": false,
        "sound": 'th',
        "voice": "ja-JA",
        "icon": "□",
    },
    {
        "keepPlaying": false,
        "sound": 'κκ',
        "voice": "el-GR",
        "icon": "✹"
    },
]

const soundsPerRow = 3;

const delay = ms => new Promise(res => setTimeout(res, ms));

let speed = 1000;
$('#speedSlider').change(function (e) {
    speed = e.target.value;
})

buildAll();

function play(soundIndex){
    playByText(
        sounds[soundIndex]["voice"],
        sounds[soundIndex]["sound"],
        sounds[soundIndex]["volume"]
    )
}

const hold = async (soundIndex) => {
    // Check if already playing
    if (sounds[soundIndex]["keepPlaying"]){
        return;
    }

    sounds[soundIndex]["keepPlaying"] = true;
    while(sounds[soundIndex]["keepPlaying"]){
        play(soundIndex);
        await delay(speed);
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


function buildSoundButton(index) {
    let container = $('<div></div>');
    let ball = $('<a><p>'+ sounds[index]["icon"] +'</p></a>');
    ball.click(function() { play(index); })

    let controls = $('<div></div>');
    controls.addClass("row controls");
    controls.click(function () {
        if (controls.hasClass("on")){
            controls.removeClass('on');
            stopPlaying(index);
        } else {
            controls.addClass('on');
            hold(index);
        }
    });

    let holdControl = $('<div>HOLD</div>');

    controls.append(holdControl);
    container.append(ball);
    container.append(controls);

    return container;
}
