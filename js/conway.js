class ConwayGameOfLife {
  constructor(canvas, width = 50, height = 50, cellSize = 4) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.width = width;
    this.height = height;
    this.cellSize = cellSize;
    
    // Set canvas size
    this.canvas.width = width * cellSize;
    this.canvas.height = height * cellSize;
    
    // Initialize grid
    this.grid = this.createGrid();
    this.nextGrid = this.createGrid();
    
    // Initialize with random pattern
    this.randomize();
    
    // Animation settings
    this.isRunning = true;
    this.speed = 150; // milliseconds between generations
    this.lastUpdate = 0;
    
    // Start animation
    this.animate();
  }
  
  createGrid() {
    const grid = [];
    for (let y = 0; y < this.height; y++) {
      grid[y] = [];
      for (let x = 0; x < this.width; x++) {
        grid[y][x] = 0;
      }
    }
    return grid;
  }
  
  randomize() {
    // Clear the grid first
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        this.grid[y][x] = 0;
      }
    }
    
    // Add some interesting patterns
    const patterns = [
      this.createGlider,
      this.createBlinker,
      this.createBlock,
      this.createRandom
    ];
    
    const pattern = patterns[Math.floor(Math.random() * patterns.length)];
    pattern.call(this);
  }
  
  createGlider() {
    // Glider pattern
    const centerX = Math.floor(this.width / 2);
    const centerY = Math.floor(this.height / 2);
    
    this.grid[centerY][centerX + 1] = 1;
    this.grid[centerY + 1][centerX + 2] = 1;
    this.grid[centerY + 2][centerX] = 1;
    this.grid[centerY + 2][centerX + 1] = 1;
    this.grid[centerY + 2][centerX + 2] = 1;
  }
  
  createBlinker() {
    // Blinker pattern
    const centerX = Math.floor(this.width / 2);
    const centerY = Math.floor(this.height / 2);
    
    this.grid[centerY][centerX] = 1;
    this.grid[centerY][centerX + 1] = 1;
    this.grid[centerY][centerX + 2] = 1;
  }
  
  createBlock() {
    // Block pattern (still life)
    const centerX = Math.floor(this.width / 2);
    const centerY = Math.floor(this.height / 2);
    
    this.grid[centerY][centerX] = 1;
    this.grid[centerY][centerX + 1] = 1;
    this.grid[centerY + 1][centerX] = 1;
    this.grid[centerY + 1][centerX + 1] = 1;
  }
  
  createRandom() {
    // Random pattern
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        this.grid[y][x] = Math.random() > 0.7 ? 1 : 0;
      }
    }
  }
  
  countNeighbors(x, y) {
    let count = 0;
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        if (dx === 0 && dy === 0) continue;
        
        const nx = (x + dx + this.width) % this.width;
        const ny = (y + dy + this.height) % this.height;
        
        if (this.grid[ny][nx]) count++;
      }
    }
    return count;
  }
  
  update() {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const neighbors = this.countNeighbors(x, y);
        const current = this.grid[y][x];
        
        if (current === 1) {
          // Live cell
          this.nextGrid[y][x] = (neighbors === 2 || neighbors === 3) ? 1 : 0;
        } else {
          // Dead cell
          this.nextGrid[y][x] = neighbors === 3 ? 1 : 0;
        }
      }
    }
    
    // Swap grids
    [this.grid, this.nextGrid] = [this.nextGrid, this.grid];
  }
  
  draw() {
    // Clear canvas with semi-transparent background for fade effect
    this.ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Draw cells with subtle gradient effect
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        if (this.grid[y][x]) {
          // Create a subtle gradient effect
          const alpha = 0.2 + (Math.random() * 0.2);
          this.ctx.fillStyle = `rgba(243, 97, 112, ${alpha})`;
          
          this.ctx.fillRect(
            x * this.cellSize,
            y * this.cellSize,
            this.cellSize,
            this.cellSize
          );
        }
      }
    }
  }
  
  animate(currentTime) {
    if (!this.isRunning) return;
    
    // Update at specified speed
    if (currentTime - this.lastUpdate > this.speed) {
      this.update();
      this.lastUpdate = currentTime;
    }
    
    this.draw();
    requestAnimationFrame((time) => this.animate(time));
  }
  
  toggle() {
    this.isRunning = !this.isRunning;
    if (this.isRunning) {
      this.animate(performance.now());
    }
  }
  
  reset() {
    this.randomize();
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  const canvas = document.getElementById('conway-canvas');
  if (canvas) {
    const game = new ConwayGameOfLife(canvas, 60, 60, 3);
    
    // Add some interesting patterns periodically
    setInterval(() => {
      if (Math.random() > 0.8) {
        game.reset();
      }
    }, 10000); // Reset every 10 seconds with 20% probability
    
    // Add hover effect to speed up animation
    const coverCard = document.querySelector('.cover-card');
    if (coverCard) {
      coverCard.addEventListener('mouseenter', () => {
        game.speed = 80; // Faster on hover
      });
      
      coverCard.addEventListener('mouseleave', () => {
        game.speed = 150; // Normal speed
      });
    }
  }
}); 