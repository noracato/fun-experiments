let _speechSynth
let _voices
const _cache = {}

/**
 * retries until there have been voices loaded. No stopper flag included in this example.
 * Note that this function assumes, that there are voices installed on the host system.
 */

function loadVoicesWhenAvailable (onComplete = () => {}) {
  _speechSynth = window.speechSynthesis
  const voices = _speechSynth.getVoices()

  if (voices.length !== 0) {
    _voices = voices

    onComplete()
  } else {
    return setTimeout(function () { loadVoicesWhenAvailable(onComplete) }, 100)
  }
}

/**
 * Returns the first found voice for a given language code.
 */

function getVoices (locale) {
  if (!_speechSynth) {
    throw new Error('Browser does not support speech synthesis')
  }
  if (_cache[locale]) return _cache[locale]

  _cache[locale] = _voices.filter(voice => voice.lang === locale)
  return _cache[locale]
}

/**
 * Speak a certain text
 * @param locale the locale this voice requires
 * @param text the text to speak
 * @param onEnd callback if tts is finished
 */

function playByText (locale, text, rate, onEnd) {
  const voices = getVoices(locale)


  // TODO load preference here, e.g. male / female etc.
  // TODO but for now we just use the first occurrence
  const utterance = new window.SpeechSynthesisUtterance()
  utterance.voice = voices[0]
  utterance.pitch = 1
  utterance.voiceURI = 'native'
  utterance.volume = 10
  if (rate) {
    utterance.rate = rate
  } else{
    utterance.rate = 5
  }

  utterance.text = text
  utterance.lang = locale

  if (onEnd) {
    utterance.onend = onEnd
  }

  console.log(locale)
  _speechSynth.cancel() // cancel current speak, if any is running
  _speechSynth.speak(utterance)
}

// on document ready
loadVoicesWhenAvailable(function () {
 console.log("loaded")
})

function inAllVoices(text) {
    for (let i =0; i < _voices.length; i++){
        setTimeout(function() {playByText(_voices[i].lang, text)}, i * 1000)
    }
}

function inRandomVoice(text, times) {
    var voice;
    for (let i =0; i < times; i++){
        setTimeout(function() {
            voice = _voices[Math.floor(Math.random() * _voices.length)];
            playByText(voice.lang, text)
        }, i * 1000)
    }
}

// function speak () {
//   setTimeout(() => playByText("en-US", "Hello, world"), 300)
// }
