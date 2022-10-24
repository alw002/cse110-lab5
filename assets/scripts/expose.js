// expose.js

window.addEventListener('DOMContentLoaded', init);

let hornSelect, hornVolume, hornImg, hornAudio, hornButton, volumeImg, jsConfetti;

function init() {
  // HTML Id reference of the selected horn on the drop down menu
  hornSelect = document.getElementById('horn-select');
  
  // HTML Id reference of the current volume amount on the slider
  hornVolume = document.getElementById("volume");
  
  // HTML tag reference of the horn image
  hornImg = document.getElementsByTagName('img')[0];

  // HTML tag reference of the horn audio
  hornAudio = document.getElementsByTagName('audio')[0]

  // HTML tag reference of the play sound button
  hornButton = document.getElementsByTagName("button")[0]
  
  // HTML tag tag reference of the volume audio image
  volumeImg = document.getElementsByTagName('img')[1]

  jsConfetti = new JSConfetti();

   /*
  Operations
  1. Selection of horn, which changes image and audio of horn based on selected horn
  2. Pressing of button, which plays audio based on the selected horn
  3. Changing of volume, which changes numeric value of volume based on slider position
  */
  hornSelect.addEventListener("change", updateHorn);
  hornButton.addEventListener("click", playHorn);
  hornVolume.addEventListener("input", updateVolume);
}

// Update horn image and audio based on the selected value
function updateHorn(e) {
  hornImg.src = "assets/images/" + e.target.value + ".svg";
  console.log(hornImg.src)

  hornAudio.src = "assets/audio/" + e.target.value + ".mp3";
  console.log(hornAudio.src)
}

// Play horn audio based on the selected value from updateHorn
function playHorn() {
  hornAudio.play()

  if(hornSelect.value == "party-horn") {
    jsConfetti.addConfetti();
  }
}

// Update volume of audio based on the slider value
// Need to divide by 100 b/c values for audio need to be between 0.0 - 1.0
function updateVolume(e) {
  console.log(e.target.value / 100)

  hornAudio.volume = e.target.value / 100;
  if(e.target.value == 0) {
    volumeImg.src = "assets/icons/volume-level-0.svg";
  }
  else if(e.target.value >= 1 && e.target.value < 33) {
    volumeImg.src = "assets/icons/volume-level-1.svg";
  }
  else if(e.target.value >= 33 && e.target.value < 67) {
    volumeImg.src = "assets/icons/volume-level-2.svg";
  }
  else {
    volumeImg.src = "assets/icons/volume-level-3.svg";
  }
}