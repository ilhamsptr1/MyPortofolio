"use client";

import { useEffect, useRef, useState } from "react";

interface PhysicsBox {
  id: number;
  text: string;
  color: string;
  textColor: string;
  x: number;
  y: number;
  angle: number;
}

const TECH_STACKS = [
  { text: "React", color: "#61DAFB", textColor: "#000" },
  { text: "Next.js", color: "#000000", textColor: "#FFF" },
  { text: "TypeScript", color: "#3178C6", textColor: "#FFF" },
  { text: "Tailwind", color: "#06B6D4", textColor: "#FFF" },
  { text: "HTML5", color: "#E34F26", textColor: "#FFF" },
  { text: "CSS3", color: "#1572B6", textColor: "#FFF" },
  { text: "Framer", color: "#FF0055", textColor: "#FFF" },
  { text: "Figma", color: "#F24E1E", textColor: "#FFF" },
];

const BOX_W = 120;
const BOX_H = 48;

export default function PhysicsFooter() {
  const containerRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number>(0);
  const [boxes, setBoxes] = useState<PhysicsBox[]>([]);
  const [isMobile, setIsMobile] = useState(true); // Start as true to avoid SSR issues

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(
        window.matchMedia("(max-width: 768px)").matches ||
          window.matchMedia("(pointer: coarse)").matches
      );
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile || !containerRef.current) return;

    let Matter: typeof import("matter-js");
    let engine: import("matter-js").Engine;
    let runner: import("matter-js").Runner;

    const init = async () => {
      Matter = await import("matter-js");
      const { Engine, Runner, Bodies, World, Mouse, MouseConstraint, Events } = Matter;

      const container = containerRef.current!;
      const width = container.clientWidth;
      const height = container.clientHeight;

      engine = Engine.create();
      runner = Runner.create();

      // Boundaries
      const wallOpts = { isStatic: true };
      World.add(engine.world, [
        Bodies.rectangle(width / 2, height + 25, width * 2, 50, wallOpts), // floor
        Bodies.rectangle(-25, height / 2, 50, height * 2, wallOpts),        // left
        Bodies.rectangle(width + 25, height / 2, 50, height * 2, wallOpts), // right
      ]);

      // Create physics bodies for each box
      const physBodies = TECH_STACKS.map((_, i) => {
        const x = Math.random() * (width - BOX_W - 40) + BOX_W / 2 + 20;
        const y = -100 - i * 120;
        return Bodies.rectangle(x, y, BOX_W, BOX_H, {
          restitution: 0.5,
          friction: 0.1,
          frictionAir: 0.01,
          chamfer: { radius: 8 },
        });
      });

      World.add(engine.world, physBodies);

      // Mouse constraint for dragging
      const mouse = Mouse.create(container);
      const mouseConstraint = MouseConstraint.create(engine, {
        mouse,
        constraint: { stiffness: 0.2, render: { visible: false } },
      });
      World.add(engine.world, mouseConstraint);

      // Prevent mouse from blocking page scroll
      mouse.element.removeEventListener("mousewheel", (mouse as any).mousewheel);
      mouse.element.removeEventListener("DOMMouseScroll", (mouse as any).mousewheel);

      // Sync HTML boxes with physics bodies
      const syncBoxes = () => {
        setBoxes(
          physBodies.map((body, i) => ({
            id: i,
            text: TECH_STACKS[i].text,
            color: TECH_STACKS[i].color,
            textColor: TECH_STACKS[i].textColor,
            x: body.position.x,
            y: body.position.y,
            angle: body.angle,
          }))
        );
        animFrameRef.current = requestAnimationFrame(syncBoxes);
      };

      Runner.run(runner, engine);
      animFrameRef.current = requestAnimationFrame(syncBoxes);
    };

    init();

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      if (runner && Matter) {
        Matter.Runner.stop(runner);
        Matter.World.clear(engine.world, false);
        Matter.Engine.clear(engine);
      }
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[300px] border-t-4 border-black bg-accent overflow-hidden cursor-crosshair select-none z-20"
    >
      {/* Background watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <h2 className="text-7xl md:text-9xl font-black uppercase tracking-tighter text-black/10">
          THROW ME!
        </h2>
      </div>

      {/* HTML physics boxes */}
      {boxes.map((box) => (
        <div
          key={box.id}
          style={{
            position: "absolute",
            left: box.x - BOX_W / 2,
            top: box.y - BOX_H / 2,
            width: BOX_W,
            height: BOX_H,
            transform: `rotate(${box.angle}rad)`,
            backgroundColor: box.color,
            color: box.textColor,
            border: "3px solid #000",
            borderRadius: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 900,
            fontSize: 13,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            boxShadow: "3px 3px 0px #000",
            pointerEvents: "none",
            userSelect: "none",
          }}
        >
          {box.text}
        </div>
      ))}
    </div>
  );
}
