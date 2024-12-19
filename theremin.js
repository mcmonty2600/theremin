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
canvas.addEventListener('touchstart', (event) => {
  audioCtx.resume().then(() => {
    console.log('AudioContext resumed successfully.');
  });

  soundOn = !soundOn;
});

// Touch movement event listener
canvas.addEventListener('touchmove', (event) => {
  if (soundOn) {
    const touch = event.touches[0];
    const x = touch.clientX;
    const y = touch.clientY;

    // Calculate frequency based on touch X position
    const frequency = 200 + (x / canvas.width) * 1000;
    oscillator.frequency.value = frequency;

    // Calculate gain based on touch Y position
    const gain = y / canvas.height;
    gainNode.gain.value = gain;
  }
});
