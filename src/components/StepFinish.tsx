import { Title, Text } from "@mantine/core";

const logo = "/LOGO_MOTO_IA.png"; // Logo grande arriba
const logosFooter = "/LOGOS.png"; // Logos FIFA/Motorola, abajo
const avatarFinal = "/CARA_HOMBRE_3.png"; // Cambia por el avatar final generado

export default function StepFinish({ avatar }: { avatar: string }) {
  console.log(avatar)
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
      }}
    >
      {/* Logo moto ai arriba */}
      <div style={{ marginTop: 38, marginBottom: 12 }}>
        <img
          src={logo}
          alt="Logo moto ai"
          style={{
            width: 250,
            height: "auto",
            userSelect: "none",
            pointerEvents: "none",
            display: "block",
          }}
          draggable={false}
        />
      </div>

      {/* Avatar centrado */}
      <img
        src={avatar || avatarFinal}
        alt="Avatar final"
        style={{
          width: 280,
          height: 280,
          borderRadius: 24,
          objectFit: "cover",
          margin: "0 auto 16px auto",
          display: "block",
          boxShadow: "0 0 22px #1b224188",
        }}
        draggable={false}
      />

      {/* Mensaje central */}
      <div style={{ textAlign: "center", marginBottom: 30 }}>
        <Title
          order={1}
          style={{
            color: "#fff",
            fontWeight: 700,
            fontSize: 42,
            marginBottom: 16,
            textShadow: "0 3px 12px #19193966",
          }}
        >
          ¡Listo!
        </Title>
        <Text
          style={{
            color: "#fff",
            fontWeight: 600,
            fontSize: 24,
            textShadow: "0 2px 6px #19193940",
            marginBottom: 0,
            lineHeight: 1.2,
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

      {/* Logos de patrocinadores en el footer */}
      <div
        style={{
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end",
          marginBottom: 28,
        }}
      >
        <img
          src={logosFooter}
          alt="Patrocinadores"
          style={{
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
