import { ImageResponse } from "next/og";

export const alt = "Ilham Saputra — Frontend Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: "#0033ff",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-end",
          padding: "60px 80px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Grid pattern overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        {/* Lime accent blob */}
        <div
          style={{
            position: "absolute",
            top: -100,
            right: -100,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "#ccff00",
            opacity: 0.12,
            filter: "blur(80px)",
          }}
        />

        {/* Available badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            background: "#ccff00",
            border: "3px solid #000",
            borderRadius: 999,
            padding: "8px 20px",
            marginBottom: 24,
          }}
        >
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#0033ff" }} />
          <span style={{ fontSize: 16, fontWeight: 900, color: "#000", letterSpacing: 2, textTransform: "uppercase" }}>
            Available for Freelance
          </span>
        </div>

        {/* Main heading */}
        <div style={{ display: "flex", flexDirection: "column", gap: 0, marginBottom: 32 }}>
          <span style={{ fontSize: 100, fontWeight: 900, color: "#ccff00", lineHeight: 0.9, letterSpacing: -4 }}>
            ILHAM
          </span>
          <span style={{ fontSize: 80, fontWeight: 900, color: "#ffffff", lineHeight: 0.9, letterSpacing: -3 }}>
            SAPUTRA
          </span>
        </div>

        {/* Role */}
        <span style={{ fontSize: 28, fontWeight: 700, color: "rgba(255,255,255,0.7)", letterSpacing: 2, textTransform: "uppercase" }}>
          Frontend Developer · React · Next.js · TypeScript
        </span>

        {/* Bottom right URL */}
        <span
          style={{
            position: "absolute",
            bottom: 48,
            right: 80,
            fontSize: 18,
            fontWeight: 700,
            color: "rgba(255,255,255,0.4)",
            letterSpacing: 1,
          }}
        >
          myportofolio-nine-pied.vercel.app
        </span>
      </div>
    ),
    { ...size }
  );
}
