import { useRef } from "react";
import { motion } from "framer-motion";
import * as htmlToImage from "html-to-image";
import { useSearchParams } from "react-router-dom";

import frameSrc from "/ESCUDO.png";

// Marco con máscara de escudo y foto centrada (FULL responsive)
function ShieldPhoto({ src }: { src: string }) {
  const W = 438;
  const H = 454;

  return (
    <div
      className="shield"
      style={{
        position: "relative",
        // Escala fluida del escudo: mínimo 260px, crece con viewport, máximo 560px
        width: "clamp(260px, 38vw, 560px)",
        aspectRatio: `${W} / ${H}`,
        display: "grid",
        placeItems: "center",
      }}
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid meet"
        style={{
          position: "absolute",
          inset: 0,
          // >> ANTES: width: "65%", marginLeft: "50px"
          // Ahora fluidos: la foto ocupa ~64–70% del ancho del escudo
          // y el corrimiento lateral se ajusta con el tamaño de pantalla.
          width: "clamp(62%, 66%, 70%)",
          height: "100%",
          marginLeft: "clamp(4%, 20%, 17.5%)",
        }}
      >
        <mask id="shieldMask" maskUnits="userSpaceOnUse">
          <rect width={W} height={H} fill="black" />
          <path
            fill="white"
            d="M219,18C300,45 354,62 384,70L384,260C384,332 285,405 219,438C153,405 54,332 54,260L54,70C94,62 138,45 219,18Z"
          />
        </mask>
        <image
          href={src}
          width={W}
          height={H}
          preserveAspectRatio="xMidYMid slice"
          mask="url(#shieldMask)"
        />
      </svg>

      <img
        src={frameSrc}
        alt="Marco"
        loading="lazy"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "contain",
          pointerEvents: "none",
          userSelect: "none",
        }}
        draggable={false}
      />
    </div>
  );
}


export default function DownloadFrame() {
  const [params] = useSearchParams();
  const photoUrl = params.get("url"); // ?url=...

  const captureRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!captureRef.current) return;

    const dataUrl = await htmlToImage.toPng(captureRef.current, {
      pixelRatio: 2,
      cacheBust: true,
      // Excluir elementos con esta clase (p.ej. el botón)
      filter: (node) =>
        !(node instanceof HTMLElement && node.classList.contains("no-capture")),
    });

    const link = document.createElement("a");
    link.download = "mi-imagen.png";
    link.href = dataUrl;
    link.click();
  };
  const BG_W = 1080;
const BG_H = 1920;

  return (
    <>
    
      <style>
      {`
        .bg-containX-coverY {
          background: url('/FONDO_ENTREGABLE_MOTOROLA.png') center no-repeat;
          background-size: 100% auto; /* contiene al ancho */
        }
        @media (max-aspect-ratio: ${BG_W}/${BG_H}) {
          .bg-containX-coverY {
            background-size: auto 100%; /* cubre al alto si el viewport es más estrecho */
          }
        }
      `}
    </style>
    <motion.div
      ref={captureRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="bg-containX-coverY"
      style={{
        width: "100vw",
        height: "100vh",
        display: "grid",
        placeItems: "center",
        padding: "clamp(12px, 3vw, 28px)",
        boxSizing: "border-box",
      }}
    >
      {/* Centro: marco + foto (centrado y responsive) */}
      <div
        style={{
          display: "grid",
          placeItems: "center",
          width: "100%",
          height: "100%",
        }}
      >
        {photoUrl && <ShieldPhoto src={photoUrl} />}
      </div>

      {/* Botón fijo (excluido de la captura) */}
      <motion.button
        onClick={handleDownload}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="no-capture"
        style={{
          position: "fixed",
          bottom: "10px",
          right: "10px",
          borderRadius: 10,
          border: "none",
          background: "#2AB8FF",
          color: "#fff",
          fontWeight: 700,
          cursor: "pointer",
          boxShadow: "0 6px 16px rgba(0,0,0,.25)",
          fontSize: "clamp(10px, 2.3vw, 16px)",
          padding: "clamp(6px, 1.5vw, 10px) clamp(10px, 2vw, 16px)",
        }}
      >
        Descargar imagen
      </motion.button>
    </motion.div>
    </>
  );
}
