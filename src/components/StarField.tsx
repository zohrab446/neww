import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  twinkleSpeed: number;
  phase: number;
}

interface ShootingStar {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
}

export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const context: CanvasRenderingContext2D = ctx;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const stars: Star[] = [];
    const starCount = Math.min(200, Math.floor((width * height) / 8000));
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.5 + 0.3,
        opacity: Math.random() * 0.5 + 0.2,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        phase: Math.random() * Math.PI * 2,
      });
    }

    const shootingStars: ShootingStar[] = [];
    let animationId = 0;

    function spawnShootingStar() {
      const startX = Math.random() * width * 0.5;
      const startY = Math.random() * height * 0.3;
      const angle = Math.PI / 4 + (Math.random() - 0.5) * 0.3;
      const speed = 3 + Math.random() * 3;
      shootingStars.push({
        x: startX,
        y: startY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 0,
        maxLife: 80 + Math.random() * 40,
      });
    }

    function speedOf(ss: ShootingStar): number {
      return Math.sqrt(ss.vx * ss.vx + ss.vy * ss.vy) || 1;
    }

    let lastShoot = 0;

    function animate(time: number) {
      context.clearRect(0, 0, width, height);

      for (const star of stars) {
        star.phase += star.twinkleSpeed;
        const twinkle = 0.5 + 0.5 * Math.sin(star.phase);
        const alpha = star.opacity * twinkle;
        context.beginPath();
        context.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        context.fillStyle = `rgba(255, 240, 200, ${alpha})`;
        context.fill();

        if (star.radius > 1) {
          context.beginPath();
          context.arc(star.x, star.y, star.radius * 2.5, 0, Math.PI * 2);
          context.fillStyle = `rgba(255, 220, 180, ${alpha * 0.15})`;
          context.fill();
        }
      }

      if (time - lastShoot > 3000 + Math.random() * 5000) {
        spawnShootingStar();
        lastShoot = time;
      }

      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const ss = shootingStars[i];
        ss.life++;
        ss.x += ss.vx;
        ss.y += ss.vy;
        const progress = ss.life / ss.maxLife;
        const alpha = progress < 0.2 ? progress * 5 : 1 - (progress - 0.2) * 1.25;
        const tailLength = 40;
        const sp = speedOf(ss);
        const grad = context.createLinearGradient(
          ss.x, ss.y,
          ss.x - (ss.vx * tailLength) / sp,
          ss.y - (ss.vy * tailLength) / sp,
        );
        grad.addColorStop(0, `rgba(255, 240, 200, ${alpha})`);
        grad.addColorStop(1, 'rgba(255, 240, 200, 0)');
        context.strokeStyle = grad;
        context.lineWidth = 1.5;
        context.beginPath();
        context.moveTo(ss.x, ss.y);
        context.lineTo(ss.x - ss.vx * 10, ss.y - ss.vy * 10);
        context.stroke();

        if (ss.life >= ss.maxLife || ss.x > width || ss.y > height) {
          shootingStars.splice(i, 1);
        }
      }

      animationId = requestAnimationFrame(animate);
    }

    animationId = requestAnimationFrame(animate);

    function handleResize() {
      width = canvas!.width = window.innerWidth;
      height = canvas!.height = window.innerHeight;
    }
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
