const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Get the canvas dimensions
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

// Audio context setup
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const oscillator = audioCtx.createOscillator();
const gainNode = audioCtx.createGain();

oscillator.connect(gainNode);
gainNode.connect(audioCtx.destination);

oscillator.type = 'sine'; // You can experiment with different oscillator types
oscillator.start();

// User interaction to enable audio
canvas.addEventListener('click', () => {
  audioCtx.resume().then(() => {
    console.log('AudioContext resumed successfully.');
  });
});

// Mouse/Touch movement event listener
canvas.addEventListener('mousemove', (event) => {
  updateSound(event.clientX, event.clientY);
});

canvas.addEventListener('touchmove', (event) => {
  const touch = event.touches[0];
  updateSound(touch.clientX, touch.clientY);
});

function updateSound(x, y) {
  // Calculate frequency based on X position, smoothing the transition
  const frequency = 200 + (x / canvasWidth) * 200;
  oscillator.frequency.value = frequency;

  // Calculate gain based on Y position, smoothing the transition
  const gain = y / canvasHeight;
  gainNode.gain.value = gain;
}
