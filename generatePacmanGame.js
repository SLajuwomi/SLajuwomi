import { PacmanRenderer } from 'pacman-contribution-graph';
import fs from 'fs'; // Import the file system module to save the SVG

console.log('Script starting...');

const renderer = new PacmanRenderer({
  username: 'torvalds',
  platform: 'github',
  gameTheme: 'github-dark', // Renamed from 'theme'
  gameSpeed: 2, // Renamed from 'speed'
  enableSounds: false, // Disabled sounds, as it's mainly for canvas
  outputFormat: 'svg', // Renamed from 'output' and set to 'svg'
  svgCallback: (svgData) => {
    console.log('svgCallback triggered. SVG Data received.');
    try {
      fs.writeFileSync('pacman_torvalds.svg', svgData);
      console.log('Pacman SVG generated as pacman_torvalds.svg');
    } catch (e) {
      console.error('Error writing SVG file:', e);
    }
  },
  gameOverCallback: () => {
    console.log('gameOverCallback triggered.');
  },
  // If you still wanted to try canvas, you'd need a canvas-mocking library
  // and pass the mocked canvas instance here, e.g.,
  // canvas: myMockedCanvasElement
});

console.log('PacmanRenderer instantiated. Calling start()...');

renderer
  .start()
  .then(() => {
    console.log('renderer.start() promise resolved.');
    // Note: The script might exit here if svgCallback is fully asynchronous
    // and doesn't keep the event loop alive.
    // Typically, fs.writeFileSync is synchronous, so if svgCallback is called,
    // the file write should complete before this .then() or shortly after.
  })
  .catch((error) => {
    console.error(
      'Error during renderer.start() or in its promise chain:',
      error
    );
  });

// This log might appear before async operations complete
console.log(
  'Script execution nearing end (async operations might still be pending).'
);
