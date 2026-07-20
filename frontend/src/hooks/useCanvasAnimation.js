import { useEffect, useState } from 'react';

export const useCanvasAnimation = (canvasRef) => {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId;
    const mouse = { x: null, y: null, isOver: false };
    let lastMouseMove = 0;

    const offscreenCanvas = document.createElement('canvas');
    const offscreenCtx = offscreenCanvas.getContext('2d');

    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 2 + 1,
      speedX: Math.random() * 0.4 - 0.2,
      speedY: Math.random() * 0.4 - 0.2,
      initialAlpha: Math.random() * 0.2 + 0.05,
      color: '59, 130, 246',
    }));

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      offscreenCanvas.width = canvas.width;
      offscreenCanvas.height = canvas.height;
      drawStaticParticles();
    };

    const handleMouseMove = (e) => {
      if (Date.now() - lastMouseMove > 16) {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        mouse.isOver = true;
        lastMouseMove = Date.now();
      }
    };

    const handleMouseLeave = () => {
      mouse.isOver = false;
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    resize();

    function drawStaticParticles() {
      if (!offscreenCtx) return;
      offscreenCtx.clearRect(0, 0, offscreenCanvas.width, offscreenCanvas.height);
      for (let i = 0; i < particles.length; i++) {
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            offscreenCtx.beginPath();
            offscreenCtx.strokeStyle = `rgba(59, 130, 246, ${0.1 * (1 - distance / 120)})`;
            offscreenCtx.lineWidth = 0.3;
            offscreenCtx.moveTo(particles[i].x, particles[i].y);
            offscreenCtx.lineTo(particles[j].x, particles[j].y);
            offscreenCtx.stroke();
          }
        }
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(offscreenCanvas, 0, 0);

      particles.forEach((p) => {
        let currentAlpha = p.initialAlpha;

        if (mouse.isOver && mouse.x !== null) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const attractionRadius = 250;
          const highlightRadius = 150;

          if (distance < attractionRadius) {
            p.x += dx * 0.02;
            p.y += dy * 0.02;

            if (distance < highlightRadius) {
              const proximity = 1 - (distance / highlightRadius);
              currentAlpha = p.initialAlpha + (0.7 - p.initialAlpha) * proximity;
            }
          }
        }

        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${currentAlpha})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    drawStaticParticles();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [canvasRef]);
};
