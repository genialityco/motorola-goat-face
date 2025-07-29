import { Text, Title } from "@mantine/core";
import { useRef } from "react";

interface Props {
  next: () => void;
  prev?: () => void;
  setPhoto: (url: string) => void;
}

const caras = "/CARAS.png";
const cel = "/CEL.png";
const avatar = "/CARA_HOMBRE.png";

export default function StepUploadPhoto({ next, setPhoto }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (file) {
      setPhoto(URL.createObjectURL(file));
      next();
    }
  };

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
        alignItems: "center",
        justifyContent: "center",
        overflow: "auto",
        padding: 0,
      }}
    >
      {/* Borde degradado tipo neón */}
      <div
        style={{
          padding: "max(0vw, 6px)",
          borderRadius: 36,
          background:
            "linear-gradient(120deg, #ff5b9f 0%, #ffd36e 40%, #4fc6ff 80%, #a66bff 100%)",
          boxShadow:
            "0 0 42px 14px #ff4fc680, 0 14px 42px 0 rgba(46,16,101,0.13)",
          maxWidth: 440,
          width: "95vw",
          maxHeight: "94vh",
          minHeight: 320,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            background: "#fff",
            borderRadius: 28,
            width: "100%",
            boxShadow: "0 6px 32px 0 rgba(46, 16, 101, 0.10)",
            padding: "clamp(16px, 5vw, 36px) clamp(8px, 4vw, 32px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "relative",
            overflowY: "auto",
          }}
        >
          {/* Título */}
          <Title order={2} fw={300} ta="center" mb={16}>
            Instruccion 1/3
          </Title>
          <Title
            fw={600}
            ta="center"
            style={{
              fontSize: "clamp(1.25rem, 4vw, 2rem)",
              marginBottom: 10,
              lineHeight: 1.1,
            }}
          >
            ¿Quieres ponerle
            <br />
            cara a tu GOAT?
          </Title>
          {/* Imagen de rostros */}
          <img
            src={caras}
            alt="rostros"
            style={{
              width: "min(220px, 80vw)",
              height: "auto",
              marginBottom: 10,
              maxWidth: "100%",
            }}
            draggable={false}
          />

          {/* Card con Moto IA / Image Studio */}
          <div
            style={{
              background: "#f4f1ee",
              borderRadius: 16,
              padding: "10px 14px",
              display: "flex",
              alignItems: "center",
              gap: 12,
              width: "95%",
              marginBottom: 12,
              minWidth: 0,
              overflow: "hidden",
            }}
          >
            <img
              src={cel}
              alt="Moto IA"
              style={{
                width: 38,
                height: 56,
                marginInline: "5px",
                minWidth: 24,
              }}
              draggable={false}
            />
            <Text
              size="md"
              fw={600}
              style={{ fontSize: "clamp(1rem, 2.6vw, 1.23rem)" }}
            >
              Abre Moto IA en el celular, ingresa a<br />
              <span style={{ fontWeight: 700 }}>Image Studio</span>
            </Text>
          </div>

          {/* Card con Avatar */}
          <div
            style={{
              background: "#f4f1ee",
              borderRadius: 16,
              padding: "10px 14px",
              display: "flex",
              alignItems: "center",
              gap: 12,
              width: "95%",
              marginBottom: 24,
              minWidth: 0,
              overflow: "hidden",
            }}
          >
            <img
              src={avatar}
              alt="crear avatar"
              style={{
                width: 55,
                height: 55,
                marginInline: "2px",
                minWidth: 24,
              }}
              draggable={false}
            />
            <Text
              size="md"
              fw={600}
              style={{ fontSize: "clamp(1rem, 2.6vw, 1.23rem)" }}
            >
              y luego a<br />
              <span style={{ fontWeight: 700 }}>“crear avatar”</span>
            </Text>
          </div>

          {/* Botón para tomar selfie */}
          <button
            onClick={() => next()}
            style={{
              marginTop: 6,
              width: "100%",
              padding: "10px 0",
              fontSize: "clamp(1.2rem, 3.7vw, 1.55rem)",
              fontWeight: 600,
              background: "#222",
              color: "#fff",
              border: "none",
              borderRadius: 10,
              boxShadow: "0 10px 8px rgba(0, 0, 0, 0.18)",
              letterSpacing: "0.01em",
              cursor: "pointer",
              transition: "background .18s",
            }}
          >
            Siguiente instrucción
          </button>
          {/* Input oculto */}
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleFile}
          />
        </div>
      </div>
    </div>
  );
}
