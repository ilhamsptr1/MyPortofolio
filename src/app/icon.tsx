import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          background: "#0033ff",
          border: "2px solid #ccff00",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          fontWeight: 900,
          fontSize: 14,
          color: "#ccff00",
          letterSpacing: "-0.5px",
        }}
      >
        IS
      </div>
    ),
    { ...size }
  );
}
