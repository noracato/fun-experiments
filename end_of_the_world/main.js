function playSound(keyword) {
    if (keyword === 'text') {
        playByText("en-GB", "Please, read the script");
        // playByText("en-GB", speech);
    } else if (keyword === 'intro') {
        var audio = new Audio('assets/intro.mp3');
        audio.play();
    } else if (keyword === 'beat') {
        var audio = new Audio('assets/beat.mp3');
        audio.play();
    } else if (keyword === 'goodbye') {
        var audio = new Audio('assets/goodbye.mp3');
        audio.play();
    } else if (keyword === 'speech') {
        var audio = new Audio('assets/speech.mp3');
        audio.play();
    }
}
