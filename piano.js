window.onload = function() {
  generateKeys(61);
}

function generateKeys(numberOfKeys){
  //the order of piano keys is WBWBW-WBWBWBW
  //61 keys include both the black and the white keys
  //generate the keyboard by drawing the white keys first;
  //then draw the black keys on top
  var keyboard = document.getElementById("keyboard");

  var numOfWhiteKeys = 0;
  for (var i = 0; i < numberOfKeys; i++){
	if (i % 12 != 1 && i % 12 != 3 && i % 12 != 6 && i % 12 != 8 && i % 12 != 10){ //if not black
	  var newKey = document.createElement("button");
	  newKey.value = i;
	  newKey.classList.add("whiteKey");
	  newKey.style.position = "absolute";
	  newKey.style.left = 28 * (numOfWhiteKeys + 1)  + "px";
	  newKey.onclick = playNote;
	  keyboard.appendChild(newKey);
	  numOfWhiteKeys++;
	}
  }

  numOfWhiteKeys = 0;
  for (var i = 0; i < numberOfKeys; i++){
	if (i % 12 == 1 || i % 12 == 3 || i % 12 == 6 || i % 12 == 8 || i % 12 == 10){ //if black
		var newKey = document.createElement("button");
		newKey.value = i;
		newKey.classList.add("blackKey");
		newKey.style.position = "absolute";
		newKey.style.left = 28 * (numOfWhiteKeys + 0.7) + "px";
		newKey.onclick = playNote;
		keyboard.appendChild(newKey);
	}	else numOfWhiteKeys++;
  }
}

function playNote (){
	//initializes the sound synthesizer
	const synth = new Tone.Synth().toDestination();

	//convert the key value from the 0-60 range to the note frequency in Hz
	//https://en.wikipedia.org/wiki/Piano_key_frequencies (a 61-key keyboard 
	//starts with the 16-th key of the standard piano
	var f = 2 ** ((this.value - 34) / 12) * 440;

	//this plays a standard-concert-pitch 440Hz tone
	//replace the 440 Hz with the frequency you computed above
	//synth.triggerAttackRelease("440Hz", "8n");
	synth.triggerAttackRelease(f + "Hz", "8n");
}