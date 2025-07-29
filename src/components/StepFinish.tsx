import { useEffect, useState } from "react";
import { Title, Text, Loader } from "@mantine/core";

const logo = "/LOGO_MOTO_IA.png";
const logosFooter = "/LOGOS.png";
const avatarFinal = "/CARA_HOMBRE_3.png";

interface StepFinishProps {
  avatar: string;
  photo: string | null; // Puede ser base64 o url pública
  onRestart: () => void;
}

const IMGBB_API_KEY = "f62a94925b92030ce2d0010f2a63544c"; // <-- Tu API key

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

export default function StepFinish({ photo, onRestart }: StepFinishProps) {
  const [imgbbUrl, setImgbbUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (photo && photo.startsWith("data:")) {
      setUploading(true);
      uploadToImgbb(photo).then((url) => {
        setImgbbUrl(url);
        setUploading(false);
      });
    } else if (photo && photo.startsWith("http")) {
      setImgbbUrl(photo);
      setUploading(false);
    } else {
      setImgbbUrl(null);
      setUploading(false);
    }
  }, [photo]);

  const imageToShow = photo || avatarFinal;
  const qrUrl = imgbbUrl
    ? `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
        imgbbUrl
      )}&size=180x180`
    : null;

  return (
    <div
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
        justifyContent: "flex-start",
        overflow: "auto",
      }}
    >
      {/* Logo arriba */}
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          marginTop: "min(7vw, 38px)",
          marginBottom: "min(4vw, 18px)",
        }}
      >
        <img
          src={logo}
          alt="Logo moto ai"
          style={{
            width: "min(65vw, 250px)",
            maxWidth: 250,
            height: "auto",
            userSelect: "none",
            pointerEvents: "none",
            display: "block",
          }}
          draggable={false}
        />
      </div>

      {/* Avatar y QR */}
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "min(4vw, 20px)",
          marginBottom: "min(6vw, 30px)",
        }}
      >
        <img
          src={imageToShow}
          alt="Avatar final"
          style={{
            width: "min(70vw, 320px)",
            maxWidth: 180,
            height: "auto",
            aspectRatio: "1/1",
            borderRadius: 24,
            objectFit: "cover",
            boxShadow: "0 0 22px #1b224188",
            display: "block",
            margin: "0 auto",
          }}
          draggable={false}
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
                Generando QR para descargar...
              </Text>
            </div>
          )}
          {!uploading && qrUrl && (
            <>
              <img
                src={qrUrl}
                alt="Código QR para descargar tu imagen"
                style={{
                  width: "min(36vw, 148px)",
                  height: "min(36vw, 148px)",
                  maxWidth: 160,
                  maxHeight: 160,
                  background: "#fff",
                  borderRadius: 8,
                  boxShadow: "0 0 10px #2AB8FF44",
                  marginBottom: 2,
                  marginTop: 8,
                }}
                draggable={false}
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
                }}
              >
                Escanea para descargar tu imagen
              </Text>
            </>
          )}
        </div>
      </div>

      {/* Mensaje central */}
      <div
        style={{
          width: "100%",
          textAlign: "center",
          marginBottom: "min(7vw, 28px)",
          paddingInline: 12,
        }}
      >
        <Title
          order={1}
          style={{
            color: "#fff",
            fontWeight: 700,
            fontSize: "clamp(2rem, 6vw, 42px)",
            marginBottom: 14,
            textShadow: "0 3px 12px #19193966",
          }}
        >
          ¡Listo!
        </Title>
        <Text
          style={{
            color: "#fff",
            fontWeight: 600,
            fontSize: "clamp(1.15rem, 4vw, 24px)",
            textShadow: "0 2px 6px #19193940",
            marginBottom: 0,
            lineHeight: 1.24,
          }}
        >
          Estás a solo un paso <br />
          de crear tu GOAT ideal
          <br />
          en la siguiente
          <br />
          actividad.
        </Text>
      </div>

      <button
        onClick={onRestart}
        style={{
          width: "min(85vw, 320px)",
          fontSize: "clamp(1.1rem, 4vw, 1.55rem)",
          fontWeight: 700,
          borderRadius: 14,
          background: "linear-gradient(90deg,#181822 70%,#8ad5f7 140%)",
          color: "#fff",
          padding: "16px 0",
          margin: "0 auto min(5vw, 18px) auto",
          border: "none",
          boxShadow: "0 4px 18px #686e8955",
          letterSpacing: "0.01em",
          cursor: "pointer",
          display: "block",
          position: "relative",
        }}
      >
        Reiniciar
      </button>

      {/* Logos patrocinadores footer */}
      <div
        style={{
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end",
          marginBottom: "min(4vw, 24px)",
        }}
      >
        <img
          src={logosFooter}
          alt="Patrocinadores"
          style={{
            width: "min(90vw, 350px)",
            maxWidth: 350,
            height: "auto",
            opacity: 0.98,
            userSelect: "none",
            pointerEvents: "none",
            display: "block",
          }}
          draggable={false}
        />
      </div>
    </div>
  );
}
