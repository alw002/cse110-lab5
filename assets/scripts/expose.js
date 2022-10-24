// expose.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  // HTML Id reference of the selected horn on the drop down menu
  let hornSelect = document.getElementById('horn-select');
  
  // HTML Id reference of the current volume amount on the slider
  let hornVolume = document.getElementById("volume");
  
  // HTML tag reference of the horn image
  let hornImg = document.getElementsByTagName('img')[0];

  // HTML tag reference of the horn audio
  let hornAudio = document.getElementsByTagName('audio')[0]

  // HTML tag reference of the play sound button
  let hornButton = document.getElementsByTagName("button")[0]
  
  // HTML tag tag reference of the volume audio image
  let volumeImg = document.getElementsByTagName('img')[1]

  const jsConfetti = new JSConfetti();

  // Update horn image and audio based on the selected value
  function updateHorn() {
    hornImg.src = "assets/images/" + hornSelect.value + ".svg";
    console.log(hornImg.src)

    hornAudio.src = "assets/audio/" + hornSelect.value + ".mp3";
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
  function updateVolume() {
    console.log(hornVolume.value / 100)

    hornAudio.volume = hornVolume.value / 100;
    if(hornVolume.value == 0) {
      volumeImg.src = "assets/icons/volume-level-0.svg";
    }
    else if(hornVolume.value >= 1 && hornVolume.value < 33) {
      volumeImg.src = "assets/icons/volume-level-1.svg";
    }
    else if(hornVolume.value >= 33 && hornVolume.value < 67) {
      volumeImg.src = "assets/icons/volume-level-2.svg";
    }
    else {
      volumeImg.src = "assets/icons/volume-level-3.svg";
    }
  }

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