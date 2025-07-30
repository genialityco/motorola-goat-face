import { Button, Title } from "@mantine/core";
import { motion } from "framer-motion";

const mujer = "/MARCO_MUJER.png";
const logo = "/LOGO_MOTO_IA.png";

export default function StepLoading({ next }: { next: () => void }) {
  return (
    <div className="step-loading-bg" onClick={next}>
      <div className="step-loading-center">
        {/* Imagen principal con animación float/zoom */}
        <img
          src={mujer}
          alt="rostro mujer"
          className="rostro-mujer"
          draggable={false}
        />

        {/* Logo animado con framer-motion */}
        <motion.img
          src={logo}
          alt="Logo moto ai"
          className="logo-moto"
          draggable={false}
          initial={{ opacity: 0, y: -20 }}
          animate={{
            opacity: 1,
            y: [0, 5, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        />

        {/* Título animado con framer-motion */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <Title fw={400} ta="center" c="white" className="step-loading-title">
            ¿Quieres ponerle
            <br />
            cara a tu GOAT?
          </Title>
        </motion.div>

        {/* Texto con efecto shimmer */}
        <div className="step-loading-gradient-text">
          <span className="step-loading-gradient-span">
            Hazlo ahora con el poder
            <br />
            revolucionario de Moto AI
          </span>
        </div>

        {/* Botón con animación pulse y hover */}
        <Button className="step-loading-btn" radius="md">
          Iniciar
        </Button>
      </div>

      <style>{`
        .step-loading-bg {
          position: fixed;
          inset: 0;
          width: 100vw;
          height: 100vh;
          min-height: 100dvh;
          min-width: 100vw;
          background-image: url("/FONDO-AZUL_02.png");
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          cursor: pointer;
        }
        .step-loading-center {
          position: relative;
          width: 100vw;
          height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding-left: 12px;  /* margen horizontal para no tocar bordes */
          padding-right: 12px;
        }
        /* Imagen con animación float + zoom */
        @keyframes floatZoom {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(calc(-50% + 8px), calc(-50% + 6px)) scale(1.05); }
        }
        .rostro-mujer {
          width: 70vw;
          height: 80vh;
          object-fit: cover;
          display: block;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          z-index: 1;
          pointer-events: none;
          user-select: none;
          animation: floatZoom 8s ease-in-out infinite;
        }
        /* Logo sin animación CSS (framer-motion lo anima) */
        .logo-moto {
          position: absolute;
          top: max(5vw, 32px);
          transform: translateX(-50%);
          width: min(220px, 38vw);
          height: auto;
          z-index: 10;
          pointer-events: none;
          user-select: none;
        }
        /* Título con sombra pulsante */
        @keyframes glowPulse {
          0%, 100% { text-shadow: 0 2px 10px #000a; }
          50% { text-shadow: 0 2px 20px #ff6b37cc; }
        }
        .step-loading-title {
          position: absolute;
          top: calc(18vh + 1.5vw);
          left: 50%;
          transform: translateX(-50%);
          font-size: clamp(1.3rem, 4vw, 2rem);
          margin-bottom: 10px;
          line-height: 1.1;
          z-index: 10;
          width: 90vw;
          max-width: 390px;
          animation: glowPulse 3.5s ease-in-out infinite;
          user-select: none;
          color: white;
        }
        /* Texto con efecto shimmer */
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        .step-loading-gradient-text {
          position: absolute;
          left: 50%;
          bottom: calc(24vh + 2vw);
          transform: translateX(-50%);
          width: 92vw;
          max-width: 460px;
          color: #fff;
          text-align: center;
          font-size: clamp(1.02rem, 4vw, 1.28rem);
          font-weight: 400;
          text-shadow: 0 3px 12px #241946a0;
          line-height: 1.32;
          z-index: 12;
          user-select: none;
          letter-spacing: 0.01em;
        }
        .step-loading-gradient-span {
          background: linear-gradient(90deg, #ff6b37 20%, #4fd1ff 40%, #ff6b37 60%);
          background-size: 200% 100%;
          animation: shimmer 4s linear infinite;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-weight: 700;
          filter: drop-shadow(0 2px 6px #ffab5c33);
          font-size: clamp(1.05rem, 4.3vw, 1.34rem);
        }
        /* Botón con animación pulse en sombra y hover */
        @keyframes pulseShadow {
          0%, 100% {
            box-shadow: 0 3px 16px 0 #ff864033;
          }
          50% {
            box-shadow: 0 6px 24px 0 #ffb37666;
          }
        }
        .step-loading-btn {
          z-index: 12;
          position: absolute;
          left: 50%;
          bottom: 10vh;
          transform: translateX(-50%);
          background: linear-gradient(90deg, #ff784f, #ffb376 85%);
          font-size: clamp(1.09rem, 4vw, 1.4rem);
          font-weight: 800;
          padding-inline: 5em;
          letter-spacing: 0.2em;
          border: none;
          box-shadow: 0 3px 16px 0 #ff864033;
          min-width: 120px;
          max-width: 320px;
          animation: pulseShadow 3s ease-in-out infinite;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          cursor: pointer;
        }
        .step-loading-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 8px 32px 0 #ffb376cc;
        }

        /* MOBILE */
        @media (max-width: 600px) {
          .rostro-mujer {
            width: 150vw !important;
            height: 135vh !important;
          }
          .logo-moto {
            top: 12vw !important;
            width: 40vw !important;
          }
          .step-loading-title {
            font-size: 2rem !important;
            max-width: 93vw !important;
          }
          .step-loading-btn {
            font-size: 1rem !important;
            min-width: 55vw !important;
            padding-inline: 0 !important;
          }
          .step-loading-gradient-text {
            bottom: 20vh !important;
          }
        }
        @media (max-width: 420px) {
          .logo-moto {
            width: 53vw !important;
          }
          .step-loading-title {
            font-size: 1.07rem !important;
          }
          .step-loading-btn {
            font-size: 0.92rem !important;
            min-width: 62vw !important;
            padding-inline: 0 !important;
          }
        }
      `}</style>
    </div>
  );
}
