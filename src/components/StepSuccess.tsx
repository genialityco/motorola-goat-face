import { Title } from "@mantine/core";

const logo = "/LOGO_MOTO_IA.png";

interface Props {
  next: () => void;
  goTo: (n: number) => void;
  photo: string | null;
}

export default function StepSuccess({ next, goTo, photo }: Props) {
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
        justifyContent: "space-between",
        overflow: "hidden",
        padding: 0,
      }}
      // Eliminar el onClick global para no disparar next accidentalmente
    >
      {/* Top: Logo */}
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "min(7vh, 40px)",
        }}
      >
        <img
          src={logo}
          alt="Logo moto ai"
          style={{
            width: "clamp(140px, 40vw, 310px)",
            height: "auto",
            userSelect: "none",
            pointerEvents: "none",
            display: "block",
            marginBottom: "clamp(18px, 3vw, 32px)",
          }}
          draggable={false}
        />
      </div>

      {/* Middle: Foto + botón */}
      <Title order={1} fw={300} ta="center" c="white" mb={16}>
        Instrucción 2/3
      </Title>
      <div
        style={{
          borderRadius: 24,
          padding: "min(6px, 2vw)",
          background: "linear-gradient(180deg, #ff6634 0%, #1ba4fd 100%)",
          width: "clamp(180px, 50vw, 300px)",
          height: "clamp(180px, 50vw, 300px)",
          boxShadow: `
              0 -12px 32px 0 #ff663499,   
              0  14px 38px 0 #1ba4fd99,    
              0  0px 40px 0 #14204660,   
              0  0px 0px 2px #fff
            `,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          margin: "0 auto",
          marginBottom: "clamp(38px, 6vw, 56px)",
        }}
      >
        {/* Card cuadrada blanca */}
        <div
          style={{
            borderRadius: 24,
            background: "#fff",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          {/* Foto cuadrada */}
          <img
            src={photo || "/CARA_HOMBRE_3.png"}
            alt="selfie"
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 20,
              objectFit: "cover",
              display: "block",
            }}
            draggable={false}
          />

          {/* Botón debajo de la foto, alineado a la izquierda */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              goTo(1);
            }}
            style={{
              position: "absolute",
              left: 10,
              bottom: -46,
              color: "#fff",
              background:
                "linear-gradient(120deg, #ff5b9f 0%, #ffd36e 40%, #4fc6ff 80%, #a66bff 100%)",
              borderRadius: 4,
              fontWeight: 600,
              fontSize: "clamp(12px, 2.6vw, 17px)",
              minWidth: "clamp(150px, 50vw, 210px)",
              minHeight: 36,
              height: 36,
              cursor: "pointer",
              outline: "none",
              display: "flex",
              alignItems: "center",
              overflow: "hidden",
              zIndex: 5,
              padding: 0,
              margin: 0,
              border: "none",
              boxShadow: "0 2px 12px #2AB8FF33",
            }}
          >
            <span
              style={{
                background: "black",
                color: "#fff",
                borderRadius: 2,
                padding: "8px 16px",
                fontWeight: 600,
                fontSize: "inherit",
                display: "block",
                lineHeight: 1.1,
                width: "100%",
                textAlign: "start",
              }}
            >
              Cargar nueva foto
            </span>
          </button>
        </div>
      </div>

      {/* Bottom: Texto “¡Carga exitosa!” y botón siguiente instrucción */}
      <div style={{ width: "100%" }}>
        <Title c="white" fw={300} ta="center" mb={16} mx="sm">
          Toma la foto del celular o escoge de la galería
        </Title>
        <div
          style={{
            color: "#fff",
            fontWeight: 700,
            fontSize: "clamp(2rem, 6vw, 3.2rem)",
            marginBottom: "3vh",
            textShadow: "0 3px 12px #19193999",
            textAlign: "center",
            letterSpacing: 0.2,
            width: "100%",
            userSelect: "none",
          }}
        >
          ¡Carga exitosa!
        </div>
        {/* Botón siguiente instrucción */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            position: "fixed",
            left: 0,
            bottom: 0,
            zIndex: 40,
            background: "linear-gradient(0deg, #141a27 86%, transparent 100%)",
            padding: "22px 0 20px 0",
          }}
        >
          <button
            onClick={next}
            style={{
              width: "clamp(300px, 36vw, 320px)",
              fontSize: "clamp(1.1rem, 4vw, 1.55rem)",
              fontWeight: 700,
              borderRadius: 14,
              background: "linear-gradient(90deg, #ff7a18, #1ba4fd 110%)",
              color: "#fff",
              padding: "17px 0",
              border: "none",
              boxShadow: "0 4px 18px #686e8955",
              letterSpacing: "0.01em",
              cursor: "pointer",
              display: "block",
            }}
          >
            Siguiente instrucción
          </button>
        </div>
      </div>
    </div>
  );
}
