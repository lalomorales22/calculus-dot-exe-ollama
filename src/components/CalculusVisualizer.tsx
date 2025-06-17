import React, { useState, useEffect, useRef } from 'react';
import { Settings, Eye, TrendingUp, Circle, Waves, RotateCcw, ZoomIn, ZoomOut, Move } from 'lucide-react';

interface Point {
  x: number;
  y: number;
}

interface VisualizerProps {
  width?: number;
  height?: number;
}

// Function definitions
const functions = {
  cubic: {
    name: 'f(x) = 0.1x³ - 0.5x² + x + 1',
    f: (x: number) => 0.1 * x * x * x - 0.5 * x * x + x + 1,
    fPrime: (x: number) => 0.3 * x * x - x + 1
  },
  quadratic: {
    name: 'f(x) = x² - 2x + 1',
    f: (x: number) => x * x - 2 * x + 1,
    fPrime: (x: number) => 2 * x - 2
  },
  sine: {
    name: 'f(x) = sin(x)',
    f: (x: number) => Math.sin(x),
    fPrime: (x: number) => Math.cos(x)
  },
  exponential: {
    name: 'f(x) = e^(0.5x)',
    f: (x: number) => Math.exp(0.5 * x),
    fPrime: (x: number) => 0.5 * Math.exp(0.5 * x)
  },
  logarithmic: {
    name: 'f(x) = ln(x + 3)',
    f: (x: number) => x > -3 ? Math.log(x + 3) : NaN,
    fPrime: (x: number) => x > -3 ? 1 / (x + 3) : NaN
  },
  rational: {
    name: 'f(x) = 1/(x² + 1)',
    f: (x: number) => 1 / (x * x + 1),
    fPrime: (x: number) => -2 * x / Math.pow(x * x + 1, 2)
  },
  absolute: {
    name: 'f(x) = |x - 1|',
    f: (x: number) => Math.abs(x - 1),
    fPrime: (x: number) => x > 1 ? 1 : x < 1 ? -1 : NaN
  }
};

const CalculusVisualizer: React.FC<VisualizerProps> = ({ 
  width: propWidth, 
  height: propHeight 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  
  // Dynamic sizing based on container
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 500 });
  
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
  const [angleValue, setAngleValue] = useState(Math.PI / 4); // For unit circle
  const [selectedFunction, setSelectedFunction] = useState<keyof typeof functions>('cubic');
  
  // Zoom and pan state
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panX, setPanX] = useState(0);
  const [panY, setPanY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });

  // Update canvas size based on container
  useEffect(() => {
    const updateCanvasSize = () => {
      if (containerRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const padding = 8; // Account for border and padding
        const newWidth = Math.max(400, containerRect.width - padding);
        const newHeight = propHeight || 500;
        
        setCanvasSize({ width: newWidth, height: newHeight });
      }
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);
    
    return () => window.removeEventListener('resize', updateCanvasSize);
  }, [propHeight]);
  
  // Calculate dynamic range based on zoom
  const getViewRange = () => {
    const baseRange = 5;
    const range = baseRange / zoomLevel;
    return {
      xMin: -range + panX,
      xMax: range + panX,
      yMin: -range + panY,
      yMax: range + panY
    };
  };

  // Canvas setup
  const setupCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;
    
    // Set canvas size
    canvas.width = canvasSize.width;
    canvas.height = canvasSize.height;
    
    // Set up coordinate system
    ctx.translate(canvasSize.width / 2, canvasSize.height / 2);
    ctx.scale(1, -1); // Flip Y axis for mathematical coordinates
    
    return ctx;
  };

  // Get current function
  const getCurrentFunction = () => functions[selectedFunction];

  // Mathematical functions
  const sinWave = (x: number) => amplitude * Math.sin(frequency * x + phase);
  const cosWave = (x: number) => amplitude * Math.cos(frequency * x + phase);

  // Convert between coordinate systems
  const mathToCanvas = (mathX: number, mathY: number) => {
    const range = getViewRange();
    const scaleX = canvasSize.width / (range.xMax - range.xMin);
    const scaleY = canvasSize.height / (range.yMax - range.yMin);
    
    const canvasX = (mathX - range.xMin) * scaleX - canvasSize.width / 2;
    const canvasY = (mathY - range.yMin) * scaleY - canvasSize.height / 2;
    
    return { x: canvasX, y: canvasY };
  };

  const canvasToMath = (canvasX: number, canvasY: number) => {
    const range = getViewRange();
    const scaleX = (range.xMax - range.xMin) / canvasSize.width;
    const scaleY = (range.yMax - range.yMin) / canvasSize.height;
    
    const mathX = (canvasX + canvasSize.width / 2) * scaleX + range.xMin;
    const mathY = (canvasY + canvasSize.height / 2) * scaleY + range.yMin;
    
    return { x: mathX, y: mathY };
  };

  // Drawing utilities
  const drawGrid = (ctx: CanvasRenderingContext2D) => {
    const range = getViewRange();
    const gridSpacing = Math.pow(10, Math.floor(Math.log10((range.xMax - range.xMin) / 10)));
    
    ctx.strokeStyle = '#1e40af';
    ctx.lineWidth = 1;
    ctx.globalAlpha = 0.3;
    
    // Vertical lines
    for (let x = Math.ceil(range.xMin / gridSpacing) * gridSpacing; x <= range.xMax; x += gridSpacing) {
      const canvasPos = mathToCanvas(x, 0);
      ctx.beginPath();
      ctx.moveTo(canvasPos.x, -canvasSize.height/2);
      ctx.lineTo(canvasPos.x, canvasSize.height/2);
      ctx.stroke();
    }
    
    // Horizontal lines
    for (let y = Math.ceil(range.yMin / gridSpacing) * gridSpacing; y <= range.yMax; y += gridSpacing) {
      const canvasPos = mathToCanvas(0, y);
      ctx.beginPath();
      ctx.moveTo(-canvasSize.width/2, canvasPos.y);
      ctx.lineTo(canvasSize.width/2, canvasPos.y);
      ctx.stroke();
    }
    
    ctx.globalAlpha = 1;
  };

  const drawAxes = (ctx: CanvasRenderingContext2D) => {
    const range = getViewRange();
    
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 2;
    
    // X-axis (only if y=0 is visible)
    if (range.yMin <= 0 && range.yMax >= 0) {
      const yPos = mathToCanvas(0, 0).y;
      ctx.beginPath();
      ctx.moveTo(-canvasSize.width/2, yPos);
      ctx.lineTo(canvasSize.width/2, yPos);
      ctx.stroke();
    }
    
    // Y-axis (only if x=0 is visible)
    if (range.xMin <= 0 && range.xMax >= 0) {
      const xPos = mathToCanvas(0, 0).x;
      ctx.beginPath();
      ctx.moveTo(xPos, -canvasSize.height/2);
      ctx.lineTo(xPos, canvasSize.height/2);
      ctx.stroke();
    }
    
    // Axis labels
    ctx.fillStyle = '#60a5fa';
    ctx.font = '12px JetBrains Mono';
    ctx.scale(1, -1); // Flip text back
    
    const labelSpacing = Math.pow(10, Math.floor(Math.log10((range.xMax - range.xMin) / 8)));
    
    // X-axis labels
    if (range.yMin <= 0 && range.yMax >= 0) {
      const yPos = -mathToCanvas(0, 0).y;
      for (let x = Math.ceil(range.xMin / labelSpacing) * labelSpacing; x <= range.xMax; x += labelSpacing) {
        if (Math.abs(x) > labelSpacing / 10) { // Skip origin
          const xPos = mathToCanvas(x, 0).x;
          ctx.fillText(x.toFixed(x < 1 && x > -1 ? 1 : 0), xPos - 10, yPos + 15);
        }
      }
    }
    
    // Y-axis labels
    if (range.xMin <= 0 && range.xMax >= 0) {
      const xPos = mathToCanvas(0, 0).x;
      for (let y = Math.ceil(range.yMin / labelSpacing) * labelSpacing; y <= range.yMax; y += labelSpacing) {
        if (Math.abs(y) > labelSpacing / 10) { // Skip origin
          const yPos = -mathToCanvas(0, y).y;
          ctx.fillText(y.toFixed(y < 1 && y > -1 ? 1 : 0), xPos + 10, yPos + 3);
        }
      }
    }
    
    ctx.scale(1, -1); // Flip back
  };

  const drawFunction = (ctx: CanvasRenderingContext2D, func: (x: number) => number, color: string, lineWidth: number = 2) => {
    const range = getViewRange();
    
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.beginPath();
    
    let started = false;
    const step = (range.xMax - range.xMin) / canvasSize.width; // Adaptive step size
    
    for (let x = range.xMin; x <= range.xMax; x += step) {
      const y = func(x);
      
      if (!isNaN(y) && y >= range.yMin && y <= range.yMax) {
        const canvasPos = mathToCanvas(x, y);
        if (!started) {
          ctx.moveTo(canvasPos.x, canvasPos.y);
          started = true;
        } else {
          ctx.lineTo(canvasPos.x, canvasPos.y);
        }
      } else {
        started = false;
      }
    }
    ctx.stroke();
  };

  const drawPoint = (ctx: CanvasRenderingContext2D, x: number, y: number, color: string, size: number = 4) => {
    const canvasPos = mathToCanvas(x, y);
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(canvasPos.x, canvasPos.y, size, 0, 2 * Math.PI);
    ctx.fill();
  };

  const drawLine = (ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number, color: string, lineWidth: number = 2) => {
    const pos1 = mathToCanvas(x1, y1);
    const pos2 = mathToCanvas(x2, y2);
    
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.beginPath();
    ctx.moveTo(pos1.x, pos1.y);
    ctx.lineTo(pos2.x, pos2.y);
    ctx.stroke();
  };

  // Visualization modes
  const drawDerivativeVisualization = (ctx: CanvasRenderingContext2D) => {
    const currentFunc = getCurrentFunction();
    
    // Draw original function
    drawFunction(ctx, currentFunc.f, '#10b981', 3);
    
    // Draw derivative function
    drawFunction(ctx, currentFunc.fPrime, '#f59e0b', 2);
    
    // Draw point on original function
    const y = currentFunc.f(xValue);
    if (!isNaN(y)) {
      drawPoint(ctx, xValue, y, '#ef4444', 6);
      
      // Draw tangent line
      const slope = currentFunc.fPrime(xValue);
      if (!isNaN(slope)) {
        const range = getViewRange();
        const lineLength = (range.xMax - range.xMin) / 4;
        const x1 = xValue - lineLength;
        const x2 = xValue + lineLength;
        const y1 = y + slope * (x1 - xValue);
        const y2 = y + slope * (x2 - xValue);
        drawLine(ctx, x1, y1, x2, y2, '#ef4444', 2);
        
        // Draw slope indicator
        ctx.fillStyle = '#ef4444';
        ctx.font = '12px JetBrains Mono';
        ctx.scale(1, -1);
        ctx.fillText(`f'(${xValue.toFixed(1)}) = ${slope.toFixed(3)}`, -canvasSize.width/2 + 20, canvasSize.height/2 - 30);
        ctx.fillText(`Point: (${xValue.toFixed(1)}, ${y.toFixed(3)})`, -canvasSize.width/2 + 20, canvasSize.height/2 - 50);
        ctx.scale(1, -1);
      }
    }
  };

  const drawLimitVisualization = (ctx: CanvasRenderingContext2D) => {
    const currentFunc = getCurrentFunction();
    
    // Draw function
    drawFunction(ctx, currentFunc.f, '#10b981', 3);
    
    // Draw approaching point
    const approachX = xValue + hValue;
    const approachY = currentFunc.f(approachX);
    const targetY = currentFunc.f(xValue);
    
    if (!isNaN(approachY) && !isNaN(targetY)) {
      drawPoint(ctx, approachX, approachY, '#f59e0b', 5);
      drawPoint(ctx, xValue, targetY, '#ef4444', 6);
      
      // Draw secant line
      if (Math.abs(hValue) > 0.001) {
        const slope = (approachY - targetY) / hValue;
        const range = getViewRange();
        const lineLength = (range.xMax - range.xMin) / 4;
        const x1 = Math.min(xValue, approachX) - lineLength/2;
        const x2 = Math.max(xValue, approachX) + lineLength/2;
        const y1 = targetY + slope * (x1 - xValue);
        const y2 = targetY + slope * (x2 - xValue);
        drawLine(ctx, x1, y1, x2, y2, '#8b5cf6', 2);
        
        // Display limit info
        ctx.fillStyle = '#60a5fa';
        ctx.font = '12px JetBrains Mono';
        ctx.scale(1, -1);
        ctx.fillText(`h = ${hValue.toFixed(4)}`, -canvasSize.width/2 + 20, canvasSize.height/2 - 30);
        ctx.fillText(`Secant slope = ${slope.toFixed(4)}`, -canvasSize.width/2 + 20, canvasSize.height/2 - 50);
        ctx.fillText(`Limit (h→0) = ${currentFunc.fPrime(xValue).toFixed(4)}`, -canvasSize.width/2 + 20, canvasSize.height/2 - 70);
        ctx.scale(1, -1);
      }
    }
  };

  const drawTangentVisualization = (ctx: CanvasRenderingContext2D) => {
    const currentFunc = getCurrentFunction();
    
    // Draw function
    drawFunction(ctx, currentFunc.f, '#10b981', 3);
    
    // Draw multiple secant lines approaching tangent
    const baseX = xValue;
    const baseY = currentFunc.f(baseX);
    
    if (!isNaN(baseY)) {
      for (let i = 1; i <= 8; i++) {
        const h = hValue * i / 8;
        const secantX = baseX + h;
        const secantY = currentFunc.f(secantX);
        
        if (!isNaN(secantY) && Math.abs(h) > 0.001) {
          const slope = (secantY - baseY) / h;
          const range = getViewRange();
          const lineLength = (range.xMax - range.xMin) / 6;
          const x1 = baseX - lineLength;
          const x2 = baseX + lineLength;
          const y1 = baseY + slope * (x1 - baseX);
          const y2 = baseY + slope * (x2 - baseX);
          
          const alpha = i / 8;
          ctx.globalAlpha = alpha * 0.6;
          drawLine(ctx, x1, y1, x2, y2, '#8b5cf6', 1);
        }
      }
      
      ctx.globalAlpha = 1;
      
      // Draw final tangent line
      const slope = currentFunc.fPrime(baseX);
      if (!isNaN(slope)) {
        const range = getViewRange();
        const lineLength = (range.xMax - range.xMin) / 4;
        const x1 = baseX - lineLength;
        const x2 = baseX + lineLength;
        const y1 = baseY + slope * (x1 - baseX);
        const y2 = baseY + slope * (x2 - baseX);
        drawLine(ctx, x1, y1, x2, y2, '#ef4444', 3);
      }
      
      drawPoint(ctx, baseX, baseY, '#ef4444', 6);
    }
  };

  const drawCircleVisualization = (ctx: CanvasRenderingContext2D) => {
    const radius = Math.min(canvasSize.width, canvasSize.height) * 0.35; // Bigger circle
    const angle = angleValue;
    
    // Draw unit circle
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.stroke();
    
    // Calculate point on circle
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);
    
    // Draw angle arc
    ctx.strokeStyle = '#60a5fa';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.4, 0, angle);
    ctx.stroke();
    
    // Draw radius line
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(x, y);
    ctx.stroke();
    
    // Draw point on circle
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.arc(x, y, 8, 0, 2 * Math.PI);
    ctx.fill();
    
    // Draw triangle (projections)
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(x, 0);
    ctx.lineTo(x, y);
    ctx.lineTo(0, 0);
    ctx.stroke();
    
    // Draw projection lines
    ctx.strokeStyle = '#8b5cf6';
    ctx.lineWidth = 2;
    ctx.setLineDash([8, 8]);
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x, 0);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(0, y);
    ctx.stroke();
    ctx.setLineDash([]);
    
    // Labels
    ctx.fillStyle = '#60a5fa';
    ctx.font = '14px JetBrains Mono';
    ctx.scale(1, -1);
    
    const degrees = (angle * 180 / Math.PI) % 360;
    const radians = angle % (2 * Math.PI);
    
    ctx.fillText(`θ = ${radians.toFixed(3)} rad`, -canvasSize.width/2 + 20, canvasSize.height/2 - 30);
    ctx.fillText(`θ = ${degrees.toFixed(1)}°`, -canvasSize.width/2 + 20, canvasSize.height/2 - 50);
    ctx.fillText(`sin(θ) = ${Math.sin(angle).toFixed(3)}`, -canvasSize.width/2 + 20, canvasSize.height/2 - 70);
    ctx.fillText(`cos(θ) = ${Math.cos(angle).toFixed(3)}`, -canvasSize.width/2 + 20, canvasSize.height/2 - 90);
    ctx.fillText(`tan(θ) = ${Math.tan(angle).toFixed(3)}`, -canvasSize.width/2 + 20, canvasSize.height/2 - 110);
    
    // Label the sides of the triangle
    ctx.fillStyle = '#f59e0b';
    ctx.font = '16px JetBrains Mono';
    ctx.fillText('cos(θ)', x/2 - 30, 25);
    ctx.fillText('sin(θ)', x + 15, y/2);
    ctx.fillText('r=1', x/2 - 15, y/2 + 20);
    
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
    const range = getViewRange();
    drawLine(ctx, currentX, range.yMin, currentX, range.yMax, '#60a5fa', 1);
    
    // Draw horizontal reference lines
    ctx.strokeStyle = '#60a5fa';
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 5]);
    
    const sinePos = mathToCanvas(currentX, sineY);
    const cosinePos = mathToCanvas(currentX, cosineY);
    
    ctx.beginPath();
    ctx.moveTo(-canvasSize.width/2, sinePos.y);
    ctx.lineTo(sinePos.x, sinePos.y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(-canvasSize.width/2, cosinePos.y);
    ctx.lineTo(cosinePos.x, cosinePos.y);
    ctx.stroke();
    ctx.setLineDash([]);
    
    // Labels
    ctx.fillStyle = '#60a5fa';
    ctx.font = '12px JetBrains Mono';
    ctx.scale(1, -1);
    ctx.fillText(`A = ${amplitude}`, -canvasSize.width/2 + 20, canvasSize.height/2 - 30);
    ctx.fillText(`f = ${frequency}`, -canvasSize.width/2 + 20, canvasSize.height/2 - 50);
    ctx.fillText(`φ = ${phase.toFixed(2)}`, -canvasSize.width/2 + 20, canvasSize.height/2 - 70);
    ctx.fillText(`x = ${currentX.toFixed(2)}`, -canvasSize.width/2 + 20, canvasSize.height/2 - 90);
    ctx.fillText(`sin = ${sineY.toFixed(3)}`, -canvasSize.width/2 + 20, canvasSize.height/2 - 110);
    ctx.fillText(`cos = ${cosineY.toFixed(3)}`, -canvasSize.width/2 + 20, canvasSize.height/2 - 130);
    ctx.scale(1, -1);
  };

  // Mouse event handlers for pan and zoom
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDragging(true);
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      setLastMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging) return;
    
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      const currentMousePos = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
      
      const deltaX = currentMousePos.x - lastMousePos.x;
      const deltaY = currentMousePos.y - lastMousePos.y;
      
      const range = getViewRange();
      const scaleX = (range.xMax - range.xMin) / canvasSize.width;
      const scaleY = (range.yMax - range.yMin) / canvasSize.height;
      
      setPanX(prev => prev - deltaX * scaleX);
      setPanY(prev => prev + deltaY * scaleY); // Flip Y for math coordinates
      
      setLastMousePos(currentMousePos);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const zoomFactor = e.deltaY > 0 ? 0.9 : 1.1;
    setZoomLevel(prev => Math.max(0.1, Math.min(10, prev * zoomFactor)));
  };

  // Main render function
  const render = () => {
    const ctx = setupCanvas();
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(-canvasSize.width/2, -canvasSize.height/2, canvasSize.width, canvasSize.height);
    
    // Draw background
    ctx.fillStyle = '#000000';
    ctx.fillRect(-canvasSize.width/2, -canvasSize.height/2, canvasSize.width, canvasSize.height);
    
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
        if (mode === 'circle') {
          setAngleValue(prev => (prev + 0.02) % (2 * Math.PI));
        } else if (mode === 'limit') {
          setHValue(prev => Math.max(0.001, prev * 0.98));
        } else {
          setAnimationTime(prev => prev + 0.05);
        }
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
  }, [isAnimating, mode]);

  // Render when parameters change
  useEffect(() => {
    render();
  }, [mode, xValue, hValue, amplitude, frequency, phase, animationTime, angleValue, selectedFunction, zoomLevel, panX, panY, canvasSize]);

  const resetAnimation = () => {
    setAnimationTime(0);
    setAngleValue(Math.PI / 4);
    setHValue(1);
    setIsAnimating(false);
  };

  const resetView = () => {
    setZoomLevel(1);
    setPanX(0);
    setPanY(0);
  };

  const zoomIn = () => {
    setZoomLevel(prev => Math.min(10, prev * 1.5));
  };

  const zoomOut = () => {
    setZoomLevel(prev => Math.max(0.1, prev / 1.5));
  };

  // Update slider ranges based on current view
  const range = getViewRange();
  const sliderMin = Math.max(-10, range.xMin);
  const sliderMax = Math.min(10, range.xMax);

  return (
    <div className="border-2 border-blue-500 bg-black p-4">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-white font-mono mb-3 border-l-4 border-blue-500 pl-3">
          INTERACTIVE CALCULUS VISUALIZER v3.0 - DESMOS STYLE
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

        {/* Zoom and Pan Controls */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={zoomIn}
            className="px-3 py-1 border-2 border-green-500 bg-green-600 hover:bg-green-700 text-white font-mono text-xs transition-colors duration-200"
          >
            <ZoomIn className="w-3 h-3 inline mr-1" />
            ZOOM IN
          </button>
          <button
            onClick={zoomOut}
            className="px-3 py-1 border-2 border-green-500 bg-green-600 hover:bg-green-700 text-white font-mono text-xs transition-colors duration-200"
          >
            <ZoomOut className="w-3 h-3 inline mr-1" />
            ZOOM OUT
          </button>
          <button
            onClick={resetView}
            className="px-3 py-1 border-2 border-purple-500 bg-purple-600 hover:bg-purple-700 text-white font-mono text-xs transition-colors duration-200"
          >
            <Move className="w-3 h-3 inline mr-1" />
            RESET VIEW
          </button>
          <div className="px-3 py-1 border-2 border-gray-500 bg-gray-800 text-gray-300 font-mono text-xs">
            ZOOM: {zoomLevel.toFixed(1)}x | RANGE: [{range.xMin.toFixed(1)}, {range.xMax.toFixed(1)}]
          </div>
        </div>

        {/* Function Selection for derivative, limit, and tangent modes */}
        {(mode === 'derivative' || mode === 'limit' || mode === 'tangent') && (
          <div className="mb-4">
            <label className="block text-xs font-bold text-blue-400 font-mono mb-2">
              SELECT FUNCTION:
            </label>
            <select
              value={selectedFunction}
              onChange={(e) => setSelectedFunction(e.target.value as keyof typeof functions)}
              className="w-full p-2 border-2 border-blue-500 bg-black text-white font-mono text-xs focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {Object.entries(functions).map(([key, func]) => (
                <option key={key} value={key}>
                  {func.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Animation Controls */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setIsAnimating(!isAnimating)}
            className={`px-3 py-1 border-2 font-mono text-xs transition-colors duration-200 ${
              isAnimating 
                ? 'border-red-500 bg-red-600 hover:bg-red-700 text-white' 
                : 'border-green-500 bg-green-600 hover:bg-green-700 text-white'
            }`}
          >
            {isAnimating ? 'STOP' : 'ANIMATE'}
          </button>
          <button
            onClick={resetAnimation}
            className="px-3 py-1 border-2 border-yellow-500 bg-yellow-600 hover:bg-yellow-700 text-white font-mono text-xs transition-colors duration-200"
          >
            <RotateCcw className="w-3 h-3 inline mr-1" />
            RESET
          </button>
        </div>
      </div>

      {/* Canvas Container */}
      <div ref={containerRef} className="border-2 border-blue-700 bg-black mb-4 overflow-hidden">
        <canvas
          ref={canvasRef}
          className="block cursor-move w-full"
          style={{ 
            imageRendering: 'pixelated',
            maxWidth: '100%',
            height: 'auto'
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onWheel={handleWheel}
        />
        <div className="p-2 bg-gray-900 text-xs font-mono text-gray-400">
          💡 TIP: Drag to pan • Scroll to zoom • Use controls below to adjust parameters
        </div>
      </div>

      {/* Interactive Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {(mode === 'derivative' || mode === 'limit' || mode === 'tangent') && (
          <>
            <div>
              <label className="block text-xs font-bold text-blue-400 font-mono mb-1">
                X VALUE: {xValue.toFixed(2)}
              </label>
              <input
                type="range"
                min={sliderMin}
                max={sliderMax}
                step="0.1"
                value={Math.max(sliderMin, Math.min(sliderMax, xValue))}
                onChange={(e) => setXValue(parseFloat(e.target.value))}
                className="w-full slider"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-blue-400 font-mono mb-1">
                H VALUE: {hValue.toFixed(4)}
              </label>
              <input
                type="range"
                min="0.001"
                max="2"
                step="0.001"
                value={hValue}
                onChange={(e) => setHValue(parseFloat(e.target.value))}
                className="w-full slider"
              />
            </div>
          </>
        )}

        {mode === 'circle' && (
          <div>
            <label className="block text-xs font-bold text-blue-400 font-mono mb-1">
              ANGLE: {angleValue.toFixed(3)} rad ({(angleValue * 180 / Math.PI).toFixed(1)}°)
            </label>
            <input
              type="range"
              min="0"
              max={2 * Math.PI}
              step="0.01"
              value={angleValue}
              onChange={(e) => setAngleValue(parseFloat(e.target.value))}
              className="w-full slider"
            />
          </div>
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
                className="w-full slider"
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
                className="w-full slider"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-blue-400 font-mono mb-1">
                PHASE: {phase.toFixed(2)} rad
              </label>
              <input
                type="range"
                min="0"
                max={2 * Math.PI}
                step="0.1"
                value={phase}
                onChange={(e) => setPhase(parseFloat(e.target.value))}
                className="w-full slider"
              />
            </div>
          </>
        )}
      </div>

      {/* Legend */}
      <div className="mt-4 p-3 border-2 border-blue-700 bg-blue-950">
        <h4 className="text-sm font-bold text-blue-400 font-mono mb-2">LEGEND & INFO:</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs font-mono">
          {mode === 'derivative' && (
            <>
              <div className="flex items-center">
                <div className="w-4 h-1 bg-green-500 mr-2"></div>
                <span className="text-green-400">Original Function f(x)</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-1 bg-yellow-500 mr-2"></div>
                <span className="text-yellow-400">Derivative f'(x)</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                <span className="text-red-400">Point & Tangent Line</span>
              </div>
              <div className="text-gray-400">
                Slope = f'(x) = tangent line steepness
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
                <span className="text-yellow-400">Approaching Point (x+h)</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-1 bg-purple-500 mr-2"></div>
                <span className="text-purple-400">Secant Line</span>
              </div>
              <div className="text-gray-400">
                As h→0, secant slope → derivative
              </div>
            </>
          )}
          {mode === 'tangent' && (
            <>
              <div className="flex items-center">
                <div className="w-4 h-1 bg-green-500 mr-2"></div>
                <span className="text-green-400">Function f(x)</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-1 bg-purple-500 mr-2"></div>
                <span className="text-purple-400">Secant Lines</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-1 bg-red-500 mr-2"></div>
                <span className="text-red-400">Final Tangent Line</span>
              </div>
              <div className="text-gray-400">
                Watch secants become tangent
              </div>
            </>
          )}
          {mode === 'circle' && (
            <>
              <div className="flex items-center">
                <div className="w-4 h-1 bg-red-500 mr-2"></div>
                <span className="text-red-400">Radius & sin(θ)</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-1 bg-yellow-500 mr-2"></div>
                <span className="text-yellow-400">Triangle & cos(θ)</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-1 bg-blue-500 mr-2"></div>
                <span className="text-blue-400">Angle Arc</span>
              </div>
              <div className="text-gray-400">
                Unit circle: radius = 1, shows all trig ratios
              </div>
            </>
          )}
          {mode === 'wave' && (
            <>
              <div className="flex items-center">
                <div className="w-4 h-1 bg-red-500 mr-2"></div>
                <span className="text-red-400">sin wave: A·sin(fx + φ)</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-1 bg-green-500 mr-2"></div>
                <span className="text-green-400">cos wave: A·cos(fx + φ)</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                <span className="text-blue-400">Current position</span>
              </div>
              <div className="text-gray-400">
                A=amplitude, f=frequency, φ=phase shift
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CalculusVisualizer;