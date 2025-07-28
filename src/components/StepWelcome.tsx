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
        cursor: "pointer",
        touchAction: "manipulation", // mejora el tap en móvil
      }}
      onClick={next}
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
            width: "min(97vw, 460px)",    // Máximo ancho fijo en desktop, nunca desborda en móvil
            height: "auto",
            maxHeight: "85vh",            // Máximo alto en pantalla
            aspectRatio: "9/16",          // Mantiene relación vertical (útil para mobile)
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
      </div>
      {/* Media query CSS para asegurar aún mejor el ajuste en móviles */}
      <style>
        {`
          @media (max-width: 600px) {
            img[alt="GOAT FACE moto ai"] {
              width: 99vw !important;
              max-width: 99vw !important;
              max-height: 92vh !important;
              aspect-ratio: 9/16 !important;
            }
          }
        `}
      </style>
    </div>
  );
}
