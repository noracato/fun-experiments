// BASED ON https://github.com/mdn/dom-examples/web-speech-api/speech-color-changer
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || window.webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

var keywords = [ 'world'];

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
recognition.continuous = false;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

var bg = document.querySelector('html');

document.body.onclick = function() {
    // TODO: prevent default + check if already started
  recognition.start();
  console.log('Ready to receive the end of the world.');
  document.querySelector('.listening').classList.add('active');
}

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
  var result = event.results[0][0].transcript;

  // Check for keywords
  const findOne = (haystack, arr) => {
    return arr.some(v => haystack.includes(v));
  };

  var go = findOne(keywords, result.split(' '));

  if (go) {
    var audio = new Audio('assets/goodbye.mp3');
    audio.play();
  }

  console.log('Result received: ' + result + '.');
  console.log(go);
  console.log('Confidence: ' + event.results[0][0].confidence);
}

recognition.onspeechend = function() {
    // TODO: don't stop but listen again :)
  recognition.stop();
  document.querySelector('.listening').classList.remove('active');
}

recognition.onnomatch = function(event) {
  diagnostic.textContent = "I didn't recognise that color.";
}

recognition.onerror = function(event) {
  diagnostic.textContent = 'Error occurred in recognition: ' + event.error;
}
