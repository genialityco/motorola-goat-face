import { Text } from "@mantine/core";
import { useEffect, useState, useMemo } from "react";
import { io } from "socket.io-client";
import { motion, useAnimation } from "framer-motion";

interface Props {
  next: () => void;
  prev?: () => void;
  setPhoto: (url: string) => void;
}

const SOCKET_URL = "https://moto-ai-server-wd9gh.ondigitalocean.app";

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

export default function StepSmartConnect({ next, setPhoto }: Props) {
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState("Esperando transmisión…");
  const controls = useAnimation();

  useEffect(() => {
    const socket = io(SOCKET_URL, { transports: ["websocket"] });
    socket.on("connect", () => setMensaje("Canal listo. Esperando imagen…"));
    socket.on("nueva-imagen", (data) => {
      setMensaje("Imagen recibida. Procesando…");
      setPhoto(data.url);
      controls.start({
        scale: [1, 0.95, 1.06, 1],
        transition: { duration: 0.38 },
      });
      next();
    });
    socket.on("connect_error", () => {
      setMensaje(
        "No hay conexión con el servidor. Puedes intentar manualmente."
      );
    });
    return () => {
      socket.disconnect();
    };
  }, [setPhoto, next, controls]);

  const trails = useMemo(
    () =>
      Array.from({ length: TRAILS }).map(() => ({
        seed: Math.random(),
        ...getRandomPolarCoord(),
      })),
    []
  );

  const solicitarManual = async () => {
    if (loading) return;
    setLoading(true);
    setMensaje("Estableciendo conexión…");
    try {
      const res = await fetch(
        "https://script.google.com/macros/s/AKfycby3aJdFUhSotru_nT1lPBetzcSQ8JQHxBNrfAkflmHeUJKeqw4EI3kzEqTatkSdq8U/exec"
      );
      setMensaje(
        res.ok
          ? "Petición enviada. Esperando transmisión…"
          : "Error solicitando imagen. Intenta de nuevo."
      );
    } catch {
      setMensaje("Error de conexión. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="smart-bg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Glow + partículas */}
      <div className="smart-glow" aria-hidden />
      <div className="smart-trails">
        {trails.map((trail, i) => (
          <motion.span
            key={trail.seed}
            className="smart-trail"
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
          />
        ))}
      </div>

      <div className="step-welcome-logo-area">
        <motion.img
          src="/LOGOS_SUPERIOR.png"
          alt="Logo superior"
          className="step-welcome-logo-img"
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

        <motion.video
          src="/moto_ai.mp4"
          autoPlay
          loop
          muted
          playsInline
          draggable={false}
          className="step-welcome-logo-video"
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
      </div>

      {/* CONTENEDOR CENTRAL: símbolo (un poco arriba del centro) + título debajo */}
      <div className="smart-stack">
        <button
          className={`smart-transmit-area ${loading ? "is-connecting" : ""}`}
          onClick={solicitarManual}
          aria-busy={loading}
          aria-label="Solicitar imagen vía Smart Connect"
        >
          <div className="smart-sweep" />
          <span className="smart-ripple r1" />
          <span className="smart-ripple r2" />
          <span className="smart-ripple r3" />
          <motion.img
            src="/SIMBOLO_01.png"
            alt="Smart Connect"
            className="smart-symbol"
            draggable={false}
            animate={
              loading
                ? { scale: [1, 1.12, 1], rotate: [0, 10, -10, 0] }
                : { scale: [1, 1.04, 1], rotate: [0, 0, 0] }
            }
            transition={{
              duration: loading ? 1.2 : 2.3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </button>

        <motion.img
          src="/TEXTOS-04.svg"
          alt="Transmitiendo interacción con Smart Connect"
          className="smart-title"
          draggable={false}
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 2.3, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Estado abajo, menos llamativo */}
      <Text size="sm" className="smart-status">
        {mensaje}
      </Text>

      <style>{`
        .smart-bg {
          position: fixed; inset: 0;
          width: 100vw; height: 100vh;
          background-image: url("/FONDO-AZUL_02.png");
          background-size: cover; background-position: center; background-repeat: no-repeat;
          display: grid; grid-template-rows: auto 1fr auto;
          align-items: start; justify-items: center;
          overflow: hidden; z-index: 10; padding: 24px 12px;
        }

        /* Glow y partículas */
        .smart-glow {
          position: absolute; top: 48%; left: 50%;
          transform: translate(-50%, -52%);
          width: 560px; height: 660px;
          background: radial-gradient(ellipse at 50% 50%, #1b4bff5a 0 36%, #ffb37635 65%, #0000 100%);
          filter: blur(46px) brightness(1.06) saturate(1.05);
          opacity: 0.55; animation: smart-glow 3.8s ease-in-out infinite alternate;
          pointer-events: none; z-index: 0;
        }
        @keyframes smart-glow {
          0% { opacity: .45; filter: blur(40px) brightness(1.03);}
          50% { opacity: .68; filter: blur(62px) brightness(1.12);}
          100% { opacity: .5; filter: blur(40px) brightness(1.06);}
        }
        .smart-trails { position: absolute; inset: 0; pointer-events: none; z-index: 1; }
        .smart-trail {
          position: absolute;
          background: linear-gradient(92deg, #fff8 25%, #ffb376 70%, #0000 100%);
          filter: blur(2px) brightness(1.16);
          width: 62px; height: 7px; border-radius: 14px;
          box-shadow: 0 0 14px 0 #fff9, 0 0 22px 4px #ffb37644;
        }

        .smart-header-logos {
          width: 350px; margin-top: 50px; z-index: 3; pointer-events: none;
        }

        /* ---- NUEVO LAYOUT CENTRAL ---- */
        .smart-stack {
          position: absolute;
          left: 50%;
          top: 44%;               /* un poco por encima del centro */
          transform: translate(-50%, -50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 18px;
          z-index: 3;
          width: min(92vw, 560px);
        }

        /* Símbolo grande + animación */
        .smart-transmit-area {
          width: 240px; height: 240px;     /* área de ripple más grande */
          display: grid; place-items: center;
          cursor: pointer; border: none; background: transparent; padding: 0;
          position: relative;
        }
        .smart-symbol {
          width: 128px; height: 128px;     /* ícono más grande */
          filter: drop-shadow(0 6px 18px rgba(61,149,255,.35));
          pointer-events: none;
        }
        .smart-sweep {
          position: absolute; inset: 0; border-radius: 999px;
          mask: radial-gradient(circle at center, rgba(0,0,0,0) 52%, rgba(0,0,0,1) 53%);
          background: conic-gradient(from 0deg, #3d95ff33 0 15%, #0000 60% 100%);
          animation: sweep-rot 2.4s linear infinite; filter: blur(1px);
        }
        @keyframes sweep-rot { to { transform: rotate(360deg); } }
        .smart-ripple { position: absolute; border: 2px solid #3d95ff55; border-radius: 999px; inset: 16px; animation: ripple 2.6s ease-out infinite; }
        .smart-ripple.r2 { inset: 8px; animation-delay: .6s; }
        .smart-ripple.r3 { inset: 0; animation-delay: 1.2s; }
        @keyframes ripple { 0% { transform: scale(.75); opacity: .9;} 70%{opacity:.25;} 100%{transform: scale(1.12); opacity:0;} }

        /* Intensifica al conectar */
        .smart-transmit-area.is-connecting .smart-sweep {
          background: conic-gradient(from 0deg, #3d95ff66 0 25%, #0000 65% 100%);
          animation-duration: 1.2s; filter: blur(.5px) brightness(1.15);
        }
        .smart-transmit-area.is-connecting .smart-ripple {
          border-color: #58a6ff88; animation-duration: 1.6s;
        }

        /* Título debajo del símbolo */
        .smart-title {
          width: min(78vw, 420px);
          pointer-events: none;
          user-select: none;
        }

        /* Estado al pie, menos visible */
        .smart-status {
          position: absolute; bottom: 12px; left: 50%; transform: translateX(-50%);
          width: 92vw; max-width: 480px; text-align: center;
          color: rgba(255,255,255,.72); text-shadow: 0 1px 2px rgba(0,0,0,.25);
          font-weight: 500; font-size: 0.95rem; letter-spacing: .1px;
          z-index: 2; user-select: none;
        }

        .step-welcome-logo-area {
          display: flex;
          align-items: center;    /* los alinea en el eje vertical */
          justify-content: center; /* los centra horizontalmente */
          gap: 45px;              /* espacio entre logo y video */
          z-index: 3;
          margin-top: 10%
        }

        .step-welcome-logo-img {
          width: 140px; /* ajusta según necesites */
          pointer-events: none;
        }

        .step-welcome-logo-video {
          width: 120px; /* tamaño del video */
          pointer-events: none;
        }

        /* ---- RESPONSIVE ---- */
        @media (max-width: 1024px) {
          .smart-stack { top: 45.5%; gap: 16px; }
          .smart-transmit-area { width: 220px; height: 220px; }
          .smart-symbol { width: 116px; height: 116px; }
          .smart-title { width: min(82vw, 420px); }
        }
        @media (max-width: 768px) {
          .smart-stack { top: 47%; gap: 14px; }
          .smart-transmit-area { width: 200px; height: 200px; }
          .smart-symbol { width: 104px; height: 104px; }
          .smart-title { width: min(76vw, 380px); }
          .smart-status { font-size: 0.88rem; }
        }
        @media (max-width: 480px) {
          .smart-stack { top: 48%; gap: 12px; }
          .smart-transmit-area { width: 178px; height: 178px; }
          .smart-symbol { width: 120px; height: 120px; }
          .smart-title { width: min(70vw, 340px); }
          .smart-status { font-size: 0.8rem; bottom: 10px; }
        }
        @media (max-width: 360px) {
          .smart-transmit-area { width: 160px; height: 160px; }
          .smart-symbol { width: 88px; height: 88px; }
          .smart-status { font-size: 0.78rem; }
        }
      `}</style>
    </motion.div>
  );
}
