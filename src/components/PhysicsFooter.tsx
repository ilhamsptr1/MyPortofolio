"use client";

import { useEffect, useRef, useState } from "react";
import Matter from "matter-js";

export default function PhysicsFooter() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const renderRef = useRef<Matter.Render | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches || window.matchMedia("(pointer: coarse)").matches);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    // Disable on mobile to prevent blocking vertical scroll at the bottom of the page
    if (!sceneRef.current || isMobile) return;

    const Engine = Matter.Engine,
      Render = Matter.Render,
      Runner = Matter.Runner,
      MouseConstraint = Matter.MouseConstraint,
      Mouse = Matter.Mouse,
      World = Matter.World,
      Bodies = Matter.Bodies;

    // Create engine
    const engine = Engine.create();
    engineRef.current = engine;
    const world = engine.world;

    const width = sceneRef.current.clientWidth;
    const height = sceneRef.current.clientHeight;

    // Create renderer
    const render = Render.create({
      element: sceneRef.current,
      engine: engine,
      options: {
        width,
        height,
        background: "transparent",
        wireframes: false,
      },
    });
    renderRef.current = render;

    // Create bounds
    const wallOptions = { isStatic: true, render: { visible: false } };
    World.add(world, [
      Bodies.rectangle(width / 2, height + 25, width, 50, wallOptions), // Bottom
      Bodies.rectangle(width / 2, -2000, width, 50, wallOptions), // Top (ceiling) moved way up
      Bodies.rectangle(-25, height / 2, 50, height * 2, wallOptions), // Left
      Bodies.rectangle(width + 25, height / 2, 50, height * 2, wallOptions), // Right
    ]);

    // Tech stack blocks
    const techStacks = [
      { text: "React", color: "#61DAFB", textColor: "#000" },
      { text: "Next.js", color: "#000000", textColor: "#FFF" },
      { text: "TypeScript", color: "#3178C6", textColor: "#FFF" },
      { text: "Tailwind", color: "#06B6D4", textColor: "#FFF" },
      { text: "HTML5", color: "#E34F26", textColor: "#FFF" },
      { text: "CSS3", color: "#1572B6", textColor: "#FFF" },
      { text: "Framer", color: "#FF0055", textColor: "#FFF" },
    ];

    const boxes = techStacks.map((tech, i) => {
      const x = Math.random() * (width - 200) + 100;
      const y = -200 - (i * 100); // Stagger drop from above
      
      // Creating a rounded rectangle look using a chamfered rectangle
      return Bodies.rectangle(x, y, 120, 50, {
        chamfer: { radius: 10 },
        restitution: 0.8, // Bounciness
        friction: 0.05,
        render: {
          fillStyle: tech.color,
          strokeStyle: "#000",
          lineWidth: 4,
          // We can't render text easily in native matter-js render, 
          // but we can use sprites. For simplicity, we just render colored boxes 
          // and a separate HTML layer can overlay them if needed, but 
          // the colored bouncy blocks are enough to convey "toys"
        }
      });
    });

    World.add(world, boxes);

    // Add mouse control
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false },
      },
    });

    World.add(world, mouseConstraint);

    // Keep the mouse in sync with rendering
    render.mouse = mouse;

    // Run the engine and renderer
    Render.run(render);
    const runner = Runner.create();
    Runner.run(runner, engine);

    // Handle resize
    const handleResize = () => {
      if (sceneRef.current && render.canvas) {
        const newWidth = sceneRef.current.clientWidth;
        render.canvas.width = newWidth;
        render.options.width = newWidth;
        
        // Update floor boundary
        const floor = world.bodies.find((b) => b.isStatic && b.position.y > height);
        if (floor) {
          Matter.Body.setPosition(floor, { x: newWidth / 2, y: height + 25 });
          // Note: Width of floor doesn't scale easily without replacing it, 
          // but we made it wide enough initially or we just accept it.
        }
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      Render.stop(render);
      Runner.stop(runner);
      if (engineRef.current) World.clear(engineRef.current.world, false);
      if (engineRef.current) Engine.clear(engineRef.current);
      if (render.canvas) render.canvas.remove();
      render.canvas = null as any;
      render.context = null as any;
      render.textures = {};
    };
  }, [isMobile]);

  if (isMobile) return null; // Don't render physics on mobile to save perf & scroll bugs

  return (
    <div className="relative w-full h-[300px] border-t-4 border-black bg-accent overflow-hidden z-20">
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center select-none opacity-20">
        <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-center">
          THROW ME!
        </h2>
      </div>
      {/* Matter.js Canvas Container */}
      <div ref={sceneRef} className="absolute inset-0 w-full h-full cursor-crosshair"></div>
    </div>
  );
}
