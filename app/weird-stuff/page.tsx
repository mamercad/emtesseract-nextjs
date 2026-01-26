'use client';

import React, { useState, useEffect, useRef } from 'react';

interface Character {
  id: string;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  vx: number;
  vy: number;
  color: string;
  emoji: string;
  grounded: boolean;
  active: boolean;
}

interface Enemy {
  id: string;
  type: 'demogorgon' | 'demodog' | 'vecna';
  x: number;
  y: number;
  width: number;
  height: number;
  vx: number;
  emoji: string;
  health: number;
}

interface Platform {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
}

type Area = 'town' | 'forest' | 'upside-down';

export default function WeirdStuffGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [victory, setVictory] = useState(false);
  const [currentArea, setCurrentArea] = useState<Area>('town');
  const [score, setScore] = useState(0);
  const [multiplayer, setMultiplayer] = useState(false);

  const gameStateRef = useRef({
    characters: [] as Character[],
    enemies: [] as Enemy[],
    platforms: [] as Platform[],
    keys: new Set<string>(),
    items: [] as {x: number; y: number; type: string; emoji: string}[],
    camera: { x: 0, y: 0 },
    gravity: 0.5,
    jumpStrength: 12,
    moveSpeed: 5,
    gateHealth: 100,
  });

  const initializeGame = (isMultiplayer: boolean) => {
    const state = gameStateRef.current;
    
    // Initialize characters (Stranger Things kids)
    state.characters = [
      {
        id: 'mike',
        name: 'Mike',
        x: 100,
        y: 300,
        width: 24,
        height: 32,
        vx: 0,
        vy: 0,
        color: '#4169E1',
        emoji: '🎮',
        grounded: false,
        active: true,
      }
    ];

    if (isMultiplayer) {
      state.characters.push({
        id: 'eleven',
        name: 'Eleven',
        x: 150,
        y: 300,
        width: 24,
        height: 32,
        vx: 0,
        vy: 0,
        color: '#FFB6C1',
        emoji: '⚡',
        grounded: false,
        active: true,
      });
    }

    // Initialize platforms based on current area
    loadArea('town');
    
    setMultiplayer(isMultiplayer);
    setGameStarted(true);
    setGameOver(false);
    setVictory(false);
    setScore(0);
  };

  const loadArea = (area: Area) => {
    const state = gameStateRef.current;
    setCurrentArea(area);

    // Clear existing entities
    state.platforms = [];
    state.enemies = [];
    state.items = [];

    if (area === 'town') {
      // Hawkins town platforms
      state.platforms = [
        { x: 0, y: 500, width: 800, height: 20, color: '#8B4513' }, // Ground
        { x: 200, y: 400, width: 150, height: 20, color: '#696969' }, // Building
        { x: 450, y: 350, width: 120, height: 20, color: '#696969' },
        { x: 650, y: 300, width: 100, height: 20, color: '#696969' },
      ];

      state.enemies = [
        { id: 'dd1', type: 'demodog', x: 350, y: 460, width: 32, height: 24, vx: 2, emoji: '🐺', health: 2 },
        { id: 'dd2', type: 'demodog', x: 600, y: 460, width: 32, height: 24, vx: -2, emoji: '🐺', health: 2 },
      ];

      state.items = [
        { x: 300, y: 350, type: 'flashlight', emoji: '🔦' },
        { x: 500, y: 300, type: 'walkie', emoji: '📻' },
      ];
    } else if (area === 'forest') {
      // Forest area
      state.platforms = [
        { x: 0, y: 500, width: 800, height: 20, color: '#228B22' }, // Ground
        { x: 150, y: 420, width: 100, height: 15, color: '#8B4513' }, // Tree branch
        { x: 350, y: 380, width: 120, height: 15, color: '#8B4513' },
        { x: 550, y: 340, width: 100, height: 15, color: '#8B4513' },
        { x: 700, y: 280, width: 100, height: 15, color: '#8B4513' },
      ];

      state.enemies = [
        { id: 'dg1', type: 'demogorgon', x: 400, y: 440, width: 40, height: 48, vx: 1.5, emoji: '👹', health: 5 },
        { id: 'dd3', type: 'demodog', x: 200, y: 460, width: 32, height: 24, vx: 2, emoji: '🐺', health: 2 },
      ];

      state.items = [
        { x: 250, y: 370, type: 'eggo', emoji: '🧇' },
        { x: 650, y: 230, type: 'bat', emoji: '🏏' },
      ];
    } else if (area === 'upside-down') {
      // Upside Down - final area
      state.platforms = [
        { x: 0, y: 500, width: 800, height: 20, color: '#1a0033' }, // Dark ground
        { x: 100, y: 450, width: 120, height: 15, color: '#2d004d' },
        { x: 300, y: 400, width: 140, height: 15, color: '#2d004d' },
        { x: 500, y: 350, width: 120, height: 15, color: '#2d004d' },
        { x: 650, y: 280, width: 150, height: 15, color: '#2d004d' }, // Gate platform
      ];

      state.enemies = [
        { id: 'vecna', type: 'vecna', x: 700, y: 220, width: 48, height: 60, vx: 0, emoji: '💀', health: 10 },
        { id: 'dg2', type: 'demogorgon', x: 300, y: 360, width: 40, height: 48, vx: 2, emoji: '👹', health: 5 },
        { id: 'dd4', type: 'demodog', x: 500, y: 460, width: 32, height: 24, vx: -2, emoji: '🐺', health: 2 },
      ];

      // Gate to close (target)
      state.items = [
        { x: 750, y: 230, type: 'gate', emoji: '🚪' },
      ];
    }
  };

  useEffect(() => {
    if (!gameStarted || gameOver || victory) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const state = gameStateRef.current;
    let animationId: number;

    // Keyboard input
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
      updateGame();
      
      // Render
      renderGame(ctx, canvas.width, canvas.height);

      animationId = requestAnimationFrame(gameLoop);
    };

    const updateGame = () => {
      const dt = 1 / 60;

      // Update characters
      state.characters.forEach((char, idx) => {
        if (!char.active) return;

        // Movement input (Player 1: WASD, Player 2: Arrow keys)
        const leftKey = idx === 0 ? 'a' : 'arrowleft';
        const rightKey = idx === 0 ? 'd' : 'arrowright';
        const jumpKey = idx === 0 ? 'w' : 'arrowup';

        char.vx = 0;
        if (state.keys.has(leftKey)) char.vx = -state.moveSpeed;
        if (state.keys.has(rightKey)) char.vx = state.moveSpeed;
        if (state.keys.has(jumpKey) && char.grounded) {
          char.vy = -state.jumpStrength;
          char.grounded = false;
        }

        // Apply gravity
        char.vy += state.gravity;

        // Update position
        char.x += char.vx;
        char.y += char.vy;

        // Platform collision
        char.grounded = false;
        state.platforms.forEach(platform => {
          if (char.x + char.width > platform.x &&
              char.x < platform.x + platform.width &&
              char.y + char.height >= platform.y &&
              char.y + char.height <= platform.y + 20 &&
              char.vy >= 0) {
            char.y = platform.y - char.height;
            char.vy = 0;
            char.grounded = true;
          }
        });

        // Bounds
        char.x = Math.max(0, Math.min(800 - char.width, char.x));
        if (char.y > 600) {
          // Fell off - respawn
          char.x = 100;
          char.y = 300;
          char.vy = 0;
        }

        // Item collection
        state.items = state.items.filter(item => {
          const collected = Math.abs(char.x - item.x) < 30 && Math.abs(char.y - item.y) < 30;
          if (collected) {
            setScore(s => s + 10);
            if (item.type === 'gate' && currentArea === 'upside-down') {
              // Beat the game!
              setVictory(true);
            }
          }
          return !collected;
        });
      });

      // Update enemies
      state.enemies.forEach(enemy => {
        enemy.x += enemy.vx;

        // Bounce off walls
        if (enemy.x < 0 || enemy.x + enemy.width > 800) {
          enemy.vx *= -1;
        }

        // Simple AI: move towards nearest character
        if (enemy.type === 'vecna' || enemy.type === 'demogorgon') {
          const nearestChar = state.characters.find(c => c.active);
          if (nearestChar) {
            const dx = nearestChar.x - enemy.x;
            if (Math.abs(dx) < 200) {
              enemy.vx = dx > 0 ? 1 : -1;
            }
          }
        }

        // Check collision with characters
        state.characters.forEach(char => {
          if (!char.active) return;
          if (Math.abs(char.x - enemy.x) < 30 && Math.abs(char.y - enemy.y) < 30) {
            // Hit enemy - for now, just bounce back
            char.vx = char.x < enemy.x ? -10 : 10;
            setScore(s => Math.max(0, s - 5));
          }
        });
      });

      // Check for area completion
      if (state.items.length === 0 && state.enemies.length === 0 && currentArea !== 'upside-down') {
        // Move to next area
        if (currentArea === 'town') {
          loadArea('forest');
        } else if (currentArea === 'forest') {
          loadArea('upside-down');
        }
      }
    };

    const renderGame = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
      // Background
      const bgColors = {
        town: '#87CEEB',
        forest: '#2F4F2F',
        'upside-down': '#0a0015',
      };
      ctx.fillStyle = bgColors[currentArea];
      ctx.fillRect(0, 0, width, height);

      // Area label
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 16px Arial';
      ctx.textAlign = 'center';
      const areaNames = {
        town: 'Hawkins Town',
        forest: 'The Forest',
        'upside-down': 'The Upside Down',
      };
      ctx.fillText(areaNames[currentArea], width / 2, 30);

      // Platforms
      state.platforms.forEach(platform => {
        ctx.fillStyle = platform.color;
        ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
      });

      // Items
      state.items.forEach(item => {
        ctx.font = '24px Arial';
        ctx.fillText(item.emoji, item.x, item.y);
      });

      // Enemies
      state.enemies.forEach(enemy => {
        ctx.font = '32px Arial';
        ctx.fillText(enemy.emoji, enemy.x, enemy.y + enemy.height);
        
        // Health bar
        ctx.fillStyle = '#ff0000';
        ctx.fillRect(enemy.x, enemy.y - 10, enemy.width, 5);
        ctx.fillStyle = '#00ff00';
        ctx.fillRect(enemy.x, enemy.y - 10, enemy.width * (enemy.health / 10), 5);
      });

      // Characters
      state.characters.forEach(char => {
        if (!char.active) return;

        // Character body
        ctx.fillStyle = char.color;
        ctx.fillRect(char.x, char.y, char.width, char.height);

        // Character emoji
        ctx.font = '24px Arial';
        ctx.fillText(char.emoji, char.x, char.y - 5);

        // Name tag
        ctx.fillStyle = '#fff';
        ctx.font = '10px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(char.name, char.x + char.width / 2, char.y - 15);
      });

      // UI
      ctx.textAlign = 'left';
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 14px Arial';
      ctx.fillText(`Score: ${score}`, 10, 60);
      ctx.fillText(`Items: ${state.items.length}`, 10, 80);
      ctx.fillText(`Enemies: ${state.enemies.length}`, 10, 100);

      // Controls
      ctx.font = '11px Arial';
      ctx.fillText('Player 1: WASD', 10, height - 40);
      if (multiplayer) {
        ctx.fillText('Player 2: Arrow Keys', 10, height - 20);
      }
    };

    animationId = requestAnimationFrame(gameLoop);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [gameStarted, gameOver, victory, score, currentArea, multiplayer]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-red-900 via-black to-purple-900 p-8">
      <h1 className="text-5xl font-bold text-white mb-4">🎮 Weird Stuff 👾</h1>
      <p className="text-xl text-gray-300 mb-8">A Hawkthorne-Style Adventure</p>

      {!gameStarted ? (
        <div className="text-center">
          <div className="bg-black bg-opacity-70 rounded-lg p-8 mb-4 border-4 border-red-600">
            <h2 className="text-2xl font-bold text-white mb-4">Welcome to Hawkins!</h2>
            <p className="text-gray-300 mb-4">Choose your adventure mode:</p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => initializeGame(false)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-xl"
              >
                🎮 Single Player
              </button>
              <button
                onClick={() => initializeGame(true)}
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg text-xl"
              >
                👥 Local Co-op
              </button>
            </div>
            <div className="mt-6 text-left text-gray-400 text-sm">
              <p className="mb-2">🎯 <strong>Goal:</strong> Defeat enemies, collect items, close the gate!</p>
              <p className="mb-2">🗺️ <strong>Areas:</strong> Hawkins Town → Forest → Upside Down</p>
              <p>👾 <strong>Enemies:</strong> Demodogs, Demogorgon, Vecna</p>
            </div>
          </div>
        </div>
      ) : (
        <>
          <canvas
            ref={canvasRef}
            width={800}
            height={600}
            className="border-4 border-red-600 rounded-lg shadow-2xl mb-4 bg-black"
          />

          {(gameOver || victory) && (
            <div className="text-center bg-black bg-opacity-90 p-8 rounded-lg border-4 border-red-600">
              <h2 className="text-3xl font-bold mb-4" style={{ color: victory ? '#00ff00' : '#ff0000' }}>
                {victory ? '🎉 Victory!' : '💀 Game Over'}
              </h2>
              <p className="text-xl text-white mb-4">Final Score: {score}</p>
              <button
                onClick={() => initializeGame(multiplayer)}
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg text-xl"
              >
                🔄 Play Again
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
