import { Button, Title } from "@mantine/core";

const mujer = "/MARCO_MUJER.png";
const logo = "/LOGO_MOTO_IA.png";

export default function StepLoading({ next }: { next: () => void }) {
  const isMobile = window.innerWidth <= 600;
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
        {/* Imagen principal, más grande y en fondo */}
        <img
          src={mujer}
          alt="rostro mujer"
          style={{
            width: isMobile ? "130vw" : "70vw",
            height: isMobile ? "120vh" : "80vh",
            objectFit: "cover",
            display: "block",
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 1,
            pointerEvents: "none",
            userSelect: "none",
          }}
          draggable={false}
        />

        {/* Logo arriba */}
        <img
          src={logo}
          alt="Logo moto ai"
          style={{
            position: "absolute",
            top: "max(5vw, 32px)",
            left: "50%",
            transform: "translateX(-50%)",
            width: "min(220px, 38vw)",
            height: "auto",
            zIndex: 10,
            pointerEvents: "none",
            userSelect: "none",
          }}
          draggable={false}
        />

        {/* Título */}
        <Title
          fw={400}
          ta="center"
          c="white"
          style={{
            position: "absolute",
            top: "calc(18vh + 1.5vw)",
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: "clamp(1.3rem, 4vw, 2rem)",
            marginBottom: 10,
            lineHeight: 1.1,
            zIndex: 10,
            width: "90vw",
            maxWidth: 390,
            textShadow: "0 2px 10px #000a",
          }}
        >
          ¿Quieres ponerle
          <br />
          cara a tu GOAT?
        </Title>

        {/* Texto con degradado */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            bottom: "calc(24vh + 2vw)",
            transform: "translateX(-50%)",
            width: "92vw",
            maxWidth: 460,
            color: "#fff",
            textAlign: "center",
            fontSize: "clamp(1.02rem, 4vw, 1.28rem)",
            fontWeight: 400,
            textShadow: "0 3px 12px #241946a0",
            lineHeight: 1.32,
            zIndex: 12,
            userSelect: "none",
            letterSpacing: 0.01,
          }}
        >
          <span
            style={{
              background: "linear-gradient(90deg, #ff6b37, #4fd1ff 90%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontWeight: 700,
              filter: "drop-shadow(0 2px 6px #ffab5c33)",
              fontSize: "clamp(1.05rem, 4.3vw, 1.34rem)",
            }}
          >
            Hazlo ahora con el poder
            <br />
            revolucionario de Moto AI
          </span>
        </div>

        {/* Botón */}
        <Button
          style={{
            zIndex: 12,
            position: "absolute",
            left: "50%",
            bottom: "10vh",
            transform: "translateX(-50%)",
            background: "linear-gradient(90deg, #ff784f, #ffb376 85%)",
            fontSize: "clamp(1.09rem, 4vw, 1.4rem)",
            padding: "0.92em 3.2em",
            fontWeight: 800,
            letterSpacing: 0.2,
            border: "none",
            boxShadow: "0 3px 16px 0 #ff864033",
            minWidth: 120,
            maxWidth: 320,
          }}
          size="compact-xl"
          radius="md"
          onClick={next}
        >
          Iniciar
        </Button>
      </div>

      {/* Media queries para mejorar el responsive */}
      <style>
        {`
          @media (max-width: 600px) {
            img[alt="rostro mujer"] {
              width: 150vw !important;
              height: 135vh !important;
            }
            img[alt="Logo moto ai"] {
              top: 12vw !important;
              width: 40vw !important;
            }
            h1, .mantine-Title-root {
              font-size: 2rem !important;
              max-width: 93vw !important;
            }
            button {
              font-size: 1rem !important;
              min-width: 55vw !important;
              padding-inline: 0 !important;
            }
            div[style*="bottom: calc(24vh"] {
              bottom: 20vh !important;
            }
          }
          @media (max-width: 420px) {
            img[alt="Logo moto ai"] {
              width: 53vw !important;
            }
            h1, .mantine-Title-root {
              font-size: 1.07rem !important;
            }
            button {
              font-size: 0.92rem !important;
              min-width: 62vw !important;
              padding-inline: 0 !important;
            }
          }
        `}
      </style>
    </div>
  );
}
