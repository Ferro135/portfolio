import { ImageResponse } from "next/og";

export const alt = "ALUNERI — Produtos Digitais & Sistemas";
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
          background: "#070B12",
          color: "#F5F7FB",
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
            background: "rgba(125, 211, 252, .28)",
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
            background: "rgba(167, 139, 250, .22)",
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
                background: "#7DD3FC",
                fontWeight: 900,
                fontSize: 34,
              }}
            >
              A
            </div>
            <div style={{ fontSize: 29, fontWeight: 800, letterSpacing: 7 }}>ALUNERI</div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", maxWidth: 940 }}>
            <div style={{ fontSize: 17, textTransform: "uppercase", letterSpacing: 7, color: "#7DD3FC", fontWeight: 700 }}>
              Produtos Digitais & Sistemas
            </div>
            <div style={{ fontSize: 72, lineHeight: 1.03, fontWeight: 800, letterSpacing: -4, marginTop: 24 }}>
              Transformamos ideias em sistemas que funcionam.
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", color: "#94A3B8", fontSize: 20 }}>
            <div>Sites · Dashboards · Sistemas Web</div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 9, height: 9, borderRadius: 999, background: "#5EEAD4" }} />
              Aceitando novos projetos
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
