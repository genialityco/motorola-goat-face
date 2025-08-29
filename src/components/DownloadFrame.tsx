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
        // Escudo MÁS GRANDE: subí el clamp
        width: "clamp(400px, 52vw, 720px)",
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
          width: "clamp(74%, 78%, 80%)",
          height: "100%",
          marginLeft: "clamp(2%, 11%, 12%)",
        }}
      >
        <mask id="shieldMask" maskUnits="userSpaceOnUse">
          <rect width={W} height={H} fill="black" />
          {(() => {
            const offset = 12;

            const d = `
      M${209},${58 + offset}
      C${200 - offset},${45 + offset} ${314 - offset},${72 + offset} ${
              384 - offset
            },${100 + offset}
      L${354 - offset},260
      C${374 - offset},${300 - offset} ${250},${390 - offset} ${219},${
              408 - offset
            }
      C${188},${340 - offset} ${84 + offset},${300 - offset} ${84 + offset},260
      L${64 + offset},${70 + offset}
      C${104 + offset},${82 + offset} ${158 + offset},${65 + offset} ${219},${
              18 + offset
            }
      Z
    `;

            return <path fill="white" d={d} />;
          })()}
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
          background: url('/FONDO_OBSEQUIO.jpg') center no-repeat;
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
          // Header arriba (logos) + contenido centrado
          gridTemplateRows: "auto 1fr",
          alignItems: "center",
          justifyItems: "center",
          padding: "clamp(12px, 3vw, 28px)",
          boxSizing: "border-box",
          gap: "clamp(8px, 2vh, 20px)",
        }}
      >
        {/* HEADER: Logos superiores (incluidos en la captura) */}
        <div
          style={{
            width: "100%",
            display: "grid",
            placeItems: "center",
          }}
        >
          <img
            src="/LOGOS_OBSEQUIO.png"
            alt="Logos"
            loading="eager"
            style={{
              width: "min(88vw, 720px)",
              height: "auto",
              objectFit: "contain",
              // margen superior sutil
              marginTop: "clamp(2px, 1vh, 12px)",
              userSelect: "none",
            }}
            draggable={false}
          />
        </div>

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
