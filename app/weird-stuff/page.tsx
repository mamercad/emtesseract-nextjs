'use client';

import React, { useState, useEffect, useRef } from 'react';

// Sprite data (pixel art as 2D arrays)
const SPRITES = {
  // Player sprites (16x16)
  player_idle: [
    '0000111111110000',
    '0001222222221000',
    '0012222222222100',
    '0122333333332210',
    '1223333333333221',
    '1233333333333321',
    '1233333333333321',
    '1233333333333321',
    '0123333333333210',
    '0012222222221100',
    '0001222222210000',
    '0000122222100000',
    '0000012221000000',
    '0000001210000000',
    '0000000100000000',
    '0000000000000000',
  ],
  // Enemy sprites (24x24)
  demodog: [
    '000000000000000000000000',
    '000000111111111000000000',
    '000001222222222100000000',
    '000012222222222210000000',
    '000122333333333221000000',
    '001233333333333332100000',
    '012333333333333333210000',
    '123333444444444333321000',
    '123334444444444433321000',
    '123344444444444443321000',
    '012344444444444443210000',
    '001234444444444432100000',
    '000123444444444321000000',
    '000012333333333210000000',
    '000001222222222100000000',
    '000000111111111000000000',
  ],
};

interface Character {
  x: number;
  y: number;
  vx: number;
  vy: number;
  width: number;
  height: number;
  grounded: boolean;
  facing: 'left' | 'right';
  animFrame: number;
  color: string;
  name: string;
}

interface Enemy {
  x: number;
  y: number;
  vx: number;
  width: number;
  height: number;
  type: 'demodog' | 'demogorgon' | 'vecna';
  health: number;
  maxHealth: number;
}

interface Tile {
  x: number;
  y: number;
  type: 'ground' | 'platform' | 'brick' | 'tree';
}

export default function WeirdStuffGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [multiplayer, setMultiplayer] = useState(false);

  const gameStateRef = useRef({
    players: [] as Character[],
    enemies: [] as Enemy[],
    tiles: [] as Tile[],
    items: [] as {x: number; y: number; type: string; collected: boolean}[],
    camera: { x: 0, y: 0 },
    keys: new Set<string>(),
    levelWidth: 4000,
    levelHeight: 600,
    score: 0,
    currentArea: 'town' as 'town' | 'forest' | 'upside-down',
  });

  const initGame = (isMultiplayer: boolean) => {
    const state = gameStateRef.current;
    
    // Create players
    state.players = [{
      x: 100,
      y: 300,
      vx: 0,
      vy: 0,
      width: 16,
      height: 16,
      grounded: false,
      facing: 'right',
      animFrame: 0,
      color: '#4169E1',
      name: 'Mike',
    }];

    if (isMultiplayer) {
      state.players.push({
        x: 150,
        y: 300,
        vx: 0,
        vy: 0,
        width: 16,
        height: 16,
        grounded: false,
        facing: 'right',
        animFrame: 0,
        color: '#FFB6C1',
        name: 'Eleven',
      });
    }

    loadLevel('town');
    setMultiplayer(isMultiplayer);
    setGameStarted(true);
  };

  const loadLevel = (area: 'town' | 'forest' | 'upside-down') => {
    const state = gameStateRef.current;
    state.currentArea = area;
    state.tiles = [];
    state.enemies = [];
    state.items = [];

    // Create ground tiles
    for (let x = 0; x < state.levelWidth; x += 32) {
      state.tiles.push({ x, y: 568, type: 'ground' });
    }

    if (area === 'town') {
      // Buildings and platforms
      for (let i = 0; i < 10; i++) {
        const x = 200 + i * 400;
        const height = 100 + Math.random() * 100;
        for (let j = 0; j < height; j += 32) {
          state.tiles.push({ x, y: 568 - j, type: 'brick' });
        }
      }

      // Add platforms
      for (let i = 0; i < 20; i++) {
        const x = 150 + i * 200;
        const y = 400 - Math.random() * 150;
        state.tiles.push({ x, y, type: 'platform' });
        state.tiles.push({ x: x + 32, y, type: 'platform' });
      }

      // Enemies
      state.enemies = [
        { x: 400, y: 520, vx: 1, width: 24, height: 24, type: 'demodog', health: 3, maxHealth: 3 },
        { x: 800, y: 520, vx: -1, width: 24, height: 24, type: 'demodog', health: 3, maxHealth: 3 },
        { x: 1200, y: 520, vx: 1, width: 32, height: 32, type: 'demogorgon', health: 5, maxHealth: 5 },
        { x: 1800, y: 520, vx: -1, width: 24, height: 24, type: 'demodog', health: 3, maxHealth: 3 },
        { x: 2400, y: 520, vx: 1, width: 32, height: 32, type: 'demogorgon', health: 5, maxHealth: 5 },
        { x: 3200, y: 520, vx: -1, width: 24, height: 24, type: 'demodog', health: 3, maxHealth: 3 },
      ];

      // Items
      for (let i = 0; i < 15; i++) {
        state.items.push({
          x: 300 + i * 250,
          y: 300 + Math.random() * 100,
          type: ['flashlight', 'walkie', 'eggo'][Math.floor(Math.random() * 3)],
          collected: false,
        });
      }
    }
  };

  const drawPixelSprite = (
    ctx: CanvasRenderingContext2D,
    sprite: string[],
    x: number,
    y: number,
    scale: number,
    colorMap: {[key: string]: string}
  ) => {
    sprite.forEach((row, rowIndex) => {
      for (let col = 0; col < row.length; col++) {
        const pixel = row[col];
        if (pixel !== '0') {
          ctx.fillStyle = colorMap[pixel] || '#000';
          ctx.fillRect(
            x + col * scale,
            y + rowIndex * scale,
            scale,
            scale
          );
        }
      }
    });
  };

  const drawPlayer = (ctx: CanvasRenderingContext2D, player: Character, cameraX: number, cameraY: number) => {
    const screenX = player.x - cameraX;
    const screenY = player.y - cameraY;

    // Draw character as colored rectangle with pixel details
    ctx.fillStyle = player.color;
    ctx.fillRect(screenX, screenY, player.width, player.height);

    // Head
    ctx.fillStyle = '#FFD700';
    ctx.fillRect(screenX + 4, screenY + 2, 8, 6);

    // Eyes
    ctx.fillStyle = '#000';
    ctx.fillRect(screenX + 5, screenY + 4, 2, 2);
    ctx.fillRect(screenX + 9, screenY + 4, 2, 2);

    // Name tag
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 10px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(player.name, screenX + player.width / 2, screenY - 5);
  };

  const drawEnemy = (ctx: CanvasRenderingContext2D, enemy: Enemy, cameraX: number, cameraY: number) => {
    const screenX = enemy.x - cameraX;
    const screenY = enemy.y - cameraY;

    const colors: {[key: string]: string} = {
      demodog: '#8B0000',
      demogorgon: '#4B0082',
      vecna: '#2F4F4F',
    };

    // Draw enemy body
    ctx.fillStyle = colors[enemy.type];
    ctx.fillRect(screenX, screenY, enemy.width, enemy.height);

    // Add details
    ctx.fillStyle = '#000';
    // Eyes
    ctx.fillRect(screenX + 6, screenY + 4, 3, 3);
    ctx.fillRect(screenX + enemy.width - 9, screenY + 4, 3, 3);
    
    // Teeth
    for (let i = 0; i < enemy.width; i += 4) {
      ctx.fillRect(screenX + i, screenY + enemy.height - 4, 2, 4);
    }

    // Health bar
    const healthBarWidth = enemy.width;
    const healthPercent = enemy.health / enemy.maxHealth;
    
    ctx.fillStyle = '#ff0000';
    ctx.fillRect(screenX, screenY - 6, healthBarWidth, 4);
    ctx.fillStyle = '#00ff00';
    ctx.fillRect(screenX, screenY - 6, healthBarWidth * healthPercent, 4);
  };

  const drawTile = (ctx: CanvasRenderingContext2D, tile: Tile, cameraX: number, cameraY: number) => {
    const screenX = tile.x - cameraX;
    const screenY = tile.y - cameraY;
    const size = 32;

    const tileColors: {[key: string]: string} = {
      ground: '#8B4513',
      platform: '#696969',
      brick: '#B22222',
      tree: '#228B22',
    };

    ctx.fillStyle = tileColors[tile.type];
    ctx.fillRect(screenX, screenY, size, size);

    // Add texture
    ctx.strokeStyle = 'rgba(0,0,0,0.3)';
    ctx.lineWidth = 1;
    ctx.strokeRect(screenX, screenY, size, size);
    
    // Pixel detail
    if (tile.type === 'brick') {
      ctx.fillStyle = 'rgba(0,0,0,0.2)';
      ctx.fillRect(screenX + 4, screenY + 4, 24, 24);
    } else if (tile.type === 'ground') {
      for (let i = 0; i < 4; i++) {
        ctx.fillStyle = 'rgba(0,0,0,0.1)';
        ctx.fillRect(screenX + i * 8, screenY + i * 8, 4, 4);
      }
    }
  };

  useEffect(() => {
    if (!gameStarted) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const state = gameStateRef.current;
    let animationId: number;
    const GRAVITY = 0.6;
    const JUMP_STRENGTH = 12;
    const MOVE_SPEED = 4;

    const handleKeyDown = (e: KeyboardEvent) => {
      state.keys.add(e.key.toLowerCase());
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      state.keys.delete(e.key.toLowerCase());
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    const gameLoop = () => {
      // Update
      state.players.forEach((player, idx) => {
        const controls = idx === 0
          ? { left: 'a', right: 'd', jump: 'w' }
          : { left: 'arrowleft', right: 'arrowright', jump: 'arrowup' };

        // Movement
        player.vx = 0;
        if (state.keys.has(controls.left)) {
          player.vx = -MOVE_SPEED;
          player.facing = 'left';
        }
        if (state.keys.has(controls.right)) {
          player.vx = MOVE_SPEED;
          player.facing = 'right';
        }
        if (state.keys.has(controls.jump) && player.grounded) {
          player.vy = -JUMP_STRENGTH;
          player.grounded = false;
        }

        // Gravity
        player.vy += GRAVITY;
        
        // Update position
        player.x += player.vx;
        player.y += player.vy;

        // Collision with tiles
        player.grounded = false;
        state.tiles.forEach(tile => {
          const tileSize = 32;
          if (
            player.x + player.width > tile.x &&
            player.x < tile.x + tileSize &&
            player.y + player.height >= tile.y &&
            player.y + player.height <= tile.y + 20 &&
            player.vy >= 0
          ) {
            player.y = tile.y - player.height;
            player.vy = 0;
            player.grounded = true;
          }
        });

        // Bounds
        player.x = Math.max(0, Math.min(state.levelWidth - player.width, player.x));
        if (player.y > state.levelHeight) {
          player.y = 100;
          player.x = 100;
          player.vy = 0;
        }

        // Collect items
        state.items.forEach(item => {
          if (!item.collected &&
              Math.abs(player.x - item.x) < 30 &&
              Math.abs(player.y - item.y) < 30) {
            item.collected = true;
            state.score += 10;
          }
        });
      });

      // Update enemies
      state.enemies.forEach(enemy => {
        enemy.x += enemy.vx;

        // Bounce off level bounds
        if (enemy.x < 0 || enemy.x > state.levelWidth - enemy.width) {
          enemy.vx *= -1;
        }

        // Track nearest player
        if (enemy.type === 'demogorgon' || enemy.type === 'vecna') {
          const nearestPlayer = state.players[0];
          if (nearestPlayer && Math.abs(nearestPlayer.x - enemy.x) < 300) {
            enemy.vx = nearestPlayer.x > enemy.x ? 1.5 : -1.5;
          }
        }
      });

      // Camera follows player 1
      if (state.players[0]) {
        state.camera.x = Math.max(0, Math.min(
          state.levelWidth - 800,
          state.players[0].x - 400
        ));
        state.camera.y = Math.max(0, Math.min(
          state.levelHeight - 600,
          state.players[0].y - 300
        ));
      }

      // Render
      render(ctx, canvas.width, canvas.height);

      animationId = requestAnimationFrame(gameLoop);
    };

    const render = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
      // Background
      const bgColors = {
        town: '#87CEEB',
        forest: '#2F4F2F',
        'upside-down': '#1a0033',
      };
      ctx.fillStyle = bgColors[state.currentArea];
      ctx.fillRect(0, 0, width, height);

      // Draw tiles
      state.tiles.forEach(tile => {
        if (tile.x > state.camera.x - 64 && tile.x < state.camera.x + width + 64) {
          drawTile(ctx, tile, state.camera.x, state.camera.y);
        }
      });

      // Draw items
      state.items.forEach(item => {
        if (!item.collected) {
          const screenX = item.x - state.camera.x;
          const screenY = item.y - state.camera.y;
          
          const emojis: {[key: string]: string} = {
            flashlight: '🔦',
            walkie: '📻',
            eggo: '🧇',
          };
          
          ctx.font = '24px Arial';
          ctx.fillText(emojis[item.type] || '⭐', screenX, screenY);
        }
      });

      // Draw enemies
      state.enemies.forEach(enemy => {
        if (enemy.x > state.camera.x - 64 && enemy.x < state.camera.x + width + 64) {
          drawEnemy(ctx, enemy, state.camera.x, state.camera.y);
        }
      });

      // Draw players
      state.players.forEach(player => {
        drawPlayer(ctx, player, state.camera.x, state.camera.y);
      });

      // UI
      ctx.fillStyle = 'rgba(0,0,0,0.7)';
      ctx.fillRect(0, 0, 200, 100);
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 14px monospace';
      ctx.textAlign = 'left';
      ctx.fillText(`SCORE: ${state.score}`, 10, 25);
      ctx.fillText(`AREA: ${state.currentArea.toUpperCase()}`, 10, 45);
      ctx.fillText(`POS: ${Math.floor(state.players[0]?.x || 0)}`, 10, 65);
      ctx.fillText(`ITEMS: ${state.items.filter(i => !i.collected).length}`, 10, 85);

      // Controls
      ctx.font = '10px monospace';
      ctx.fillText('P1: WASD', 10, height - 30);
      if (multiplayer) {
        ctx.fillText('P2: ARROWS', 10, height - 15);
      }
    };

    animationId = requestAnimationFrame(gameLoop);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [gameStarted, multiplayer]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-red-900 via-black to-purple-900 p-8">
      <h1 className="text-5xl font-bold text-white mb-4 font-mono">WEIRD STUFF</h1>
      <p className="text-xl text-gray-300 mb-8">A Hawkthorne-Style Platformer</p>

      {!gameStarted ? (
        <div className="text-center">
          <div className="bg-black bg-opacity-90 border-4 border-cyan-400 rounded-lg p-8 mb-4">
            <h2 className="text-2xl font-bold text-cyan-400 mb-4 font-mono">SELECT MODE</h2>
            <div className="flex gap-4 justify-center mb-6">
              <button
                onClick={() => initGame(false)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded text-xl font-mono border-4 border-blue-400"
              >
                1 PLAYER
              </button>
              <button
                onClick={() => initGame(true)}
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-8 rounded text-xl font-mono border-4 border-purple-400"
              >
                2 PLAYERS
              </button>
            </div>
            <div className="text-left text-cyan-300 text-sm font-mono space-y-2">
              <p>▸ EXPLORE: Hawkins → Forest → Upside Down</p>
              <p>▸ ENEMIES: Demodogs, Demogorgon, Vecna</p>
              <p>▸ GOAL: Collect items & defeat enemies</p>
            </div>
          </div>
        </div>
      ) : (
        <canvas
          ref={canvasRef}
          width={800}
          height={600}
          className="border-4 border-cyan-400 rounded-lg shadow-2xl bg-black"
        />
      )}
    </div>
  );
}
