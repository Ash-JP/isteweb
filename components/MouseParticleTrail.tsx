
'use client';

import { useEffect, useRef } from 'react';

export default function MouseParticleTrail() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;

        // Configuration
        const gap = 30; // Distance between particles
        const interactionRadius = 100; // Radius around mouse where repulsion happens
        const returnSpeed = 0.05; // How fast they return to origin
        const repulsionStrength = 1.0; // How strong the repulsion is

        // State
        let mouseX = -1000;
        let mouseY = -1000;

        // Fixed grid of particles
        let particles: {
            originX: number;
            originY: number;
            x: number;
            y: number;
            vx: number;
            vy: number;
            size: number;
            color: string;
        }[] = [];

        const initParticles = () => {
            particles = [];
            const cols = Math.ceil(window.innerWidth / gap);
            const rows = Math.ceil(window.innerHeight / gap);

            for (let i = 0; i < cols; i++) {
                for (let j = 0; j < rows; j++) {
                    // Add some randomness to origin so it's not a perfect grid (organic feel)
                    const originX = i * gap + gap / 2;
                    const originY = j * gap + gap / 2;

                    particles.push({
                        originX,
                        originY,
                        x: originX,
                        y: originY,
                        vx: 0,
                        vy: 0,
                        size: Math.random() * 1.5 + 0.5, // Subtle dots 0.5px to 2px
                        color: `rgba(255, 255, 255, ${Math.random() * 0.2 + 0.1})` // Slightly more visible (0.1-0.3)
                    });
                }
            }
        };

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        const handleMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };

        window.addEventListener('mousemove', handleMouseMove);

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach((p) => {
                // Calculate distance to mouse
                const dx = mouseX - p.x;
                const dy = mouseY - p.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                // Repulsion Force
                if (dist < interactionRadius) {
                    const angle = Math.atan2(dy, dx);
                    const force = (interactionRadius - dist) / interactionRadius;
                    const moveX = Math.cos(angle) * force * repulsionStrength * 10;
                    const moveY = Math.sin(angle) * force * repulsionStrength * 10;

                    // Move away from mouse
                    p.vx -= moveX;
                    p.vy -= moveY;
                }

                // Return to origin (Spring force)
                const dxOrigin = p.originX - p.x;
                const dyOrigin = p.originY - p.y;

                p.vx += dxOrigin * returnSpeed;
                p.vy += dyOrigin * returnSpeed;

                // Friction (Damping)
                p.vx *= 0.85;
                p.vy *= 0.85;

                // Update position
                p.x += p.vx;
                p.y += p.vy;

                // Draw
                ctx.fillStyle = p.color;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            // Fixed background, behind content (z-0 assuming content is higher or handled by stacking)
            // pointer-events-none ensures it doesn't block interaction
            className="pointer-events-none fixed inset-0 z-[-1] h-full w-full"
        />
    );
}
