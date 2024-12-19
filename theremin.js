const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Set the dimensions of the blue box
const boxWidth = canvas.width * 2/3;
const boxHeight = canvas.height * 2/3;
const boxX = (canvas.width - boxWidth) / 2;
const boxY = (canvas.height - boxHeight) / 2;

// Draw the blue box
ctx.fillStyle = 'skyblue';
ctx.fillRect(boxX, boxY, boxWidth, boxHeight);

// Audio context setup
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const oscillator = audioCtx.createOscillator();
const gainNode = audioCtx.createGain();

oscillator.connect(gainNode);
gainNode.connect(audioCtx.destination);

oscillator.type = 'sine'; // You can experiment with different oscillator types
oscillator.start();

// User interaction to enable audio
canvas.addEventListener('click', (event) => {
  audioCtx.resume().then(() => {
    console.log('AudioContext resumed successfully.');
  });
});

// Mouse movement event listener
canvas.addEventListener('mousemove', (event) => {
  // Check if the mouse is within the blue box
  if (event.clientX >= boxX && event.clientX <= boxX + boxWidth &&
      event.clientY >= boxY && event.clientY <= boxY + boxHeight) {
    // Calculate frequency based on mouse X position within the box
    const relativeX = event.clientX - boxX;
    const frequency = 200 + (relativeX / boxWidth) * 1000;
    oscillator.frequency.value = frequency;

    // Calculate gain based on mouse Y position within the box
    const relativeY = event.clientY - boxY;
    const gain = relativeY / boxHeight;
    gainNode.gain.value = gain;
  } else {
    // Set the oscillator's frequency and gain to 0 to silence the sound
    oscillator.frequency.value = 0;
    gainNode.gain.value = 0;
  }
});  
