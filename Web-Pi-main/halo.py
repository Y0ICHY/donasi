<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pixel Character Game</title>
    <style>
        body {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            background-color: #333;
            font-family: Arial, sans-serif;
        }
        
        #gameContainer {
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        
        canvas {
            border: 2px solid #666;
            background-color: #222;
            image-rendering: pixelated;
            image-rendering: crisp-edges;
            width: 640px;
            height: 480px;
        }
        
        .controls {
            margin-top: 20px;
            color: white;
            text-align: center;
        }
    </style>
</head>
<body>
    <div id="gameContainer">
        <canvas id="gameCanvas" width="320" height="240"></canvas>
        <div class="controls">
            <p>Gunakan tombol ARROW untuk mengontrol karakter</p>
        </div>
    </div>

    <script>
        const canvas = document.getElementById('gameCanvas');
        const ctx = canvas.getContext('2d');
        
        // Game constants
        const TILE_SIZE = 16;
        const SCALE = 3;
        
        // Player object
        const player = {
            x: 150,
            y: 100,
            width: 16,
            height: 24,
            speed: 3,
            direction: 'down',
            frame: 0,
            animationSpeed: 10,
            animationCounter: 0,
            moving: false
        };
        
        // Keyboard state
        const keys = {
            ArrowUp: false,
            ArrowDown: false,
            ArrowLeft: false,
            ArrowRight: false
        };
        
        // Event listeners for keyboard
        window.addEventListener('keydown', (e) => {
            if (keys.hasOwnProperty(e.key)) {
                keys[e.key] = true;
            }
        });
        
        window.addEventListener('keyup', (e) => {
            if (keys.hasOwnProperty(e.key)) {
                keys[e.key] = false;
            }
        });
        
        // Draw the player character (pixel by pixel for the sprite)
        function drawPlayer() {
            // Reset any transformations
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            
            // Move to player position and scale appropriately
            ctx.translate(player.x, player.y);
            ctx.scale(SCALE, SCALE);
            
            // Define colors
            const RED = '#E53935';
            const BLACK = '#000000';
            const BEIGE = '#D7CCC8';
            const YELLOW = '#FFB300';
            const WHITE = '#FFFFFF';
            const GRAY = '#9E9E9E';
            
            // Draw player sprite (basic version)
            // Head/Top part
            ctx.fillStyle = RED;
            ctx.fillRect(-4, -12, 8, 4);
            
            // Face area
            ctx.fillStyle = BEIGE;
            ctx.fillRect(-3, -8, 6, 4);
            
            // Body
            ctx.fillStyle = GRAY;
            ctx.fillRect(-4, -4, 8, 4);
            
            // Bottom part
            ctx.fillStyle = YELLOW;
            ctx.fillRect(-4, 0, 8, 4);
            
            // Legs (with animation)
            if (player.moving) {
                // Simple walking animation
                if (player.frame === 0) {
                    ctx.fillStyle = BLACK;
                    ctx.fillRect(-3, 4, 2, 4);
                    ctx.fillRect(1, 4, 2, 4);
                } else {
                    ctx.fillStyle = BLACK;
                    ctx.fillRect(-2, 4, 2, 4);
                    ctx.fillRect(0, 4, 2, 4);
                }
            } else {
                // Standing still
                ctx.fillStyle = BLACK;
                ctx.fillRect(-2, 4, 4, 4);
            }
            
            // Eyes
            ctx.fillStyle = BLACK;
            if (player.direction === 'left') {
                ctx.fillRect(-3, -7, 1, 1);
            } else if (player.direction === 'right') {
                ctx.fillRect(2, -7, 1, 1);
            } else if (player.direction === 'up') {
                ctx.fillRect(-2, -7, 1, 1);
                ctx.fillRect(1, -7, 1, 1);
            } else {
                ctx.fillRect(-2, -6, 1, 1);
                ctx.fillRect(1, -6, 1, 1);
            }
            
            // Reset transform
            ctx.setTransform(1, 0, 0, 1, 0, 0);
        }
        
        // Update game state
        function update() {
            player.moving = false;
            
            // Handle movement
            if (keys.ArrowUp) {
                player.y -= player.speed;
                player.direction = 'up';
                player.moving = true;
            }
            if (keys.ArrowDown) {
                player.y += player.speed;
                player.direction = 'down';
                player.moving = true;
            }
            if (keys.ArrowLeft) {
                player.x -= player.speed;
                player.direction = 'left';
                player.moving = true;
            }
            if (keys.ArrowRight) {
                player.x += player.speed;
                player.direction = 'right';
                player.moving = true;
            }
            
            // Keep player within canvas bounds
            if (player.x < 0) player.x = 0;
            if (player.y < 0) player.y = 0;
            if (player.x > canvas.width - player.width * SCALE) {
                player.x = canvas.width - player.width * SCALE;
            }
            if (player.y > canvas.height - player.height * SCALE) {
                player.y = canvas.height - player.height * SCALE;
            }
            
            // Handle animation timing
            if (player.moving) {
                player.animationCounter++;
                if (player.animationCounter >= player.animationSpeed) {
                    player.frame = player.frame === 0 ? 1 : 0;
                    player.animationCounter = 0;
                }
            } else {
                player.frame = 0;
                player.animationCounter = 0;
            }
        }
        
        // Draw everything
        function draw() {
            // Clear canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Draw a simple grid background
            ctx.strokeStyle = '#333333';
            ctx.lineWidth = 1;
            for (let x = 0; x < canvas.width; x += TILE_SIZE) {
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, canvas.height);
                ctx.stroke();
            }
            for (let y = 0; y < canvas.height; y += TILE_SIZE) {
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(canvas.width, y);
                ctx.stroke();
            }
            
            // Draw player
            drawPlayer();
        }
        
        // Game loop
        function gameLoop() {
            update();
            draw();
            requestAnimationFrame(gameLoop);
        }
        
        // Start the game
        gameLoop();
    </script>
</body>
</html>