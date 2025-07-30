import { motion, useAnimation } from "framer-motion";
import { useMemo } from "react";

const fondo = "/FONDO-HOME.png";
const centralImage = "/TEXTOS_HOME.png";

// Cantidad de estelas simultáneas
const TRAILS = 5;

// Función para generar coordenadas polares aleatorias (alrededor de la imagen)
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

export default function StepWelcome({ next }: { next: () => void }) {
  const controls = useAnimation();

  // Para cada render, generamos una seed para que la animación y ubicación sean independientes
  const trails = useMemo(
    () =>
      Array.from({ length: TRAILS }).map(() => ({
        seed: Math.random(),
        ...getRandomPolarCoord(),
      })),
    []
  );

  // Animación del botón
  const handleButtonClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
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
        {/* Glow animado */}
        <div className="step-welcome-glow" aria-hidden />

        {/* --- Trail Effect --- */}
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
                // Puedes cambiar color/gradient aquí:
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

        {/* Imagen central animada */}
        <motion.img
          src={centralImage}
          alt="GOAT FACE moto ai"
          className="step-welcome-image"
          draggable={false}
          animate={{
            scale: [1, 1.04, 1],
            y: [0, -14, 0],
          }}
          transition={{
            duration: 2.3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Botón animado */}
        <motion.div
          animate={controls}
          whileHover={{
            scale: 1.045,
            boxShadow: "0 8px 24px 0 #ffb37644, 0 2px 9px 0 rgba(0,0,0,0.14)",
          }}
          style={{ display: "inline-block" }}
        >
          <motion.button
            onClick={handleButtonClick}
            onMouseDown={(e) =>
              (e.currentTarget.style.transform = "scale(0.96)")
            }
            onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            style={{
              fontWeight: 800,
              letterSpacing: 1,
              borderRadius: 8,
              border: "none",
              padding: "18px 60px",
              cursor: "pointer",
              outline: "none",
              boxShadow: "0 4px 18px 0 rgba(0,0,0,0.09)",
              color: "#222",
              background: "white",
              position: "relative",
              overflow: "hidden",
              fontSize: 21,
              width: 300,
              maxWidth: "85vw",
            }}
            animate={{
              backgroundPosition: ["200% 0", "0% 0"],
              backgroundSize: ["200% 100%", "200% 100%"],
              color: ["#222", "#ff7f32", "#222"],
              backgroundImage: [
                "linear-gradient(90deg, #fff 40%, #ffb376 50%, #fff 60%)",
                "linear-gradient(90deg, #ffb376 40%, #fff 50%, #ffb376 60%)",
                "linear-gradient(90deg, #fff 40%, #ffb376 50%, #fff 60%)",
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            Comenzar
          </motion.button>
        </motion.div>
      </div>

      <style>{`
        .step-welcome-bg {
          position: fixed;
          inset: 0;
          width: 100vw;
          height: 100vh;
          background-image: url(${fondo});
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
          gap: 36px;
        }
        .step-welcome-trail-area {
          position: absolute;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          pointer-events: none;
          z-index: 4;
        }
        .step-welcome-trail {
          opacity: 0;
          /* transition: opacity 0.3s; // Animado por framer */
        }
        .step-welcome-glow {
          position: absolute;
          top: 48%;
          left: 50%;
          transform: translate(-50%, -52%);
          width: 480px;
          height: 600px;
          background: radial-gradient(ellipse at 50% 50%, #ff6b37b0 0 36%, #ffb37635 65%, #fff0 100%);
          filter: blur(40px) brightness(1.13) saturate(1.15);
          z-index: 0;
          opacity: 0.55;
          animation: step-glow 3.8s ease-in-out infinite alternate;
          pointer-events: none;
          user-select: none;
          transition: width 0.3s, height 0.3s;
        }
        @keyframes step-glow {
          0%   { opacity: 0.45; filter: blur(40px) brightness(1.1);}
          50%  { opacity: 0.68; filter: blur(60px) brightness(1.20);}
          100% { opacity: 0.5; filter: blur(40px) brightness(1.13);}
        }
        .step-welcome-image {
          width: 340px;
          max-width: 92vw;
          aspect-ratio: 9/16;
          object-fit: cover;
          border-radius: 22px;
          pointer-events: none;
          user-select: none;
          display: block;
          transition: all 0.22s;
          position: relative;
          z-index: 2;
          background: none;
        }
        .step-welcome-btn {
          width: 300px;
          max-width: 85vw;
          font-size: 21px;
          margin-top: 10px;
          z-index: 3;
          padding: 18px 0;
        }
        /* Tabletas y portátiles */
        @media (max-width: 1024px) {
          .step-welcome-image { width: 260px; }
          .step-welcome-glow { width: 340px; height: 420px; }
          .step-welcome-btn { width: 220px; font-size: 18px; }
        }
        /* Celulares grandes */
        @media (max-width: 600px) {
          .step-welcome-image {
            width: 98vw;
            max-width: 98vw;
            border-radius: 11px;
            margin-top: 4vw;
            margin-bottom: 2vw;
          }
          .step-welcome-glow {
            width: 93vw;
            height: 125vw;
            filter: blur(22px) brightness(1.13);
            left: 49.6%;
          }
          .step-welcome-btn {
            font-size: 16px;
            width: 87vw;
            max-width: 97vw;
            padding: 15px 0;
          }
        }
        /* Celulares XS */
        @media (max-width: 400px) {
          .step-welcome-btn {
            font-size: 14px;
            margin-top: 6vw;
            padding: 11px 0;
          }
          .step-welcome-image { border-radius: 7px; }
        }
      `}</style>
    </motion.div>
  );
}
