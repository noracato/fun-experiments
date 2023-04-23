// BASED ON https://github.com/mdn/dom-examples/web-speech-api/speech-color-changer
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || window.webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent
var synth;


var goodbyeQue = [ 'world'];
var fine = ['fine'];

// TODO: maybe incorporate this as a reaction, or think of something else :)
let speech = (
  "It's the end of the world as we know it.\n" +
  "It's the end of the world as we know it.\n" +
  "It's the end of the world as we know it, and I feel fine."
)


var recognition = new SpeechRecognition();
if (SpeechGrammarList) {
  // SpeechGrammarList is not currently available in Safari, and does not have any effect in any other browser.
  // This code is provided as a demonstration of possible capability. You may choose not to use it.
  var speechRecognitionList = new SpeechGrammarList();
  // TODO: find out what this is
  // var grammar = '#JSGF V1.0; grammar colors; public <color> = ' + colors.join(' | ') + ' ;'
  // speechRecognitionList.addFromString(grammar, 1);
  recognition.grammars = speechRecognitionList;
}
recognition.continuous = true;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

// Safari hack start
var audiosWeWantToUnlock = [];
let goodbye = new Audio('assets/goodbye.mp3');
audiosWeWantToUnlock.push(goodbye);

// Safari hack end

function startListening() {
    // TODO: prevent default + check if already started
    if(audiosWeWantToUnlock) {  for(let audio of audiosWeWantToUnlock) {
      audio.play()
      audio.pause()
      audio.currentTime = 0  }  audiosWeWantToUnlock = null}

  recognition.start();
  console.log('Ready to receive the end of the world.');
  document.querySelector('.listening').classList.remove('inactive');
  document.querySelector('.start').classList.add('inactive');
}

function stopListening() {
  document.querySelector('.listening').classList.add('inactive');
  document.querySelector('.start').classList.remove('inactive');
  recognition.stop()
}

// recognition.addEventListener('end', () => recognition.start());
recognition.onresult = function(event) {
  // The SpeechRecognitionEvent results property returns a SpeechRecognitionResultList object
  // The SpeechRecognitionResultList object contains SpeechRecognitionResult objects.
  // It has a getter so it can be accessed like an array
  // The first [0] returns the SpeechRecognitionResult at the last position.
  // Each SpeechRecognitionResult object contains SpeechRecognitionAlternative objects that contain individual results.
  // These also have getters so they can be accessed like arrays.
  // The second [0] returns the SpeechRecognitionAlternative at position 0.
  // We then return the transcript property of the SpeechRecognitionAlternative object
  console.log(event)

  var result = event.results[event.resultIndex][0].transcript;

  // Check for keywords
  const findOne = (haystack, arr) => {
    return arr.some(v => haystack.includes(v));
  };

  var go = findOne(goodbyeQue, result.split(' '));

  if (go) {
    goodbye.play();
  } else if (findOne(fine, result.split(' '))){
    playByText("en-US", "it's the end of the world and I feel fine");
  }

  // TODO: in safari we need to do the preloading trick?

  console.log('Result received: ' + result + '.');
  console.log('Confidence: ' + event.results[0][0].confidence);
}

recognition.onspeechend = function() {
  document.querySelector('.listening').classList.add('inactive');
  document.querySelector('.start').classList.remove('inactive');
}

recognition.onnomatch = function(event) {
  diagnostic.textContent = "I didn't recognise that color.";
}

recognition.onerror = function(event) {
  console.log('Error occurred in recognition: ' + event.error);
  // make im listening go away
  document.querySelector('.listening').classList.add('inactive');
  document.querySelector('.start').classList.remove('inactive');
}


