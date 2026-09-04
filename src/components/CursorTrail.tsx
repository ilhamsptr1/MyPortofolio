"use client";

import { useEffect, useRef } from "react";

/**
 * PremiumCursor — circular radar/target cursor
 *
 * Architecture:
 * - 4 concentric ring divs + center dot, all positioned with transform
 * - RAF loop lerps position and scale separately — no CSS transition on transform
 * - Click ripple appended directly to DOM (no React re-render)
 * - Only active on fine pointer devices (mouse/trackpad, not touch)
 * - Respects prefers-reduced-motion
 */
export default function CursorTrail() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only on precise pointer (mouse/trackpad), never on touch screens
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const root = rootRef.current;
    if (!root) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Lerp factors — set to 1 for instant (reduced motion)
    const LERP_POS   = prefersReduced ? 1 : 0.14;
    const LERP_SCALE = prefersReduced ? 1 : 0.16;
    const LERP_GLOW  = prefersReduced ? 1 : 0.12;

    // Mutable state — no React re-renders during animation
    let targetX = -300, targetY = -300;
    let curX    = -300, curY    = -300;

    let baseScale  = 1;          // scale set by hover state
    let targetScale = 1;         // actual target (includes press squish)
    let curScale    = 1;         // smoothed current scale

    let targetGlow  = 0;         // 0–1 glow intensity
    let curGlow     = 0;

    let visible    = false;
    let isPressing = false;
    let rafId      = 0;

    // ── RAF tick: lerp position, scale, glow every frame ─────────────────
    const tick = () => {
      curX     += (targetX     - curX)     * LERP_POS;
      curY     += (targetY     - curY)     * LERP_POS;
      curScale += (targetScale - curScale) * LERP_SCALE;
      curGlow  += (targetGlow  - curGlow)  * LERP_GLOW;

      // translate3d for position (GPU composited), then scale around center
      root.style.transform =
        `translate3d(${curX.toFixed(2)}px, ${curY.toFixed(2)}px, 0)` +
        ` translate(-50%, -50%)` +
        ` scale(${curScale.toFixed(4)})`;

      // Subtle glow that fades in/out smoothly
      root.style.filter =
        curGlow > 0.02
          ? `drop-shadow(0 0 ${(curGlow * 9).toFixed(1)}px var(--theme-accent))`
          : "none";

      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    // ── Mouse tracking ────────────────────────────────────────────────────
    const onMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;

      if (!visible) {
        visible = true;
        root.style.opacity = "1";
      }

      // Resolve cursor state from element under pointer
      const el = document.elementFromPoint(e.clientX, e.clientY);
      if (!el) { baseScale = 1; targetGlow = 0; if (!isPressing) targetScale = 1; return; }

      const isProject     = !!el.closest("[data-cursor='project']");
      const isInteractive = !!el.closest("a, button, [role='button'], input, textarea, select, label");

      if (isProject) {
        baseScale  = 1.55;
        targetGlow = 0.85;
      } else if (isInteractive) {
        baseScale  = 1.35;
        targetGlow = 0.45;
      } else {
        baseScale  = 1;
        targetGlow = 0;
      }

      if (!isPressing) targetScale = baseScale;
    };

    const onLeave = () => { visible = false; root.style.opacity = "0"; };
    const onEnter = () => { visible = true;  root.style.opacity = "1"; };

    // Press squish — cursor briefly scales down on click
    const onDown = () => {
      isPressing  = true;
      targetScale = baseScale * 0.78;
    };
    const onUp = () => {
      isPressing  = false;
      targetScale = baseScale;
    };

    // ── Click ripple — pure DOM, zero React re-renders ─────────────────
    const onClick = (e: MouseEvent) => {
      const r = document.createElement("div");
      r.setAttribute("aria-hidden", "true");
      Object.assign(r.style, {
        position:       "fixed",
        left:           `${e.clientX}px`,
        top:            `${e.clientY}px`,
        width:          "34px",
        height:         "34px",
        borderRadius:   "50%",
        border:         "1px solid var(--theme-accent)",
        transform:      "translate(-50%, -50%) scale(0.4)",
        opacity:        "0.85",
        pointerEvents:  "none",
        zIndex:         "999997",
        transition:     "transform 430ms cubic-bezier(0.1, 0, 0.25, 1), opacity 430ms ease-out",
      });
      document.body.appendChild(r);

      // Double rAF ensures browser applies initial state before transitioning
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          r.style.transform = "translate(-50%, -50%) scale(3.2)";
          r.style.opacity   = "0";
        })
      );
      setTimeout(() => r.remove(), 460);
    };

    document.addEventListener("mousemove",  onMove,  { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("mousedown",  onDown);
    document.addEventListener("mouseup",    onUp);
    document.addEventListener("click",      onClick);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("mousemove",  onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mousedown",  onDown);
      document.removeEventListener("mouseup",    onUp);
      document.removeEventListener("click",      onClick);
    };
  }, []);

  // ── Render — pure CSS rings, no images/SVG ──────────────────────────────
  const ring = (size: number, opacity: number, thickness = "1px") => ({
    position:    "absolute" as const,
    top:         "50%",
    left:        "50%",
    width:       `${size}px`,
    height:      `${size}px`,
    borderRadius: "50%",
    border:      `${thickness} solid rgba(255,255,255,${opacity})`,
    transform:   "translate(-50%, -50%)",
  });

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      style={{
        position:     "fixed",
        top:          0,
        left:         0,
        pointerEvents:"none",
        zIndex:       999999,
        opacity:      0,
        willChange:   "transform",
        // Animate opacity only via CSS — transform is handled entirely by RAF
        transition:   "opacity 180ms ease",
      }}
    >
      {/* ── Outermost guide ring — barely visible ── */}
      <div style={ring(50, 0.07, "0.5px")} />

      {/* ── Outer ring ── */}
      <div style={ring(36, 0.14)} />

      {/* ── Mid ring ── */}
      <div style={ring(24, 0.28)} />

      {/* ── Inner ring ── */}
      <div style={ring(14, 0.52, "1.5px")} />

      {/* ── Center dot — accent color, always crisp ── */}
      <div
        style={{
          position:        "absolute",
          top:             "50%",
          left:            "50%",
          width:           "4px",
          height:          "4px",
          borderRadius:    "50%",
          backgroundColor: "var(--theme-accent)",
          transform:       "translate(-50%, -50%)",
          boxShadow:       "0 0 5px var(--theme-accent)",
        }}
      />
    </div>
  );
}
