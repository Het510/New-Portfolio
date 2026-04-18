import React, { useRef, useEffect } from 'react';

const Background = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false }); // alpha:false = faster compositing
    if (!ctx) return;

    let rafId;
    let width = 0;
    let height = 0;
    let stars = [];
    let tick = 0;

    // --- Orbs are static, painted once into an offscreen canvas ---
    let orbCanvas = null;

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initStars();
      buildOrbLayer(); // re-bake static orbs on resize
    };

    // Stars: lightweight, just circles with alpha twinkle
    const initStars = () => {
      stars = [];
      const count = Math.min(Math.floor((width * height) / 8000), 180); // cap at 180
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          r: Math.random() * 1.1 + 0.2,
          baseAlpha: Math.random() * 0.45 + 0.08,
          speed: Math.random() * 0.018 + 0.004,
          phase: Math.random() * Math.PI * 2,
        });
      }
    };

    // Bake orbs into an offscreen canvas — only redrawn on resize, not every frame
    const buildOrbLayer = () => {
      orbCanvas = document.createElement('canvas');
      orbCanvas.width = width;
      orbCanvas.height = height;
      const oc = orbCanvas.getContext('2d');

      const orbDefs = [
        { xr: 0.15, yr: 0.25, r: 380, a: 0.06,  color: '124,58,237'   }, // violet
        { xr: 0.85, yr: 0.15, r: 300, a: 0.045, color: '34,211,238'   }, // cyan
        { xr: 0.70, yr: 0.80, r: 340, a: 0.04,  color: '139,92,246'   }, // purple
        { xr: 0.25, yr: 0.90, r: 220, a: 0.03,  color: '6,182,212'    }, // teal
        { xr: 0.95, yr: 0.55, r: 180, a: 0.025, color: '167,139,250'  }, // light violet
      ];

      orbDefs.forEach(({ xr, yr, r, a, color }) => {
        const x = xr * width;
        const y = yr * height;
        const g = oc.createRadialGradient(x, y, 0, x, y, r);
        g.addColorStop(0, `rgba(${color},${a})`);
        g.addColorStop(1, 'rgba(0,0,0,0)');
        oc.fillStyle = g;
        oc.beginPath();
        oc.arc(x, y, r, 0, Math.PI * 2);
        oc.fill();
      });
    };

    // Simple torus wireframe — pre-computed points, draw only outlines
    const buildTorus = (R, r, rings = 12, segs = 16) => {
      const pts = [];
      for (let i = 0; i < rings; i++) {
        const ring = [];
        for (let j = 0; j <= segs; j++) {
          const theta = (i / rings) * Math.PI * 2;
          const phi = (j / segs) * Math.PI * 2;
          ring.push({
            x0: (R + r * Math.cos(phi)) * Math.cos(theta),
            y0: (R + r * Math.cos(phi)) * Math.sin(theta),
            z0: r * Math.sin(phi),
          });
        }
        pts.push(ring);
      }
      return pts;
    };

    const torus1 = buildTorus(70, 24);
    const torus2 = buildTorus(48, 17);

    const drawTorus = (pts, cx, cy, rotX, rotY, alpha) => {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = 'rgba(167,139,250,1)';
      ctx.lineWidth = 0.5;
      const fov = 320;
      for (const ring of pts) {
        ctx.beginPath();
        ring.forEach(({ x0, y0, z0 }, j) => {
          const y1 = y0 * Math.cos(rotX) - z0 * Math.sin(rotX);
          const z1 = y0 * Math.sin(rotX) + z0 * Math.cos(rotX);
          const x2 = x0 * Math.cos(rotY) + z1 * Math.sin(rotY);
          const z2 = -x0 * Math.sin(rotY) + z1 * Math.cos(rotY);
          const s = fov / (fov + z2 + 80);
          const px = cx + x2 * s;
          const py = cy + y1 * s;
          j === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
        });
        ctx.stroke();
      }
      ctx.restore();
    };

    let rotX = 0, rotY = 0;
    // Throttle torus draw — only every 2nd frame (30fps equivalent for wireframe)
    let frameCount = 0;

    const animate = () => {
      frameCount++;
      tick++;

      // Fast solid background fill (no clearRect overhead with alpha:false)
      ctx.fillStyle = '#03030d';
      ctx.fillRect(0, 0, width, height);

      // Stamp pre-baked orb layer
      if (orbCanvas) ctx.drawImage(orbCanvas, 0, 0);

      // Stars — twinkle with sin
      for (const s of stars) {
        const a = s.baseAlpha * (0.55 + 0.45 * Math.sin(tick * s.speed + s.phase));
        ctx.globalAlpha = a;
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Torus — draw every 2nd frame to halve JS cost
      if (frameCount % 2 === 0) {
        rotX += 0.006;
        rotY += 0.008;
        ctx.globalAlpha = 1;
        drawTorus(torus1, width * 0.88, height * 0.2, rotX, rotY, 0.07);
        drawTorus(torus2, width * 0.1, height * 0.8, -rotX * 0.7, rotY * 1.2, 0.05);
      }

      ctx.globalAlpha = 1;
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    resize();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100vw', height: '100vh',
        zIndex: -1,
        pointerEvents: 'none',
        // GPU compositing hint — keeps canvas on its own layer
        willChange: 'transform',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
          // Force GPU layer for the canvas
          willChange: 'transform',
        }}
      />
    </div>
  );
};

export default Background;
