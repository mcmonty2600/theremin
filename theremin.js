const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Audio context setup
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const oscillator = audioCtx.createOscillator();
const gainNode = audioCtx.createGain();

oscillator.connect(gainNode);
gainNode.connect(audioCtx.destination);

oscillator.type = 'sine'; // You can experiment with different oscillator types
oscillator.start();

let soundOn = false;

// User interaction to toggle sound
canvas.addEventListener('click', (event) => {
  audioCtx.resume().then(() => {
    console.log('AudioContext resumed successfully.');
  });

  soundOn = !soundOn;
});

// Mouse movement event listener
canvas.addEventListener('mousemove', (event) => {
  if (soundOn) {
    // Calculate frequency based on mouse X position
    const frequency = 200 + (event.clientX / canvas.width) * 1000;
    oscillator.frequency.value = frequency;

    // Calculate gain based on mouse Y position
    const gain = event.clientY / canvas.height;
    gainNode.gain.value = gain;
  }
});
