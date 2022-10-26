// explore.js

window.addEventListener('DOMContentLoaded', init);

let faceImg, voiceSelect, textInput, playButton, utterance, voices;

function init() {
  // DOM elements
  faceImg = document.getElementsByTagName('img')[0];
  voiceSelect = document.getElementById('voice-select');
  playButton = document.getElementsByTagName('button')[0];
  textInput = document.getElementById('text-to-speak');

  // Event Listener for speech
  playButton.addEventListener('click', e => {
    e.preventDefault();
    speak();
    textInput.blur();
  });
}

const getVoices = () => {
  voices = speechSynthesis.getVoices();

  voices.forEach(voice => {
    // Create a new option element for each voice object
    const option = document.createElement('option');
    
    // Format what text is and where it is placed
    option.textContent = voice.name + '(' + voice.lang + ')';

    // Sets the value of an attribute on the option element
    option.setAttribute('data-lang', voice.lang);
    option.setAttribute('data-name', voice.name);
    // Append created option elements to the select element
    voiceSelect.appendChild(option);
  });
}

const speak = () => {
  // Only run when text is inputed
  if (textInput.value !== '') {
    faceImg.src = "assets/images/smiling-open.png";
    utterance = new SpeechSynthesisUtterance(textInput.value);

    // Selected Voice
    const selectedVoice = voiceSelect.selectedOptions[0].getAttribute('data-name');

    // Change face when done speaking
    utterance.onend = e => {
      faceImg.src = "assets/images/smiling.png";
    };

    // Loop through voices to assign correct voice
    voices.forEach(voice => {
      if (voice.name === selectedVoice) {
        utterance.voice = voice;
      }
    });
    speechSynthesis.speak(utterance);
  }
}

getVoices();
if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = getVoices;
}