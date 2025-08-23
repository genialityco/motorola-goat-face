// components/StepUploadPhoto.tsx
import { motion, useAnimation } from "framer-motion";
import { useMemo } from "react";

interface Props {
  next: () => void;
}

const centralImage = "/MARCO-BLANCO.png";
const TRAILS = 5;

function getRandomPolarCoord(radiusRange = [140, 180]) {
  const angle = Math.random() * 2 * Math.PI;
  const radius =
    Math.random() * (radiusRange[1] - radiusRange[0]) + radiusRange[0];
  return {
    left: `calc(50% + ${Math.cos(angle) * radius}px)`,
    top: `calc(50% + ${Math.sin(angle) * radius}px)`,
    angle,
    radius,
  };
}

export default function StepUploadPhoto({ next }: Props) {
  const controls = useAnimation();

  const trails = useMemo(
    () =>
      Array.from({ length: TRAILS }).map(() => ({
        seed: Math.random(),
        ...getRandomPolarCoord(),
      })),
    []
  );

  const handleNext = async () => {
    // micro animación del botón
    await controls.start({
      scale: [1, 0.95, 1.06, 1],
      boxShadow: [
        "0 4px 18px 0 rgba(0,0,0,0.09)",
        "0 1px 8px 0 rgba(0,0,0,0.13)",
        "0 6px 36px 0 #ff6b3720",
        "0 4px 18px 0 rgba(0,0,0,0.09)",
      ],
      transition: { duration: 0.38 },
    });
    next();
  };

  return (
    <motion.div
      className="step-welcome-bg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="step-welcome-center">
        {/* Glow */}
        <div className="step-welcome-glow" aria-hidden />

        {/* Trails */}
        <div className="step-welcome-trail-area">
          {trails.map((trail, i) => (
            <motion.span
              key={trail.seed}
              className="step-welcome-trail"
              initial={{
                opacity: 0,
                scale: 0.4,
                left: trail.left,
                top: trail.top,
              }}
              animate={{
                opacity: [0, 0.7, 0],
                scale: [0.45, 1.05, 0.7],
                left: [
                  trail.left,
                  `calc(50% + ${
                    Math.cos(trail.angle + 0.5) * (trail.radius + 25)
                  }px)`,
                  trail.left,
                ],
                top: [
                  trail.top,
                  `calc(50% + ${
                    Math.sin(trail.angle + 0.5) * (trail.radius + 25)
                  }px)`,
                  trail.top,
                ],
                rotate: [0, 40, 0],
              }}
              transition={{
                duration: 1.9 + i * 0.17,
                delay: i * 0.45,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
              }}
              style={{
                position: "absolute",
                zIndex: 4,
                pointerEvents: "none",
                background:
                  "linear-gradient(92deg, #fff8 25%, #ffb376 70%, #fff0 100%)",
                filter: "blur(2px) brightness(1.16)",
                width: 62,
                height: 7,
                borderRadius: 14,
                boxShadow: "0 0 14px 0 #fff9, 0 0 22px 4px #ffb37644",
                opacity: 0,
              }}
            />
          ))}
        </div>

        {/* Logo superior (si lo usas en este paso) */}
        <motion.img
          src="/LOGOS_SUPERIOR.png"
          alt="Logo superior"
          className="step-welcome-logo"
          draggable={false}
          animate={{ scale: [1, 1.04, 1], y: [0, -14, 0] }}
          transition={{ duration: 2.3, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Marco y contenido */}
        <div className="step-welcome-content">
          {/* Marco */}
          <motion.img
            src={centralImage}
            alt="Marco"
            className="step-welcome-image"
            draggable={false}
            animate={{ scale: [1, 1.04, 1], y: [0, -14, 0] }}
            transition={{ duration: 2.3, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Imagen superior dentro del marco */}
          <motion.img
            src="/FOTOS_SUPERIORES.png"
            alt="Fotos superiores"
            className="step-welcome-fotos"
            draggable={false}
            animate={{ scale: [1, 1.02, 1], y: [0, -8, 0] }}
            transition={{ duration: 2.3, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Imagen pasos a seguir en la parte media */}
          <motion.img
            src="/PASOS_A_SEGUIR.png"
            alt="Pasos a seguir"
            className="step-welcome-pasos"
            draggable={false}
            animate={{ scale: [1, 1.02, 1], y: [0, -8, 0] }}
            transition={{ duration: 2.3, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Botón */}
          <motion.div
            className="step-welcome-btn-wrapper"
            animate={{ scale: [1, 1.04, 1], y: [0, -14, 0] }}
            transition={{ duration: 2.3, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.button
              onClick={handleNext}
              animate={controls}
              className="step-welcome-btn"
              style={{
                fontSize: "21px",
                padding: "0",
                boxShadow: "inset 0 4px 6px rgba(0,0,0,0.3)",
                marginBottom: "21px",
              }}
            >
              Vamos
            </motion.button>
          </motion.div>
        </div>
      </div>

      <style>{`
        .step-welcome-bg {
          position: fixed;
          inset: 0;
          width: 100vw;
          height: 100vh;
          background-image: url("/FONDO-AZUL_02.png");
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          padding: 0;
          z-index: 10;
        }
        .step-welcome-center {
          width: 100vw;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          padding: 0 12px;
          box-sizing: border-box;
        }
        .step-welcome-content {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .step-welcome-trail-area {
          position: absolute;
          top: 0; left: 0;
          width: 100vw; height: 100vh;
          pointer-events: none;
          z-index: 4;
        }
        .step-welcome-trail { opacity: 0; }

        .step-welcome-glow {
          position: absolute;
          top: 48%; left: 50%;
          transform: translate(-50%, -52%);
          width: 480px; height: 600px;
          background: radial-gradient(ellipse at 50% 50%, #ff6b37b0 0 36%, #ffb37635 65%, #fff0 100%);
          filter: blur(40px) brightness(1.13) saturate(1.15);
          z-index: 0; opacity: 0.55;
          animation: step-glow 3.8s ease-in-out infinite alternate;
          pointer-events: none; user-select: none;
          transition: width 0.3s, height 0.3s;
        }
        @keyframes step-glow {
          0% { opacity: 0.45; filter: blur(40px) brightness(1.1);}
          50% { opacity: 0.68; filter: blur(60px) brightness(1.20);}
          100% { opacity: 0.5; filter: blur(40px) brightness(1.13);}
        }

        .step-welcome-image {
          width: 340px; max-width: 92vw;
          aspect-ratio: 9.5 / 16;
          object-fit: contain;
          pointer-events: none; user-select: none;
          display: block; transition: all 0.22s;
          position: relative; z-index: 2; background: none;
        }

        .step-welcome-logo {
          transform: translateX(-50%);
          width: 250px;
          z-index: 3;
          pointer-events: none;
          margin-bottom: 20px;
        }

        /* Overlays dentro del marco */
        .step-welcome-fotos {
          position: absolute;
          top: 10%;
          transform: translateX(-50%);
          width: 70%;
          max-width: 260px;
          z-index: 3;
          pointer-events: none;
        }
        .step-welcome-pasos {
          position: absolute;
          top: 35%;
          transform: translateX(-50%);
          width: 65%;
          max-width: 240px;
          z-index: 3;
          pointer-events: none;
        }

        .step-welcome-btn-wrapper {
          position: absolute;
          bottom: 30px;
          transform: translateX(-50%);
          z-index: 3;
          display: flex;
          justify-content: center; align-items: center;
        }
        .step-welcome-btn {
          font-weight: 800;
          letter-spacing: 1px;
          border-radius: 4px;
          border: none;
          cursor: pointer; outline: none;
          background: linear-gradient(135deg, #0d1b3d, #3d95ff);
          color: white; overflow: hidden;
          width: 100%; max-width: 200px; min-width: 140px;
          box-sizing: border-box;
          transition: background 0.3s ease;
        }

        /* Responsivo */
        @media (max-width: 1024px) {
          .step-welcome-image { width: 300px; max-width: 80vw; }
          .step-welcome-glow { width: 340px; height: 420px; }
          .step-welcome-btn-wrapper { bottom: 15px; }
        }
        @media (max-width: 600px) {
          .step-welcome-image { width: 90vw; max-width: 90vw; border-radius: 11px; }
          .step-welcome-center { justify-content: center; padding-top: 5vh; }
          .step-welcome-btn { font-size: 16px; padding: 15px 0; max-width: 180px; }
          .step-welcome-btn-wrapper { bottom: 10px; }
        }
        @media (max-width: 400px) {
          .step-welcome-image { width: 92vw; }
          .step-welcome-btn { font-size: 14px; padding: 11px 0; max-width: 160px; }
          .step-welcome-btn-wrapper { bottom: 5px; }
        }
      `}</style>
    </motion.div>
  );
}
