class ConwayGameOfLife {
  constructor(canvas, width = 50, height = 50, cellSize = 4) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.width = width;
    this.height = height;
    this.cellSize = cellSize;
    
    // Set canvas size to match container
    this.resizeCanvas();
    
    // Initialize grid
    this.grid = this.createGrid();
    this.nextGrid = this.createGrid();
    
    // Initialize with random pattern
    this.randomize();
    
    // Animation settings - optimized for battery life
    this.isRunning = true;
    this.isVisible = true;
    this.speed = this.getOptimalSpeed();
    this.lastUpdate = 0;
    
    // Start animation
    this.animate();
    
    // Handle window resize
    window.addEventListener('resize', () => this.resizeCanvas());
    
    // Battery optimization: pause when not visible
    this.setupVisibilityHandlers();
  }
  
  getOptimalSpeed() {
    // Slower animation on mobile for better battery life
    const isMobile = window.innerWidth <= 599;
    return isMobile ? 500 : 200; // 500ms on mobile, 200ms on desktop
  }
  
  setupVisibilityHandlers() {
    // Pause animation when page is not visible
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.pause();
      } else {
        this.resume();
      }
    });
    
    // Use Intersection Observer to pause when not visible on screen
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          this.isVisible = entry.isIntersecting;
          if (!this.isVisible) {
            this.pause();
          } else if (!document.hidden) {
            this.resume();
          }
        });
      }, { threshold: 0.1 });
      
      observer.observe(this.canvas);
    }
  }
  
  resizeCanvas() {
    const container = this.canvas.parentElement;
    
    if (container) {
      const rect = container.getBoundingClientRect();
      
      // Check if we're on mobile (small screen)
      const isMobile = window.innerWidth <= 599; // Mobile breakpoint
      
      let canvasWidth, canvasHeight;
      
      if (isMobile) {
        // On mobile, fit within container bounds (no horizontal extension)
        canvasWidth = rect.width;
        canvasHeight = rect.height + 60; // Still extend vertically for visual effect
      } else {
        // On desktop, extend canvas beyond container bounds to fill edges
        canvasWidth = rect.width + 60; // 30px on each side
        canvasHeight = rect.height + 60; // 30px on each side
      }
      
      this.canvas.width = canvasWidth;
      this.canvas.height = canvasHeight;
      
      // Recalculate grid dimensions based on new canvas size
      this.width = Math.floor(canvasWidth / this.cellSize);
      this.height = Math.floor(canvasHeight / this.cellSize);
      
      this.grid = this.createGrid();
      this.nextGrid = this.createGrid();
      this.randomize();
      
      // Update speed based on new screen size
      this.speed = this.getOptimalSpeed();
    }
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
    
    // Prefer patterns that cover more area
    const patterns = [
      this.createRandom,      // 60% chance - covers whole area
      this.createRandom,      // 60% chance - covers whole area
      this.createRandom,      // 60% chance - covers whole area
      this.createGlider,      // 20% chance - small pattern
      this.createBlinker,     // 10% chance - small pattern
      this.createBlock        // 10% chance - small pattern
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
    // Random pattern with better coverage
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        // Higher probability for more cells, ensuring better coverage
        this.grid[y][x] = Math.random() > 0.6 ? 1 : 0;
      }
    }
    
    // Ensure we have a minimum number of cells for interesting patterns
    let cellCount = 0;
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        if (this.grid[y][x]) cellCount++;
      }
    }
    
    // If we have too few cells, add more randomly
    const minCells = Math.floor((this.width * this.height) * 0.15); // At least 15% coverage
    if (cellCount < minCells) {
      for (let i = 0; i < minCells - cellCount; i++) {
        const x = Math.floor(Math.random() * this.width);
        const y = Math.floor(Math.random() * this.height);
        this.grid[y][x] = 1;
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
    // Clear canvas completely (no fade effect)
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Draw cells with yellow color (matching post titles)
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        if (this.grid[y][x]) {
          // Red color for better visibility
          const alpha = 0.25 + (Math.random() * 0.15);
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
    if (!this.isRunning || !this.isVisible) {
      // Stop the animation loop when paused or not visible
      return;
    }
    
    // Update at specified speed
    if (currentTime - this.lastUpdate > this.speed) {
      this.update();
      this.lastUpdate = currentTime;
    }
    
    this.draw();
    requestAnimationFrame((time) => this.animate(time));
  }
  
  // Pause animation when page is not visible
  pause() {
    this.isRunning = false;
  }
  
  resume() {
    this.isRunning = true;
    this.animate(performance.now());
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
  initializeConway();
});

// Also try after a short delay in case DOM isn't fully ready
setTimeout(initializeConway, 100);

function initializeConway() {
  const canvas = document.getElementById('conway-canvas');
  
  if (canvas) {
    const game = new ConwayGameOfLife(canvas);
    
    // Add some interesting patterns periodically (less frequently for battery life)
    setInterval(() => {
      if (Math.random() > 0.95) { // Reduced frequency from 0.9 to 0.95
        game.reset();
      }
    }, 30000); // Increased interval from 15s to 30s
    
    // Add hover effect to speed up animation slightly (desktop only)
    const coverCard = document.querySelector('.cover-card');
    if (coverCard && window.innerWidth > 599) { // Only on desktop
      coverCard.addEventListener('mouseenter', () => {
        game.speed = 150; // Slightly faster on hover
      });
      
      coverCard.addEventListener('mouseleave', () => {
        game.speed = game.getOptimalSpeed(); // Return to optimal speed
      });
    }
    
    // Add toggle button functionality
    const toggleButton = document.getElementById('toggle-animation');
    if (toggleButton) {
      const icon = toggleButton.querySelector('.animation-icon');
      
      toggleButton.addEventListener('click', () => {
        if (game.isRunning) {
          game.pause();
          icon.className = 'fa fa-play animation-icon';
          toggleButton.title = 'Resume background animation';
        } else {
          game.resume();
          icon.className = 'fa fa-pause animation-icon';
          toggleButton.title = 'Pause background animation';
        }
      });
    }
  }
} 