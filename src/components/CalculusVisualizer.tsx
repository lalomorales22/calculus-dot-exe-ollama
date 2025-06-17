import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Settings, Eye, TrendingUp, Circle, Waves } from 'lucide-react';

interface Point {
  x: number;
  y: number;
}

interface VisualizerProps {
  width?: number;
  height?: number;
}

const CalculusVisualizer: React.FC<VisualizerProps> = ({ 
  width = 600, 
  height = 400 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  
  // State for different visualization modes
  const [mode, setMode] = useState<'derivative' | 'limit' | 'tangent' | 'circle' | 'wave'>('derivative');
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationTime, setAnimationTime] = useState(0);
  
  // Interactive parameters
  const [xValue, setXValue] = useState(2);
  const [hValue, setHValue] = useState(1);
  const [amplitude, setAmplitude] = useState(1);
  const [frequency, setFrequency] = useState(1);
  const [phase, setPhase] = useState(0);
  
  // Canvas setup
  const setupCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;
    
    // Set canvas size
    canvas.width = width;
    canvas.height = height;
    
    // Set up coordinate system
    ctx.translate(width / 2, height / 2);
    ctx.scale(1, -1); // Flip Y axis for mathematical coordinates
    
    return ctx;
  };

  // Mathematical functions
  const f = (x: number) => 0.1 * x * x * x - 0.5 * x * x + x + 1;
  const fPrime = (x: number) => 0.3 * x * x - x + 1;
  const sinWave = (x: number) => amplitude * Math.sin(frequency * x + phase);
  const cosWave = (x: number) => amplitude * Math.cos(frequency * x + phase);

  // Drawing utilities
  const drawGrid = (ctx: CanvasRenderingContext2D) => {
    ctx.strokeStyle = '#1e40af';
    ctx.lineWidth = 1;
    ctx.globalAlpha = 0.3;
    
    // Vertical lines
    for (let x = -width/2; x <= width/2; x += 20) {
      ctx.beginPath();
      ctx.moveTo(x, -height/2);
      ctx.lineTo(x, height/2);
      ctx.stroke();
    }
    
    // Horizontal lines
    for (let y = -height/2; y <= height/2; y += 20) {
      ctx.beginPath();
      ctx.moveTo(-width/2, y);
      ctx.lineTo(width/2, y);
      ctx.stroke();
    }
    
    ctx.globalAlpha = 1;
  };

  const drawAxes = (ctx: CanvasRenderingContext2D) => {
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 2;
    
    // X-axis
    ctx.beginPath();
    ctx.moveTo(-width/2, 0);
    ctx.lineTo(width/2, 0);
    ctx.stroke();
    
    // Y-axis
    ctx.beginPath();
    ctx.moveTo(0, -height/2);
    ctx.lineTo(0, height/2);
    ctx.stroke();
    
    // Axis labels
    ctx.fillStyle = '#60a5fa';
    ctx.font = '12px JetBrains Mono';
    ctx.scale(1, -1); // Flip text back
    ctx.fillText('x', width/2 - 20, 15);
    ctx.fillText('y', 10, -height/2 + 20);
    ctx.scale(1, -1); // Flip back
  };

  const drawFunction = (ctx: CanvasRenderingContext2D, func: (x: number) => number, color: string, lineWidth: number = 2) => {
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.beginPath();
    
    let started = false;
    for (let px = -width/2; px <= width/2; px += 2) {
      const x = px / 20; // Scale to mathematical coordinates
      const y = func(x) * 20; // Scale to canvas coordinates
      
      if (Math.abs(y) < height/2) {
        if (!started) {
          ctx.moveTo(px, y);
          started = true;
        } else {
          ctx.lineTo(px, y);
        }
      } else {
        started = false;
      }
    }
    ctx.stroke();
  };

  const drawPoint = (ctx: CanvasRenderingContext2D, x: number, y: number, color: string, size: number = 4) => {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x * 20, y * 20, size, 0, 2 * Math.PI);
    ctx.fill();
  };

  const drawLine = (ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number, color: string, lineWidth: number = 2) => {
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.beginPath();
    ctx.moveTo(x1 * 20, y1 * 20);
    ctx.lineTo(x2 * 20, y2 * 20);
    ctx.stroke();
  };

  // Visualization modes
  const drawDerivativeVisualization = (ctx: CanvasRenderingContext2D) => {
    // Draw original function
    drawFunction(ctx, f, '#10b981', 3);
    
    // Draw derivative function
    drawFunction(ctx, fPrime, '#f59e0b', 2);
    
    // Draw point on original function
    const y = f(xValue);
    drawPoint(ctx, xValue, y, '#ef4444', 6);
    
    // Draw tangent line
    const slope = fPrime(xValue);
    const x1 = xValue - 2;
    const x2 = xValue + 2;
    const y1 = y + slope * (x1 - xValue);
    const y2 = y + slope * (x2 - xValue);
    drawLine(ctx, x1, y1, x2, y2, '#ef4444', 2);
    
    // Draw slope indicator
    ctx.fillStyle = '#ef4444';
    ctx.font = '14px JetBrains Mono';
    ctx.scale(1, -1);
    ctx.fillText(`f'(${xValue.toFixed(1)}) = ${slope.toFixed(2)}`, -width/2 + 20, height/2 - 30);
    ctx.scale(1, -1);
  };

  const drawLimitVisualization = (ctx: CanvasRenderingContext2D) => {
    // Draw function
    drawFunction(ctx, f, '#10b981', 3);
    
    // Draw approaching point
    const approachX = xValue + hValue * Math.cos(animationTime);
    const approachY = f(approachX);
    drawPoint(ctx, approachX, approachY, '#f59e0b', 5);
    
    // Draw target point
    const targetY = f(xValue);
    drawPoint(ctx, xValue, targetY, '#ef4444', 6);
    
    // Draw secant line
    if (Math.abs(hValue) > 0.01) {
      const slope = (f(approachX) - f(xValue)) / (approachX - xValue);
      const x1 = Math.min(xValue, approachX) - 1;
      const x2 = Math.max(xValue, approachX) + 1;
      const y1 = targetY + slope * (x1 - xValue);
      const y2 = targetY + slope * (x2 - xValue);
      drawLine(ctx, x1, y1, x2, y2, '#8b5cf6', 2);
    }
    
    // Display limit info
    ctx.fillStyle = '#60a5fa';
    ctx.font = '12px JetBrains Mono';
    ctx.scale(1, -1);
    ctx.fillText(`h = ${hValue.toFixed(3)}`, -width/2 + 20, height/2 - 30);
    ctx.fillText(`lim as h→0: ${fPrime(xValue).toFixed(3)}`, -width/2 + 20, height/2 - 50);
    ctx.scale(1, -1);
  };

  const drawTangentVisualization = (ctx: CanvasRenderingContext2D) => {
    // Draw function
    drawFunction(ctx, f, '#10b981', 3);
    
    // Draw multiple secant lines approaching tangent
    const baseX = xValue;
    const baseY = f(baseX);
    
    for (let i = 1; i <= 5; i++) {
      const h = hValue * i / 5;
      const secantX = baseX + h;
      const secantY = f(secantX);
      
      if (Math.abs(h) > 0.01) {
        const slope = (secantY - baseY) / h;
        const x1 = baseX - 2;
        const x2 = baseX + 2;
        const y1 = baseY + slope * (x1 - baseX);
        const y2 = baseY + slope * (x2 - baseX);
        
        const alpha = i / 5;
        ctx.globalAlpha = alpha * 0.7;
        drawLine(ctx, x1, y1, x2, y2, '#8b5cf6', 1);
      }
    }
    
    ctx.globalAlpha = 1;
    
    // Draw final tangent line
    const slope = fPrime(baseX);
    const x1 = baseX - 2;
    const x2 = baseX + 2;
    const y1 = baseY + slope * (x1 - baseX);
    const y2 = baseY + slope * (x2 - baseX);
    drawLine(ctx, x1, y1, x2, y2, '#ef4444', 3);
    
    drawPoint(ctx, baseX, baseY, '#ef4444', 6);
  };

  const drawCircleVisualization = (ctx: CanvasRenderingContext2D) => {
    const radius = 100;
    const angle = animationTime;
    
    // Draw unit circle
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.stroke();
    
    // Draw angle line
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);
    drawLine(ctx, 0, 0, x/20, y/20, '#ef4444', 2);
    
    // Draw point on circle
    drawPoint(ctx, x/20, y/20, '#ef4444', 6);
    
    // Draw projections
    drawLine(ctx, x/20, 0, x/20, y/20, '#f59e0b', 2); // sin
    drawLine(ctx, 0, 0, x/20, 0, '#8b5cf6', 2); // cos
    
    // Labels
    ctx.fillStyle = '#60a5fa';
    ctx.font = '12px JetBrains Mono';
    ctx.scale(1, -1);
    ctx.fillText(`θ = ${angle.toFixed(2)}`, -width/2 + 20, height/2 - 30);
    ctx.fillText(`sin(θ) = ${Math.sin(angle).toFixed(3)}`, -width/2 + 20, height/2 - 50);
    ctx.fillText(`cos(θ) = ${Math.cos(angle).toFixed(3)}`, -width/2 + 20, height/2 - 70);
    ctx.scale(1, -1);
  };

  const drawWaveVisualization = (ctx: CanvasRenderingContext2D) => {
    // Draw sine wave
    drawFunction(ctx, sinWave, '#ef4444', 3);
    
    // Draw cosine wave
    drawFunction(ctx, cosWave, '#10b981', 3);
    
    // Draw moving point on sine wave
    const currentX = animationTime;
    const sineY = sinWave(currentX);
    const cosineY = cosWave(currentX);
    
    drawPoint(ctx, currentX, sineY, '#ef4444', 6);
    drawPoint(ctx, currentX, cosineY, '#10b981', 6);
    
    // Draw vertical line
    drawLine(ctx, currentX, -height/40, currentX, height/40, '#60a5fa', 1);
    
    // Labels
    ctx.fillStyle = '#60a5fa';
    ctx.font = '12px JetBrains Mono';
    ctx.scale(1, -1);
    ctx.fillText(`A = ${amplitude}`, -width/2 + 20, height/2 - 30);
    ctx.fillText(`f = ${frequency}`, -width/2 + 20, height/2 - 50);
    ctx.fillText(`φ = ${phase.toFixed(2)}`, -width/2 + 20, height/2 - 70);
    ctx.scale(1, -1);
  };

  // Main render function
  const render = () => {
    const ctx = setupCanvas();
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(-width/2, -height/2, width, height);
    
    // Draw background
    ctx.fillStyle = '#000000';
    ctx.fillRect(-width/2, -height/2, width, height);
    
    // Draw grid and axes
    drawGrid(ctx);
    drawAxes(ctx);
    
    // Draw based on current mode
    switch (mode) {
      case 'derivative':
        drawDerivativeVisualization(ctx);
        break;
      case 'limit':
        drawLimitVisualization(ctx);
        break;
      case 'tangent':
        drawTangentVisualization(ctx);
        break;
      case 'circle':
        drawCircleVisualization(ctx);
        break;
      case 'wave':
        drawWaveVisualization(ctx);
        break;
    }
  };

  // Animation loop
  useEffect(() => {
    if (isAnimating) {
      const animate = () => {
        setAnimationTime(prev => prev + 0.05);
        animationRef.current = requestAnimationFrame(animate);
      };
      animationRef.current = requestAnimationFrame(animate);
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isAnimating]);

  // Render when parameters change
  useEffect(() => {
    render();
  }, [mode, xValue, hValue, amplitude, frequency, phase, animationTime]);

  const resetAnimation = () => {
    setAnimationTime(0);
    setIsAnimating(false);
  };

  return (
    <div className="border-2 border-blue-500 bg-black p-4">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-white font-mono mb-3 border-l-4 border-blue-500 pl-3">
          INTERACTIVE CALCULUS VISUALIZER
        </h3>
        
        {/* Mode Selection */}
        <div className="flex flex-wrap gap-2 mb-4">
          <button
            onClick={() => setMode('derivative')}
            className={`px-3 py-1 border-2 font-mono text-xs transition-colors duration-200 ${
              mode === 'derivative' 
                ? 'border-blue-500 bg-blue-600 text-white' 
                : 'border-blue-500 bg-black text-blue-400 hover:bg-blue-950'
            }`}
          >
            <TrendingUp className="w-3 h-3 inline mr-1" />
            DERIVATIVE
          </button>
          <button
            onClick={() => setMode('limit')}
            className={`px-3 py-1 border-2 font-mono text-xs transition-colors duration-200 ${
              mode === 'limit' 
                ? 'border-blue-500 bg-blue-600 text-white' 
                : 'border-blue-500 bg-black text-blue-400 hover:bg-blue-950'
            }`}
          >
            <Eye className="w-3 h-3 inline mr-1" />
            LIMITS
          </button>
          <button
            onClick={() => setMode('tangent')}
            className={`px-3 py-1 border-2 font-mono text-xs transition-colors duration-200 ${
              mode === 'tangent' 
                ? 'border-blue-500 bg-blue-600 text-white' 
                : 'border-blue-500 bg-black text-blue-400 hover:bg-blue-950'
            }`}
          >
            <Settings className="w-3 h-3 inline mr-1" />
            TANGENT
          </button>
          <button
            onClick={() => setMode('circle')}
            className={`px-3 py-1 border-2 font-mono text-xs transition-colors duration-200 ${
              mode === 'circle' 
                ? 'border-blue-500 bg-blue-600 text-white' 
                : 'border-blue-500 bg-black text-blue-400 hover:bg-blue-950'
            }`}
          >
            <Circle className="w-3 h-3 inline mr-1" />
            UNIT CIRCLE
          </button>
          <button
            onClick={() => setMode('wave')}
            className={`px-3 py-1 border-2 font-mono text-xs transition-colors duration-200 ${
              mode === 'wave' 
                ? 'border-blue-500 bg-blue-600 text-white' 
                : 'border-blue-500 bg-black text-blue-400 hover:bg-blue-950'
            }`}
          >
            <Waves className="w-3 h-3 inline mr-1" />
            WAVES
          </button>
        </div>

        {/* Animation Controls */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setIsAnimating(!isAnimating)}
            className="px-3 py-1 border-2 border-green-500 bg-green-600 hover:bg-green-700 text-white font-mono text-xs transition-colors duration-200"
          >
            {isAnimating ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
          </button>
          <button
            onClick={resetAnimation}
            className="px-3 py-1 border-2 border-yellow-500 bg-yellow-600 hover:bg-yellow-700 text-white font-mono text-xs transition-colors duration-200"
          >
            <RotateCcw className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Canvas */}
      <div className="border-2 border-blue-700 bg-black mb-4">
        <canvas
          ref={canvasRef}
          className="block"
          style={{ imageRendering: 'pixelated' }}
        />
      </div>

      {/* Interactive Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {(mode === 'derivative' || mode === 'limit' || mode === 'tangent') && (
          <>
            <div>
              <label className="block text-xs font-bold text-blue-400 font-mono mb-1">
                X VALUE: {xValue.toFixed(2)}
              </label>
              <input
                type="range"
                min="-5"
                max="5"
                step="0.1"
                value={xValue}
                onChange={(e) => setXValue(parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-700 border-2 border-blue-500 appearance-none slider"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-blue-400 font-mono mb-1">
                H VALUE: {hValue.toFixed(3)}
              </label>
              <input
                type="range"
                min="0.001"
                max="2"
                step="0.001"
                value={hValue}
                onChange={(e) => setHValue(parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-700 border-2 border-blue-500 appearance-none slider"
              />
            </div>
          </>
        )}

        {mode === 'wave' && (
          <>
            <div>
              <label className="block text-xs font-bold text-blue-400 font-mono mb-1">
                AMPLITUDE: {amplitude.toFixed(2)}
              </label>
              <input
                type="range"
                min="0.1"
                max="3"
                step="0.1"
                value={amplitude}
                onChange={(e) => setAmplitude(parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-700 border-2 border-blue-500 appearance-none slider"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-blue-400 font-mono mb-1">
                FREQUENCY: {frequency.toFixed(2)}
              </label>
              <input
                type="range"
                min="0.1"
                max="3"
                step="0.1"
                value={frequency}
                onChange={(e) => setFrequency(parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-700 border-2 border-blue-500 appearance-none slider"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-blue-400 font-mono mb-1">
                PHASE: {phase.toFixed(2)}
              </label>
              <input
                type="range"
                min="0"
                max="6.28"
                step="0.1"
                value={phase}
                onChange={(e) => setPhase(parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-700 border-2 border-blue-500 appearance-none slider"
              />
            </div>
          </>
        )}
      </div>

      {/* Legend */}
      <div className="mt-4 p-3 border-2 border-blue-700 bg-blue-950">
        <h4 className="text-sm font-bold text-blue-400 font-mono mb-2">LEGEND:</h4>
        <div className="grid grid-cols-2 gap-2 text-xs font-mono">
          {mode === 'derivative' && (
            <>
              <div className="flex items-center">
                <div className="w-4 h-1 bg-green-500 mr-2"></div>
                <span className="text-green-400">f(x) = 0.1x³ - 0.5x² + x + 1</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-1 bg-yellow-500 mr-2"></div>
                <span className="text-yellow-400">f'(x) = 0.3x² - x + 1</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                <span className="text-red-400">Point & Tangent Line</span>
              </div>
            </>
          )}
          {mode === 'limit' && (
            <>
              <div className="flex items-center">
                <div className="w-4 h-1 bg-green-500 mr-2"></div>
                <span className="text-green-400">Function f(x)</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                <span className="text-yellow-400">Approaching Point</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-1 bg-purple-500 mr-2"></div>
                <span className="text-purple-400">Secant Line</span>
              </div>
            </>
          )}
          {mode === 'circle' && (
            <>
              <div className="flex items-center">
                <div className="w-4 h-1 bg-red-500 mr-2"></div>
                <span className="text-red-400">sin(θ)</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-1 bg-purple-500 mr-2"></div>
                <span className="text-purple-400">cos(θ)</span>
              </div>
            </>
          )}
          {mode === 'wave' && (
            <>
              <div className="flex items-center">
                <div className="w-4 h-1 bg-red-500 mr-2"></div>
                <span className="text-red-400">sin wave</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-1 bg-green-500 mr-2"></div>
                <span className="text-green-400">cos wave</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CalculusVisualizer;