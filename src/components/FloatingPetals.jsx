import React, { useEffect, useRef } from 'react';

/**
 * High-performance Canvas animation of floating Jasmine blossoms (Mullappoo)
 * and soft pink/rose flower petals drifting gently in the breeze.
 */
export const FloatingPetals = ({ count = 28, enabled = true }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!enabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Petal types: 'jasmine' (white/cream with yellow center) or 'rose' (antique pink/burgundy)
    const petals = Array.from({ length: count }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height - height,
      size: Math.random() * 8 + 8,
      speedY: Math.random() * 0.9 + 0.6,
      speedX: Math.sin(Math.random() * Math.PI * 2) * 0.5,
      angle: Math.random() * Math.PI * 2,
      angularSpeed: (Math.random() - 0.5) * 0.02,
      sway: Math.random() * 2 + 1,
      swaySpeed: Math.random() * 0.02 + 0.01,
      swayOffset: Math.random() * Math.PI * 2,
      opacity: Math.random() * 0.45 + 0.35,
      type: Math.random() > 0.45 ? 'jasmine' : 'rose',
    }));

    let frame = 0;

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, width, height);

      petals.forEach((p) => {
        p.y += p.speedY;
        p.x += Math.sin(frame * p.swaySpeed + p.swayOffset) * p.sway * 0.6;
        p.angle += p.angularSpeed;

        // Reset if fell below screen
        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x > width + 20) p.x = -20;
        if (p.x < -20) p.x = width + 20;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.globalAlpha = p.opacity;

        if (p.type === 'jasmine') {
          // Traditional Indian Jasmine Blossom (5 delicate white petals with gold center)
          ctx.fillStyle = '#FFFDF8';
          ctx.strokeStyle = '#F7EBDD';
          ctx.lineWidth = 0.5;

          for (let i = 0; i < 5; i++) {
            ctx.save();
            ctx.rotate((i * Math.PI * 2) / 5);
            ctx.beginPath();
            ctx.ellipse(0, -p.size * 0.6, p.size * 0.28, p.size * 0.55, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
            ctx.restore();
          }

          // Golden-yellow center
          ctx.fillStyle = '#D6B77A';
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 0.2, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Soft Antique Rose / Saffron petal
          const gradient = ctx.createLinearGradient(-p.size, -p.size, p.size, p.size);
          gradient.addColorStop(0, '#B76E79');
          gradient.addColorStop(0.7, '#D49BA3');
          gradient.addColorStop(1, '#FFF8EF');

          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.moveTo(0, -p.size * 0.8);
          ctx.bezierCurveTo(p.size * 0.8, -p.size * 0.6, p.size * 0.9, p.size * 0.5, 0, p.size * 0.9);
          ctx.bezierCurveTo(-p.size * 0.9, p.size * 0.5, -p.size * 0.8, -p.size * 0.6, 0, -p.size * 0.8);
          ctx.fill();
        }

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [count, enabled]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-30"
      aria-hidden="true"
    />
  );
};

export default FloatingPetals;
