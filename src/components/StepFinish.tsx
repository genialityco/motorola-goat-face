/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useState } from "react";
import { Text } from "@mantine/core";
import { motion } from "framer-motion";
import QRCode from "react-qr-code";

const logo = "/LOGOS_SUPERIOR.png";
const logosFooter = "/LOGOS.png";
const avatarFinal = "/CARA_HOMBRE_3.png";
const frameSrc = "/ESCUDO.png";

interface StepFinishProps {
  avatar: string;
  photo: string | null;
  onRestart: () => void;
}

const SERVER_URL = "https://moto-ai-server-wd9gh.ondigitalocean.app";

// Dominio base público (evita que el QR apunte a localhost en el teléfono)
const BASE_URL =
  (import.meta as any)?.env?.VITE_PUBLIC_BASE_URL || window.location.origin;

// --- Upload helpers ---
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

/** Foto recortada con máscara de escudo (438×454) + PNG del marco encima */
/** Foto recortada con máscara de escudo (FULL responsive, igual a DownloadFrame) */
function ShieldPhoto({ src }: { src: string }) {
  const W = 438;
  const H = 454;

  return (
    <div
      style={{
        position: "relative",
        width: "clamp(200px, 40vw, 320px)",
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
          width: "65%",
          height: "100%",
          marginLeft: "35px",
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

  // 1) Subir foto base si viene en base64/drive (o dejar url directa)
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

  // 2) QR: apunta al nuevo componente de descarga con la url de la foto (SVG local)
  const qrTarget = useMemo(() => {
    if (!firebaseUrl) return null;
    return `${BASE_URL}/download-frame?url=${encodeURIComponent(firebaseUrl)}`;
  }, [firebaseUrl]);

  // Tamaño del escudo adaptativo
  // const FRAME_SIZE =
  //   typeof window !== "undefined"
  //     ? Math.round(Math.max(180, Math.min(320, window.innerWidth * 0.48)))
  //     : 220;

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
      {/* Contenedor principal en flujo */}
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
          flex: 1, // ocupa alto disponible
        }}
      >
        {/* Top logo */}
        <img
          src={logo}
          alt="Logo moto ai"
          crossOrigin="anonymous"
          style={{
            width: "min(90vw, 400px)",
            maxWidth: 350,
            marginTop: "min(6vw, 24px)",
          }}
          draggable={false}
        />

        {/* Marco */}
        <ShieldPhoto
          src={imageToShow}
          // size={FRAME_SIZE}
          // MASK_INSET={12}
          // OFFSET_Y={-4}
        />

        {/* Título */}
        <Text
          style={{
            color: "#fff",
            fontWeight: 700,
            fontSize: "clamp(1.25rem, 3.5vw, 24px)",
            textShadow: "0 2px 6px #19193940",
            lineHeight: 1.24,
            textAlign: "center",
          }}
        >
          ¡Listo!
        </Text>

        {/* Texto inferior (SVG) — en flujo, sin absolute */}
        <img
          src="/TEXTOS-05.svg"
          alt="Texto GOAT"
          crossOrigin="anonymous"
          style={{
            width: "min(60vw, 320px)",
            height: "auto",
            opacity: 0.95,
            display: "block",
            userSelect: "none",
            pointerEvents: "none",
          }}
          draggable={false}
        />

        {/* Bloque QR | Texto */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            flexWrap: "wrap",
            justifyContent: "center",
            minHeight: 100,
          }}
        >
          {uploading ? (
            <Text size="sm" c="#fff" style={{ textAlign: "center" }}>
              Procesando imagen...
            </Text>
          ) : qrTarget ? (
            <>
              <div
                style={{
                  width: "clamp(120px, 14vw, 120px)",
                  height: "clamp(120px, 14vw, 120px)",
                  background: "#fff",
                  boxShadow: "0 0 16px #2AB8FF66",
                  display: "grid",
                  placeItems: "center",
                  borderRadius: 6,
                  flexShrink: 0,
                }}
              >
                <QRCode
                  value={qrTarget}
                  size={250}
                  style={{ width: "90%", height: "90%" }}
                />
              </div>

              <Text
                size="sm"
                c="#fff"
                style={{
                  lineHeight: 1.25,
                  textAlign: "left",
                  textShadow: "0 2px 8px rgba(0,0,0,.25)",
                  fontSize: "clamp(12px, 2.4vw, 14px)",
                }}
              >
                Escanea para
                <br />
                ir a descargar
                <br />
                tu imagen
              </Text>
            </>
          ) : null}
        </div>

        {/* Empuja el footer hacia abajo */}
        <div style={{ marginTop: "auto" }} />

        {/* Footer logos */}
        <div
          style={{
            width: "100%",
            maxWidth: 230,
            display: "flex",
            justifyContent: "center",
            paddingBottom: "min(4vw, 24px)",
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
    </motion.div>
  );
}
