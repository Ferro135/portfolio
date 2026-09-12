import { ImageResponse } from "next/og";

export const alt = "NEXORA — Produtos Digitais & Sistemas";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          background: "#050914",
          color: "#f6f8ff",
          fontFamily: "Arial, Helvetica, sans-serif",
          padding: "76px 82px",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: 520,
            height: 520,
            borderRadius: 999,
            background: "rgba(79, 105, 255, .32)",
            opacity: 0.5,
            right: -90,
            top: -120,
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 430,
            height: 430,
            borderRadius: 999,
            background: "rgba(151, 80, 255, .25)",
            opacity: 0.45,
            left: 230,
            bottom: -260,
          }}
        />
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", zIndex: 2 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <div
              style={{
                width: 58,
                height: 58,
                borderRadius: 16,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#5F7CFF",
                fontWeight: 900,
                fontSize: 34,
              }}
            >
              N
            </div>
            <div style={{ fontSize: 29, fontWeight: 800, letterSpacing: 7 }}>NEXORA</div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", maxWidth: 940 }}>
            <div style={{ fontSize: 17, textTransform: "uppercase", letterSpacing: 7, color: "#8fa6dc", fontWeight: 700 }}>
              Produtos Digitais & Sistemas
            </div>
            <div style={{ fontSize: 72, lineHeight: 1.03, fontWeight: 800, letterSpacing: -4, marginTop: 24 }}>
              Transformamos ideias em sistemas que funcionam.
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", color: "#8796b3", fontSize: 20 }}>
            <div>Sites · Dashboards · Sistemas Web</div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 9, height: 9, borderRadius: 999, background: "#4de4d2" }} />
              Aceitando novos projetos
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
