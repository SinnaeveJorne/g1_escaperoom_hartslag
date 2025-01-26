      // Game Setup
      document.addEventListener('DOMContentLoaded', function() {
        const playfield = document.querySelector('.js-greeceplayfield');
        const totalTiles = 20;
        const correctTiles = 4;
      
        // Generate Random Tile Indices for the Correct SVG
        function getRandomIndices(count, max) {
          const indices = new Set();
          while (indices.size < count) {
            indices.add(Math.floor(Math.random() * max));
          }
          return Array.from(indices);
        }
        const correctIndices = getRandomIndices(correctTiles, totalTiles);
        console.log(correctIndices);
        console.log('Greece Game Loaded');
    });