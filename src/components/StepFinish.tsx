/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useState } from "react";
import { Text } from "@mantine/core";
import { motion, AnimatePresence } from "framer-motion";
import QRCode from "react-qr-code";

const logosFooter = "/LOGOS.png";
const avatarFinal = "/CARA_HOMBRE_3.png";
const frameSrc = "/ESCUDO_SIN_MARCO.png";

interface StepFinishProps {
  avatar: string;
  photo: string | null;
  onRestart: () => void;
}

const SERVER_URL = "https://moto-ai-server-wd9gh.ondigitalocean.app";
const BASE_URL =
  (import.meta as any)?.env?.VITE_PUBLIC_BASE_URL || window.location.origin;

async function uploadBase64ToFirebase(base64: string): Promise<string | null> {
  try {
    const res = await fetch(`${SERVER_URL}/upload-base64-to-firebase`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ base64 }),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json?.error || "Error subiendo base64");
    return json.url as string;
  } catch (e) {
    console.error(e);
    return null;
  }
}
async function uploadDriveUrlToFirebase(
  driveUrl: string
): Promise<string | null> {
  try {
    const res = await fetch(`${SERVER_URL}/upload-drive-to-firebase`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ driveUrl }),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json?.error || "Error subiendo desde Drive");
    return json.url as string;
  } catch (e) {
    console.error(e);
    return null;
  }
}

function ShieldPhoto({ src }: { src: string }) {
  const W = 438;
  const H = 454;
  return (
    <div
      style={{
        position: "relative",
        width: "clamp(280px, 54vw, 560px)",
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
          width: "100%",
          height: "100%",
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

export default function StepFinish({ photo, onRestart }: StepFinishProps) {
  const [firebaseUrl, setFirebaseUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [currentSlide, setCurrentSlide] = useState<0 | 1>(0);

  useEffect(() => {
    let active = true;
    (async () => {
      if (!photo) {
        setFirebaseUrl(null);
        setUploading(false);
        return;
      }
      setUploading(true);
      try {
        if (photo.startsWith("data:")) {
          const url = await uploadBase64ToFirebase(photo);
          if (active) setFirebaseUrl(url);
        } else if (photo.includes("drive.google.com/file/d/")) {
          const url = await uploadDriveUrlToFirebase(photo);
          if (active) setFirebaseUrl(url);
        } else {
          if (active) setFirebaseUrl(photo);
        }
      } catch {
        if (active) setFirebaseUrl(null);
      } finally {
        if (active) setUploading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [photo]);

  const imageToShow = firebaseUrl || avatarFinal;

  const qrTarget = useMemo(() => {
    if (!firebaseUrl) return null;
    return `${BASE_URL}/download-frame?url=${encodeURIComponent(firebaseUrl)}`;
  }, [firebaseUrl]);

  useEffect(() => {
    if (currentSlide === 0) {
      const t = setTimeout(() => setCurrentSlide(1), 5000);
      return () => clearTimeout(t);
    }
  }, [currentSlide]);

  // const slideVariants = {
  //   initial: (dir: number) => ({ opacity: 0, x: dir > 0 ? 40 : -40 }),
  //   animate: {
  //     opacity: 1,
  //     x: 0,
  //     transition: { duration: 0.5, ease: "easeOut" },
  //   },
  //   exit: (dir: number) => ({
  //     opacity: 0,
  //     x: dir > 0 ? -40 : 40,
  //     transition: { duration: 0.4, ease: "easeIn" },
  //   }),
  // };

  const [dragDir, setDragDir] = useState(0);
  const onDragEnd = (_: any, info: { offset: { x: number } }) => {
    const threshold = 60;
    const deltaX = info?.offset?.x ?? 0;
    if (deltaX < -threshold) setCurrentSlide(1);
    if (deltaX > threshold) setCurrentSlide(0);
    setDragDir(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        minHeight: "100dvh",
        overflow: "hidden",
        boxSizing: "border-box",
        backgroundImage: 'url("/FONDO-AZUL_01.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 720,
          marginInline: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "min(5vw, 24px)",
          gap: 16,
          flex: 1,
        }}
      >
        {/* Contenedor para logo superior y video */}
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

        {/* Área de slides */}
        <div
          style={{
            position: "relative",
            width: "100%",
            display: "grid",
            placeItems: "center",
            flex: 1,
            minHeight: 320,
          }}
        >
          <AnimatePresence custom={dragDir} mode="popLayout">
            {/* SLIDE 0: Escudo + TEXTOS-05-5 */}
            {currentSlide === 0 ? (
              <motion.div
                key="slide-0"
                custom={dragDir}
                // variants={slideVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragStart={(_, info) => setDragDir(info.offset.x)}
                onDragEnd={onDragEnd}
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 16,
                }}
              >
                <ShieldPhoto src={imageToShow} />
                <img
                  src="/TEXTOS-05-5.svg"
                  alt="Texto GOAT"
                  crossOrigin="anonymous"
                  style={{
                    width: "min(80vw, 480px)",
                    height: "auto",
                    opacity: 0.95,
                    display: "block",
                    userSelect: "none",
                    pointerEvents: "none",
                  }}
                  draggable={false}
                />
              </motion.div>
            ) : (
              /* SLIDE 1: QR centrado + TEXTOS-06 + logos inferiores */
              <motion.div
                key="slide-1"
                custom={dragDir}
                // variants={slideVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragStart={(_, info) => setDragDir(info.offset.x)}
                onDragEnd={onDragEnd}
                style={{
                  width: "100%",
                  height: "100%",
                  /* GRID de 2 filas: centro + footer */
                  display: "grid",
                  gridTemplateRows: "1fr auto",
                  justifyItems: "center",
                  alignItems: "center",
                  rowGap: 22,
                  paddingBottom: 8,
                }}
              >
                {/* BLOQUE CENTRADO (ocupa la fila 1 y queda centrado vertical y horizontal) */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 22,
                    /* por si el contenedor crece: */
                    width: "100%",
                  }}
                >
                  {/* Contenedor visual del QR (centrado y grande) */}
                  <motion.div
                    animate={{
                      boxShadow: [
                        "0 0 0 0 rgba(42,184,255,0.0)",
                        "0 0 28px 6px rgba(42,184,255,0.35)",
                        "0 0 0 0 rgba(42,184,255,0.0)",
                      ],
                    }}
                    transition={{
                      duration: 2.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    style={{
                      display: "grid",
                      placeItems: "center",
                      background: "#ffffff",
                      borderRadius: 16,
                      padding: "0px",
                      border: "6px solid #fff",
                      width: "clamp(260px, 48vw, 420px)",
                      height: "clamp(260px, 48vw, 420px)",
                      boxShadow:
                        "0 10px 24px rgba(0,0,0,.25), 0 0 24px rgba(42,184,255,.28)",
                    }}
                  >
                    {uploading ? (
                      <Text size="sm" c="#111" style={{ textAlign: "center" }}>
                        Procesando imagen...
                      </Text>
                    ) : qrTarget ? (
                      <QRCode
                        value={qrTarget}
                        size={560}
                        style={{ width: "92%", height: "92%" }}
                      />
                    ) : (
                      <Text size="sm" c="#111" style={{ textAlign: "center" }}>
                        QR no disponible. Intenta nuevamente.
                      </Text>
                    )}
                  </motion.div>

                  {/* Texto debajo del QR */}
                  <img
                    src="/TEXTOS-06.svg"
                    alt="Instrucción descarga"
                    crossOrigin="anonymous"
                    style={{
                      width: "min(64vw, 420px)",
                      height: "auto",
                      display: "block",
                      userSelect: "none",
                      pointerEvents: "none",
                      opacity: 0.95,
                      marginTop: 2,
                    }}
                    draggable={false}
                  />
                </div>

                {/* FOOTER (fila 2, siempre abajo) */}
                <div
                  style={{
                    width: "100%",
                    maxWidth: 260,
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={logosFooter}
                    alt="Patrocinadores"
                    crossOrigin="anonymous"
                    style={{ width: "100%", maxWidth: 280 }}
                    draggable={false}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Paginación */}
        <div
          style={{
            display: "flex",
            gap: 8,
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 8,
          }}
        >
          {[0, 1].map((i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i as 0 | 1)}
              aria-label={`Ir al slide ${i + 1}`}
              style={{
                width: 10,
                height: 10,
                borderRadius: 999,
                border: "none",
                cursor: "pointer",
                background:
                  currentSlide === i ? "#2AB8FF" : "rgba(255,255,255,.5)",
                boxShadow:
                  currentSlide === i
                    ? "0 0 0 4px rgba(42,184,255,.25)"
                    : "none",
              }}
            />
          ))}
        </div>
      </div>

      {/* Botón Reiniciar */}
      <motion.button
        onClick={onRestart}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{
          position: "absolute",
          top: 8,
          left: 8,
          width: 44,
          height: 44,
          borderRadius: 12,
          border: "none",
          background: "transparent",
          cursor: "pointer",
        }}
      >
        <img
          src="/reiniciar.png"
          alt="Reiniciar"
          style={{ width: 26, height: 26 }}
          draggable={false}
        />
      </motion.button>
      <style>{`

        .step-welcome-logo-area {
          display: flex;
          align-items: center;    /* los alinea en el eje vertical */
          justify-content: center; /* los centra horizontalmente */
          gap: 45px;              /* espacio entre logo y video */
          margin-top: 15%;    /* espacio debajo */
          z-index: 3;
        }

        .step-welcome-logo-img {
          width: 160px; /* ajusta según necesites */
          pointer-events: none;
        }

        .step-welcome-logo-video {
          width: 140px; /* tamaño del video */
          pointer-events: none;
        }   
      `}</style>
    </motion.div>
  );
}
