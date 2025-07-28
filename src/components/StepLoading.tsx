import { useEffect } from "react";

const mujer = "/MARCO_MUJER.png";
const logo = "/LOGO_MOTO_IA.png";

export default function StepLoading({ next }: { next: () => void }) {
  useEffect(() => {
    const t = setTimeout(next, 1800);
    return () => clearTimeout(t);
  }, [next]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        minHeight: "100dvh",
        minWidth: "100vw",
        backgroundImage: 'url("/FONDO-AZUL_02.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        cursor: "pointer",
      }}
      onClick={next}
    >
      {/* Wrapper para mantener centrado el contenido */}
      <div
        style={{
          position: "relative",
          width: "100vw",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Imagen principal centrada */}
        <img
          src={mujer}
          alt="rostro mujer"
          style={{
            width: "min(95vw, 450px)",
            height: "auto",
            maxHeight: "76vh",
            maxWidth: "97vw",
            display: "block",
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 2,
            pointerEvents: "none",
            userSelect: "none",
          }}
          draggable={false}
        />

        {/* Logo, siempre visible arriba */}
        <img
          src={logo}
          alt="Logo moto ai"
          style={{
            position: "absolute",
            top: "max(4vw, 28px)",
            left: "50%",
            transform: "translateX(-50%)",
            width: "min(220px, 36vw)",
            height: "auto",
            zIndex: 10,
            pointerEvents: "none",
            userSelect: "none",
          }}
          draggable={false}
        />

        {/* Loader SVG animado */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "min(175px, 32vw)",
            height: "min(175px, 32vw)",
            maxWidth: 210,
            maxHeight: 210,
            transform: "translate(-50%, -55%)",
            zIndex: 20,
            pointerEvents: "none",
            userSelect: "none",
            animation: "spin 1.5s linear infinite",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 120 120"
            style={{
              display: "block",
              filter: "drop-shadow(0 0 8px #8AD5F7bb)",
            }}
          >
            {[...Array(18)].map((_, i) => {
              const angle = i * 20 - 90;
              const rad = (angle * Math.PI) / 180;
              const x1 = 60 + 35 * Math.cos(rad);
              const y1 = 60 + 35 * Math.sin(rad);
              const x2 = 60 + 50 * Math.cos(rad);
              const y2 = 60 + 50 * Math.sin(rad);
              const color = i % 2 === 0 ? "#A661FF" : "#FF4FC6";
              return (
                <line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={color}
                  strokeWidth="6"
                  strokeLinecap="round"
                  opacity={0.85 - 0.035 * i}
                />
              );
            })}
          </svg>
        </div>

        {/* Texto en la parte inferior */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            bottom: "7vw",
            transform: "translateX(-50%)",
            width: "92vw",
            maxWidth: 480,
            color: "#fff",
            textAlign: "center",
            fontSize: "clamp(1.12rem, 5vw, 2.1rem)",
            fontWeight: 400,
            textShadow: "0 3px 12px #241946a0",
            lineHeight: 1.3,
            zIndex: 12,
            userSelect: "none",
            letterSpacing: 0.01,
          }}
        >
          Cargando foto a toda
          <br />
          velocidad gracias a la <b>IA</b>
          <br />
          <span style={{ color: "#8AD5F7" }}>Motorola de última</span>
          <br />
          <span style={{ color: "#8AD5F7" }}>
            <b> generación</b>
          </span>
        </div>
      </div>

      {/* Animación CSS para girar */}
      <style>
        {`
          @keyframes spin {
            100% { transform: translate(-50%, -55%) rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}
