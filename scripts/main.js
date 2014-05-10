bespoke.from('article', {
  keys: true,
  touch: true,
  bullets: 'li, .bullet',
  hash: true,
  forms: true
});

var audioCtx = new webkitAudioContext();
var oscillator = audioCtx.createOscillator();
oscillator.type = 'sine';
oscillator.frequency.value = 440;

// Start playing the source immediately
oscillator.start(0);

var gainNode = audioCtx.createGainNode();
var now = audioCtx.currentTime;

// Turn the volume down tp 0%
gainNode.gain.setValueAtTime(0, now);

window.addEventListener('load', function() {
	var soundButton = document.getElementById('sound-btn');
	var isPlaying = false;

	soundButton.addEventListener('click', function() {
		if(isPlaying) {
			isPlaying = false;
			stop();
			soundButton.innerHTML = 'Play';
		} else {
			isPlaying = true;
			play();
			soundButton.innerHTML = 'Stop';
		}
	});
});

function play() {
	var now = audioCtx.currentTime;
	oscillator.connect(gainNode);
	gainNode.connect(audioCtx.destination);
	gainNode.gain.setValueAtTime(1, now);
}

function stop() {
	var now = audioCtx.currentTime;
	gainNode.gain.setValueAtTime(0, now);
	oscillator.disconnect();
	gainNode.disconnect();
}