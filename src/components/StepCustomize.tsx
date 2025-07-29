import { Title } from "@mantine/core";
import { useRef, useState } from "react";

const logo = "/LOGO_MOTO_IA.png";

const avatarStyles = [
  { name: "Realista", url: "/CARA_HOMBRE_3.png" },
  { name: "Caricatura", url: "/CARA_HOMBRE_3.png" },
  { name: "Pop Art", url: "/CARA_HOMBRE_3.png" },
  { name: "Anime", url: "/CARA_HOMBRE_3.png" },
  { name: "Cyber", url: "/CARA_HOMBRE_3.png" },
];

interface Props {
  photo: string | null;
  setCustomStyle: (est: string) => void;
  setPhoto: (photo: string | null) => void; // <-- NUEVO!
  next: () => void;
  prev: () => void;
}

export default function StepCustomize({ photo, setPhoto }: Props) {
  const [current, setCurrent] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLeft = () =>
    setCurrent((i) => (i === 0 ? avatarStyles.length - 1 : i - 1));
  const handleRight = () =>
    setCurrent((i) => (i === avatarStyles.length - 1 ? 0 : i + 1));
  const handleSelect = (idx: number) => setCurrent(idx);

  // Abrir input archivo al hacer click en Simular
  const handleSimularClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  // Cargar la imagen y convertir a dataURL
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setPhoto(ev.target?.result as string);
    reader.readAsDataURL(file);
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
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* Contenido principal */}
      <div
        style={{
          flex: "1 1 0",
          overflowY: "auto",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: "clamp(20px, 6vw, 48px)",
          paddingBottom: "clamp(12px, 4vw, 34px)",
        }}
      >
        {/* Logo y textos */}
        <div
          style={{
            width: "100%",
            textAlign: "center",
            marginBottom: "clamp(16px, 4vw, 34px)",
          }}
        >
          <img
            src={logo}
            alt="Logo moto ai"
            style={{
              width: "clamp(120px, 33vw, 230px)",
              height: "auto",
              userSelect: "none",
              pointerEvents: "none",
              marginBottom: "clamp(7px, 1.6vw, 18px)",
            }}
            draggable={false}
          />
          <Title order={1} fw={300} ta="center" c="white" mb={16}>
            Instruccion 3/3
          </Title>
          <div
            style={{
              color: "#fff",
              fontWeight: 700,
              fontSize: "clamp(1.4rem, 5vw, 2.3rem)",
              marginBottom: "clamp(4px, 1.3vw, 13px)",
            }}
          >
            ¡Personaliza tu imagen!
          </div>
          <div
            style={{
              color: "#fff",
              fontSize: "clamp(1rem, 4vw, 1.25rem)",
              fontWeight: 400,
              marginBottom: "clamp(0px, 0.5vw, 7px)",
              lineHeight: 1.25,
            }}
          >
            Elige el estilo IA que más
            <br />
            te guste y elige “Simular”
          </div>
        </div>

        {/* Imagen central */}
        <div
          style={{
            margin: "0 auto",
            background: "#fff",
            width: "clamp(150px, 45vw, 300px)",
            height: "clamp(150px, 45vw, 300px)",
            borderRadius: 22,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 2px 22px #1b2241cc",
            marginBottom: "clamp(18px, 4vw, 36px)",
            overflow: "hidden",
          }}
        >
          <img
            src={photo || avatarStyles[current]?.url}
            alt="Avatar IA"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: 19,
            }}
            draggable={false}
          />
        </div>

        {/* Carrusel de estilos */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            margin: "0 auto clamp(26px, 6vw, 46px) auto",
            justifyContent: "center",
            width: "100%",
          }}
        >
          {/* Flecha izquierda */}
          <button
            onClick={handleLeft}
            style={{
              background: "rgba(27,164,253,0.14)",
              border: "none",
              borderRadius: 12,
              boxShadow: "0 4px 18px #1ba4fd44",
              width: "clamp(30px, 7vw, 48px)",
              height: "clamp(30px, 7vw, 48px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: 9,
              cursor: "pointer",
            }}
          >
            <span style={{ fontSize: "clamp(22px, 5vw, 33px)", color: "#fff" }}>
              {"<"}
            </span>
          </button>

          {/* Miniaturas de estilos */}
          <div
            style={{
              display: "flex",
              gap: "clamp(5px, 2vw, 14px)",
              overflowX: "auto",
              maxWidth: "68vw",
            }}
          >
            {avatarStyles.map((item, idx) => (
              <img
                key={item.name}
                src={item.url}
                alt={item.name}
                onClick={() => handleSelect(idx)}
                style={{
                  width: "clamp(36px, 10vw, 56px)",
                  height: "clamp(36px, 10vw, 56px)",
                  objectFit: "cover",
                  borderRadius: 7,
                  border:
                    idx === current
                      ? "2.5px solid #ff6a3a"
                      : "2.5px solid transparent",
                  boxShadow: idx === current ? "0 0 14px #ff6a3a55" : "",
                  transition: "box-shadow .16s, border .16s",
                  cursor: "pointer",
                  background: "#fff",
                  flexShrink: 0,
                }}
                draggable={false}
              />
            ))}
          </div>

          {/* Flecha derecha */}
          <button
            onClick={handleRight}
            style={{
              background: "rgba(255,106,58,0.12)",
              border: "none",
              borderRadius: 12,
              boxShadow: "0 4px 18px #ff6a3a44",
              width: "clamp(30px, 7vw, 48px)",
              height: "clamp(30px, 7vw, 48px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginLeft: 9,
              cursor: "pointer",
            }}
          >
            <span style={{ fontSize: "clamp(22px, 5vw, 33px)", color: "#fff" }}>
              {">"}
            </span>
          </button>
        </div>
      </div>

      {/* Botón Simular siempre visible abajo */}
      <div
        style={{
          width: "100%",
          padding: "min(3vh, 26px) 0",
          display: "flex",
          justifyContent: "center",
          position: "sticky",
          bottom: 0,
          background: "linear-gradient(180deg,transparent 10%, #141a27 96%)",
          zIndex: 30,
        }}
      >
        <button
          onClick={handleSimularClick}
          style={{
            width: "clamp(120px, 32vw, 210px)",
            fontSize: "clamp(1.1rem, 4vw, 1.65rem)",
            fontWeight: 700,
            borderRadius: 12,
            background: "#181822",
            color: "#fff",
            padding: "14px 0",
            paddingInline: "clamp(36px, 6vw, 36px)",
            border: "none",
            boxShadow: "0 4px 18px #686e8955",
            letterSpacing: "0.01em",
            cursor: "pointer",
          }}
        >
          Simular
        </button>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handlePhotoChange}
        />
      </div>
    </div>
  );
}
