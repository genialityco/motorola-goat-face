import { Button } from "@mantine/core";

const fondo = "/FONDO-HOME.png";
const textos = "/TEXTOS_HOME.png";

export default function StepWelcome({ next }: { next: () => void }) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        minHeight: "100dvh",
        minWidth: "100vw",
        backgroundImage: `url(${fondo})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100vw",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src={textos}
          alt="GOAT FACE moto ai"
          style={{
            width: "min(97vw, 460px)",
            height: "auto",
            maxHeight: "85vh",
            aspectRatio: "9/16",
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
        {/* Botón fijo al fondo, centrado horizontal y padding responsive */}
        <Button
          size="xl"
          radius="xl"
          onClick={next}
          style={{
            position: "fixed",
            left: "50%",
            bottom: 32,
            transform: "translateX(-50%)",
            padding: "18px 60px",
            fontWeight: 800,
            fontSize: 22,
            letterSpacing: 1,
            background: "linear-gradient(90deg, #ff7a18, #ffb199 80%)",
            color: "#fff",
            boxShadow: "0 4px 18px 0 rgba(0,0,0,0.25)",
            border: "none",
            zIndex: 10,
            transition: "background 0.2s, box-shadow 0.2s, transform 0.1s",
            cursor: "pointer",
          }}
          // Efecto visual en hover/active (desktop)
          onMouseDown={e => e.currentTarget.style.transform = "translateX(-50%) scale(0.96)"}
          onMouseUp={e => e.currentTarget.style.transform = "translateX(-50%)"}
          onMouseLeave={e => e.currentTarget.style.transform = "translateX(-50%)"}
        >
          Comenzar
        </Button>
      </div>
      {/* Media query para imagen y botón mobile */}
      <style>
        {`
          @media (max-width: 600px) {
            img[alt="GOAT FACE moto ai"] {
              width: 99vw !important;
              max-width: 99vw !important;
              max-height: 82vh !important;
              aspect-ratio: 9/16 !important;
            }
            button {
              font-size: 18px !important;
              padding: 16px 0 !important;
              width: 92vw !important;
              min-width: 0 !important;
            }
          }
        `}
      </style>
    </div>
  );
}
