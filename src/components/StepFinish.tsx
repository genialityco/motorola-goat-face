import { useEffect, useState } from "react";
import { Text, Loader } from "@mantine/core";
import { motion } from "framer-motion";

const logo = "/LOGO_MOTO_IA.png";
const logosFooter = "/LOGOS.png";
const avatarFinal = "/CARA_HOMBRE_3.png";

interface StepFinishProps {
  avatar: string;
  photo: string | null;
  onRestart: () => void;
}

const IMGBB_API_KEY = "f62a94925b92030ce2d0010f2a63544c";

async function uploadToImgbb(base64: string): Promise<string | null> {
  const form = new FormData();
  form.append("image", base64.replace(/^data:image\/\w+;base64,/, ""));
  try {
    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
      {
        method: "POST",
        body: form,
      }
    );
    const json = await res.json();
    return json.data?.url || null;
  } catch (e) {
    console.error("Error uploading to imgbb:", e);
    return null;
  }
}

async function uploadDriveUrlToImgbb(driveUrl: string): Promise<string | null> {
  const response = await fetch(
    "https://moto-ai-server-wd9gh.ondigitalocean.app/upload-drive-to-imgbb",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ driveUrl }),
    }
  );
  const json = await response.json();
  if (!json.url) throw new Error(json.error || "No se pudo subir la imagen");
  return json.url;
}

export default function StepFinish({ photo, onRestart }: StepFinishProps) {
  const [imgbbUrl, setImgbbUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    let active = true;

    async function processPhoto() {
      if (!photo) {
        setImgbbUrl(null);
        setUploading(false);
        return;
      }

      setUploading(true);

      if (photo.startsWith("data:")) {
        const url = await uploadToImgbb(photo);
        if (active) setImgbbUrl(url);
        setUploading(false);
        return;
      }

      if (photo.includes("drive.google.com/file/d/")) {
        try {
          const url = await uploadDriveUrlToImgbb(photo);
          if (active) setImgbbUrl(url);
        } catch (e) {
          console.error("Error procesando imagen de Drive en backend:", e);
          if (active) setImgbbUrl(null);
        }
        setUploading(false);
        return;
      }

      setImgbbUrl(photo);
      setUploading(false);
    }

    processPhoto();
    return () => {
      active = false;
    };
  }, [photo]);

  const imageToShow = imgbbUrl || avatarFinal;
  const qrUrl =
    imgbbUrl && imgbbUrl !== avatarFinal
      ? `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
          imgbbUrl
        )}&size=180x180`
      : null;

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
        minWidth: "100vw",
        backgroundImage: 'url("/FONDO-AZUL_01.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        paddingTop: "env(safe-area-inset-top, 20px)",
        paddingBottom: "env(safe-area-inset-bottom, 20px)",
        overflow: "auto", // permitir scroll solo si es necesario
        boxSizing: "border-box",
      }}
    >
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          marginTop: "min(7vw, 38px)",
          marginBottom: "min(4vw, 18px)",
          flexShrink: 0,
        }}
      >
        <img
          src={logo}
          alt="Logo moto ai"
          style={{
            width: "min(65vw, 250px)",
            maxWidth: 230,
            height: "auto",
            userSelect: "none",
            pointerEvents: "none",
            display: "block",
          }}
          draggable={false}
        />
      </motion.div>

      {/* Avatar + QR */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        style={{
          width: "100%",
          maxWidth: 320,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "min(4vw, 20px)",
          marginBottom: "min(6vw, 30px)",
          flexShrink: 1, // permite reducción en pantallas pequeñas
          boxSizing: "border-box",
          paddingInline: 12,
        }}
      >
        <motion.img
          src={imageToShow}
          alt="Avatar final"
          style={{
            width: "100%",
            maxWidth: 180,
            maxHeight: 180,
            aspectRatio: "1 / 1",
            borderRadius: 24,
            objectFit: "cover",
            background: "linear-gradient(180deg, #ff6634 0%, #1ba4fd 100%)",
            padding: "min(6px, 1vw)",
            boxShadow: `
              0 -12px 32px 0 #ff663499,
              0 14px 38px 0 #1ba4fd99,
              0 0px 40px 0 #14204660,
              0 0px 0px 2px #fff
            `,
            userSelect: "none",
            pointerEvents: "none",
            margin: "0 auto",
          }}
          draggable={false}
          animate={{
            scale: [1, 1.03, 1],
            boxShadow: [
              `0 -12px 32px 0 #ff663499,
               0 14px 38px 0 #1ba4fd99,
               0 0px 40px 0 #14204660,
               0 0px 12px 4px #ff784fbb`,
              `0 -12px 44px 0 #ff7a5aaa,
               0 14px 44px 0 #45c0f9aa,
               0 0px 55px 0 #142046aa,
               0 0px 12px 8px #ff9a78cc`,
              `0 -12px 32px 0 #ff663499,
               0 14px 38px 0 #1ba4fd99,
               0 0px 40px 0 #14204660,
               0 0px 0px 2px #fff`,
            ],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 6,
            minHeight: 130,
          }}
        >
          {uploading && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                minHeight: 128,
                justifyContent: "center",
              }}
            >
              <Loader color="blue" size="md" />
              <Text
                size="sm"
                c="#fff"
                style={{
                  fontWeight: 500,
                  textAlign: "center",
                  marginTop: 12,
                  maxWidth: 160,
                  lineHeight: 1.2,
                }}
              >
                Procesando imagen...
              </Text>
            </div>
          )}
          {!uploading && qrUrl && (
            <>
              <motion.img
                src={qrUrl}
                alt="Código QR para descargar tu imagen"
                style={{
                  width: "100%",
                  maxWidth: 160,
                  maxHeight: 160,
                  aspectRatio: "1 / 1",
                  background: "#fff",
                  borderRadius: 8,
                  boxShadow: "0 0 10px #2AB8FF44",
                  marginBottom: 2,
                  marginTop: 8,
                  userSelect: "none",
                  pointerEvents: "none",
                }}
                draggable={false}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
              />
              <Text
                size="sm"
                c="#fff"
                style={{
                  fontWeight: 500,
                  textAlign: "center",
                  textShadow: "0 2px 8px #1b224188",
                  lineHeight: 1.15,
                  marginTop: 2,
                  marginBottom: 4,
                  maxWidth: 120,
                  userSelect: "none",
                }}
              >
                Escanea para descargar tu imagen
              </Text>
            </>
          )}
        </div>
      </motion.div>

      {/* Mensaje central */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.4 }}
        style={{
          width: "100%",
          textAlign: "center",
          marginBottom: "min(7vw, 28px)",
          paddingInline: 12,
          flexShrink: 0,
          userSelect: "none",
        }}
      >
        <Text
          style={{
            color: "#fff",
            fontWeight: 600,
            fontSize: "clamp(1.15rem, 4vw, 24px)",
            textShadow: "0 2px 6px #19193940",
            marginBottom: 0,
            lineHeight: 1.24,
            paddingInline: "50px",
          }}
        >
          Estás a solo un paso de crear tu GOAT ideal en la siguiente actividad.
        </Text>
      </motion.div>

      {/* Botón Reiniciar */}
      <motion.button
        onClick={onRestart}
        whileHover={{ scale: 1.05, boxShadow: "0 6px 20px #8ad5f7cc" }}
        whileTap={{ scale: 0.95 }}
        style={{
          position: "fixed",
          top: "0",
          left: "0",
          width: 48,
          height: 48,
          padding: 0,
          borderRadius: 14,
          border: "none",
          cursor: "pointer",
          background: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <img
          src="/reiniciar.png"
          alt="Reiniciar"
          style={{
            width: 28,
            height: 28,
            objectFit: "contain",
            pointerEvents: "none",
            userSelect: "none",
          }}
          draggable={false}
        />
      </motion.button>

      {/* Logos patrocinadores footer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
        style={{
          width: "100%",
          maxWidth: 350,
          paddingInline: 12,
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end",
          marginBottom: "min(4vw, 24px)",
          flexShrink: 0,
          userSelect: "none",
        }}
      >
        <img
          src={logosFooter}
          alt="Patrocinadores"
          style={{
            width: "100%",
            maxWidth: 350,
            height: "auto",
            opacity: 0.98,
            pointerEvents: "none",
            display: "block",
          }}
          draggable={false}
        />
      </motion.div>
    </motion.div>
  );
}
