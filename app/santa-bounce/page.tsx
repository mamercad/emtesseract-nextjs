'use client';

import React, { useState, useEffect, useRef } from 'react';

export default function SantaPresentGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const gameStateRef = useRef({
    paddle: { x: 300, y: 520, width: 100, height: 15 },
    presents: [] as Array<{x: number; y: number; vx: number; vy: number; width: number; height: number}>,
    chimneys: [] as Array<{x: number; y: number; width: number; height: number}>,
    santa: { x: 100, y: 50 },
    santaDirection: 1,
    nextPresentTime: 0,
    missedPresents: 0
  });

  useEffect(() => {
    if (!gameStarted) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let animationId: number;
    let lastTime = 0;

    const state = gameStateRef.current;

    // Initialize chimneys
    state.chimneys = [
      { x: 100, y: 450, width: 40, height: 70 },
      { x: 300, y: 450, width: 40, height: 70 },
      { x: 500, y: 450, width: 40, height: 70 }
    ];

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      state.paddle.x = Math.max(0, Math.min(canvas.width - state.paddle.width, x - state.paddle.width / 2));
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const rect = canvas.getBoundingClientRect();
      const x = e.touches[0].clientX - rect.left;
      state.paddle.x = Math.max(0, Math.min(canvas.width - state.paddle.width, x - state.paddle.width / 2));
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false });

    const gameLoop = (timestamp: number) => {
      const dt = timestamp - lastTime;
      lastTime = timestamp;

      // Clear canvas
      ctx.fillStyle = '#1a1a2e';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw stars
      ctx.fillStyle = '#ffffff';
      for (let i = 0; i < 50; i++) {
        const x = (i * 137) % canvas.width;
        const y = (i * 219) % 400;
        ctx.fillRect(x, y, 2, 2);
      }

      // Move Santa
      state.santa.x += state.santaDirection * 2;
      if (state.santa.x > canvas.width - 60 || state.santa.x < 0) {
        state.santaDirection *= -1;
      }

      // Draw Santa's sleigh
      ctx.fillStyle = '#8B4513';
      ctx.fillRect(state.santa.x, state.santa.y + 20, 60, 20);
      ctx.fillStyle = '#ff0000';
      ctx.fillRect(state.santa.x + 10, state.santa.y + 15, 40, 15);
      
      // Santa
      ctx.fillStyle = '#ffdbac';
      ctx.beginPath();
      ctx.arc(state.santa.x + 30, state.santa.y + 10, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ff0000';
      ctx.fillRect(state.santa.x + 26, state.santa.y + 5, 8, 5);

      // Drop presents
      if (timestamp > state.nextPresentTime) {
        state.presents.push({
          x: state.santa.x + 30,
          y: state.santa.y + 40,
          vx: state.santaDirection * 1,
          vy: 0,
          width: 20,
          height: 20
        });
        state.nextPresentTime = timestamp + 1500;
      }

      // Draw and update presents
      for (let i = state.presents.length - 1; i >= 0; i--) {
        const p = state.presents[i];
        p.vy += 0.5; // gravity
        p.x += p.vx;
        p.y += p.vy;

        // Check paddle collision
        if (p.vy > 0 && 
            p.y + p.height >= state.paddle.y &&
            p.y + p.height <= state.paddle.y + 20 &&
            p.x + p.width > state.paddle.x &&
            p.x < state.paddle.x + state.paddle.width) {
          p.vy = -Math.abs(p.vy) * 0.8;
          p.vx = ((p.x + p.width/2) - (state.paddle.x + state.paddle.width/2)) * 0.2;
        }

        // Check chimney collision
        for (const chimney of state.chimneys) {
          if (p.y + p.height >= chimney.y &&
              p.y < chimney.y + 20 &&
              p.x + p.width > chimney.x &&
              p.x < chimney.x + chimney.width) {
            state.presents.splice(i, 1);
            setScore(s => s + 10);
            break;
          }
        }

        // Remove if off screen
        if (p.y > canvas.height) {
          state.presents.splice(i, 1);
          state.missedPresents++;
          if (state.missedPresents >= 5) {
            setGameOver(true);
            cancelAnimationFrame(animationId);
            return;
          }
        }

        // Draw present
        ctx.fillStyle = '#ff0000';
        ctx.fillRect(p.x, p.y, p.width, p.height);
        ctx.fillStyle = '#ffd700';
        ctx.fillRect(p.x + 8, p.y, 4, p.height);
        ctx.fillRect(p.x, p.y + 8, p.width, 4);
      }

      // Draw chimneys
      for (const chimney of state.chimneys) {
        // House
        ctx.fillStyle = '#8B4513';
        ctx.fillRect(chimney.x - 30, chimney.y + 30, 100, 90);
        
        // Roof
        ctx.fillStyle = '#654321';
        ctx.beginPath();
        ctx.moveTo(chimney.x - 35, chimney.y + 30);
        ctx.lineTo(chimney.x + 20, chimney.y);
        ctx.lineTo(chimney.x + 75, chimney.y + 30);
        ctx.closePath();
        ctx.fill();
        
        // Chimney
        ctx.fillStyle = '#8B0000';
        ctx.fillRect(chimney.x, chimney.y, chimney.width, chimney.height);
        ctx.fillStyle = '#A52A2A';
        ctx.fillRect(chimney.x, chimney.y, chimney.width, 5);
      }

      // Draw paddle
      ctx.fillStyle = '#4CAF50';
      ctx.fillRect(state.paddle.x, state.paddle.y, state.paddle.width, state.paddle.height);
      ctx.fillStyle = '#45a049';
      ctx.fillRect(state.paddle.x, state.paddle.y, state.paddle.width, 5);

      // Draw score
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 20px Arial';
      ctx.fillText(`Score: ${score}`, 10, 30);
      ctx.fillText(`Missed: ${state.missedPresents}/5`, canvas.width - 120, 30);

      animationId = requestAnimationFrame(gameLoop);
    };

    animationId = requestAnimationFrame(gameLoop);

    return () => {
      cancelAnimationFrame(animationId);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('touchmove', handleTouchMove);
    };
  }, [gameStarted, score]);

  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    gameStateRef.current.presents = [];
    gameStateRef.current.missedPresents = 0;
    gameStateRef.current.nextPresentTime = 0;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-900 to-blue-700 p-4">
      <h1 className="text-4xl font-bold text-white mb-4">🎅 Santa&apos;s Present Bounce 🎁</h1>
      
      {!gameStarted ? (
        <div className="text-center">
          <div className="bg-white rounded-lg p-8 mb-4 shadow-lg">
            <h2 className="text-2xl font-bold mb-4">How to Play</h2>
            <p className="mb-2">Move your paddle to bounce presents into chimneys!</p>
            <p className="mb-2">Each successful delivery = 10 points</p>
            <p className="mb-4">Don&apos;t miss more than 5 presents!</p>
          </div>
          <button
            onClick={startGame}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full text-xl shadow-lg transition-colors"
          >
            Start Game
          </button>
        </div>
      ) : (
        <>
          <canvas
            ref={canvasRef}
            width={640}
            height={560}
            className="border-4 border-white rounded-lg shadow-2xl mb-4"
          />
          
          {gameOver && (
            <div className="text-center">
              <div className="bg-white rounded-lg p-8 mb-4 shadow-lg">
                <h2 className="text-3xl font-bold text-red-600 mb-2">Game Over!</h2>
                <p className="text-xl mb-4">Final Score: {score}</p>
              </div>
              <button
                onClick={startGame}
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full text-xl shadow-lg transition-colors"
              >
                Play Again
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
