import { useEffect } from "react";
import { motion } from "framer-motion";

const background = "/FONDO-AZUL_01.png";
const frameSrc = "/CUADRO-LOADING.png";   // Marco contenedor
const topOverlay = "/LOADING.png";        // Imagen superior (loading) — rota
const bottomOverlay = "/TEXTOS-03.svg";   // Imagen inferior

export default function StepPublicity({ next }: { next: () => void }) {
  // Avance automático a los 30s
  useEffect(() => {
    const t = setTimeout(() => next(), 3000);
    return () => clearTimeout(t);
  }, [next]);

  const handleActivate = () => next();

  return (
    <motion.div
      className="publi-bg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="publi-center">
        <motion.div
          className="publi-card"
          role="button"
          tabIndex={0}
          onClick={handleActivate}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") handleActivate();
          }}
          whileTap={{ scale: 0.98 }}
          animate={{ scale: [1, 1.02, 1], y: [0, -8, 0] }}
          transition={{ duration: 2.3, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Marco */}
          <img src={frameSrc} alt="Marco GOAT" className="publi-frame" draggable={false} />

          {/* Overlays dentro del marco */}
          <div className="publi-overlays" aria-hidden>
            {/* Loading con giro infinito */}
            <motion.img
              src={topOverlay}
              alt=""
              className="publi-overlay-top"
              draggable={false}
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, ease: "linear", duration: 2.2 }}
            />
            <img
              src={bottomOverlay}
              alt=""
              className="publi-overlay-bottom"
              draggable={false}
            />
          </div>
        </motion.div>
      </div>

      <style>{`
        .publi-bg {
          position: fixed;
          inset: 0;
          width: 100vw;
          height: 100vh;
          background-image: url(${background});
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          display: grid;
          place-items: center;
          overflow: hidden;
          z-index: 10;
        }

        .publi-center {
          width: 100%;
          height: 100%;
          display: grid;
          place-items: center;
          padding: 0 12px;
          box-sizing: border-box;
        }

        .publi-card {
          position: relative;
          width: 340px;
          max-width: 92vw;
          aspect-ratio: 9.5 / 16;
          cursor: pointer;
          user-select: none;
          outline: none;
        }

        .publi-frame {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: contain;
          border-radius: 16px;
          display: block;
          z-index: 1;
        }

        .publi-overlays {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          z-index: 2;
          pointer-events: none;
          padding: 10% 8%;   /* menos padding para ganar área útil */
          gap: 6%;           /* separación proporcional entre loading y texto */
        }

        .publi-overlay-top {
          width: 52%;
          max-width: 75%;
          height: auto;
          object-fit: contain;
        }

        /* TEXTOS-03 más grande */
        .publi-overlay-bottom {
          width: 85%;        /* antes 72% */
          max-width: 92%;    /* crece mejor en pantallas grandes */
          height: auto;
          object-fit: contain;
          margin-bottom: 15%; /* un poco más de margen inferior */
        }

        @media (max-width: 768px) {
          .publi-card { width: 300px; }
          .publi-overlays { padding: 11% 9%; gap: 7%; }
          .publi-overlay-top { width: 56%; }
          .publi-overlay-bottom { width: 82%; }
        }

        @media (max-width: 420px) {
          .publi-card { width: 92vw; }
          .publi-overlays { padding: 12% 10%; gap: 8%; }
          .publi-overlay-top { width: 58%; }
          .publi-overlay-bottom { width: 86%; }
        }
      `}</style>
    </motion.div>
  );
}
