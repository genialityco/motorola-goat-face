import { Button } from "@mantine/core";

const fondo = "/FONDO-HOME.png";
const centralImage = "/TEXTOS_HOME.png";

export default function StepWelcome({ next }: { next: () => void }) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        backgroundImage: `url(${fondo})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        overflow: "hidden",
        padding: 0,
      }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img
          src={centralImage}
          alt="GOAT FACE moto ai"
          style={{
            width: "min(90vw, 600px)",
            maxWidth: 600,
            aspectRatio: "9/16",
            objectFit: "cover",
            borderRadius: "24px",
            pointerEvents: "none",
            userSelect: "none",
            display: "block",
            transition: "all 0.2s"
          }}
          draggable={false}
        />

        <Button
          size="xl"
          radius="md"
          onClick={next}
          style={{
            width: "min(85vw, 320px)",
            fontWeight: 800,
            fontSize: 22,
            letterSpacing: 1,
            background: "#fff",
            color: "#222",
            boxShadow: "0 4px 18px 0 rgba(0,0,0,0.09)",
            border: "none",
            transition: "background 0.2s, box-shadow 0.2s, transform 0.1s",
            cursor: "pointer",
          }}
          onMouseDown={e => (e.currentTarget.style.transform = "scale(0.96)")}
          onMouseUp={e => (e.currentTarget.style.transform = "scale(1)")}
          onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
        >
          Comenzar
        </Button>
      </div>

      <style>
        {`
          @media (max-width: 600px) {
            img[alt="GOAT FACE moto ai"] {
              width: 99vw !important;
              max-width: 99vw !important;
              aspect-ratio: 9/16 !important;
              border-radius: 8px !important;
              margin-top: 4vw !important;
              margin-bottom: 2vw !important;
            }
            button {
              font-size: 16px !important;
              width: 60vw !important;
              max-width: 97vw !important;
            }
          }
        `}
      </style>
    </div>
  );
}
