import { useRef } from "react";
import { motion } from "framer-motion";
import * as htmlToImage from "html-to-image";
import { useSearchParams } from "react-router-dom";

import frameSrc from "/ESCUDO.png";
import logo from "/LOGOS_SUPERIOR.png";
import logosFooter from "/LOGOS.png";

// Marco con máscara de escudo y foto centrada
function ShieldPhoto({ src, size = 360 }: { src: string; size?: number }) {
  const W = 438;
  const H = 454;

  return (
    <div
      style={{
        position: "relative",
        width: size,
        height: size,
        display: "grid",
        placeItems: "center",
      }}
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid meet"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      >
        <mask id="shieldMask" maskUnits="userSpaceOnUse">
          <rect width={W} height={H} fill="black" />
          <path
            fill="white"
            d="M219,18C300,45 354,62 394,70L394,260C394,342 305,405 219,438C133,405 44,342 44,260L44,70C84,62 138,45 219,18Z"
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

  return (
    <motion.div
      ref={captureRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      style={{
        width: "100vw",
        height: "100vh",
        background: "url('/FONDO-AZUL_01.png') center/cover no-repeat",
        display: "grid",
        gridTemplateRows: "auto 1fr auto",
        justifyItems: "center",
        alignItems: "center",
        padding: "clamp(12px, 3vw, 28px)",
        boxSizing: "border-box",
        gap: "clamp(8px, 2vw, 16px)",
      }}
    >
      {/* Logo top */}
      <img
        src={logo}
        alt="Logo"
        style={{
          width: "min(80vw, 320px)",
          height: "auto",
          objectFit: "contain",
        }}
      />

      {/* Centro: marco + foto (centrado) */}
      <div
        style={{
          display: "grid",
          placeItems: "center",
          width: "100%",
          height: "100%",
        }}
      >
        {photoUrl && (
          <ShieldPhoto
            src={photoUrl}
            size={typeof window !== "undefined" ? undefined : 360}
          />
        )}

        {/* Tamaño responsivo del marco */}
        <style>{`
          @media (min-width: 0px) {
            .shield-size { width: clamp(260px, 38vw, 520px); height: clamp(260px, 38vw, 520px); }
          }
        `}</style>
      </div>

      {/* Footer logos */}
      <img
        src={logosFooter}
        alt="Patrocinadores"
        style={{
          width: "min(70vw, 280px)",
          height: "auto",
          marginTop: "auto",
          marginBottom: "max(12px, env(safe-area-inset-bottom))",
          objectFit: "contain",
        }}
      />

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
          fontSize: "clamp(5px, 2.5vw, 18px)",
        }}
      >
        Descargar imagen
      </motion.button>
    </motion.div>
  );
}
