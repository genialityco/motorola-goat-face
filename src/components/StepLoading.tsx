import { Button, Title } from "@mantine/core";

const mujer = "/MARCO_MUJER.png";
const logo = "/LOGO_MOTO_IA.png";

export default function StepLoading({ next }: { next: () => void }) {
  return (
    <div className="step-loading-bg" onClick={next}>
      <div className="step-loading-center">
        {/* Imagen principal */}
        <img
          src={mujer}
          alt="rostro mujer"
          className="rostro-mujer"
          draggable={false}
        />

        {/* Logo */}
        <img
          src={logo}
          alt="Logo moto ai"
          className="logo-moto"
          draggable={false}
        />

        {/* Título */}
        <Title fw={400} ta="center" c="white" className="step-loading-title">
          ¿Quieres ponerle
          <br />
          cara a tu GOAT?
        </Title>

        {/* Texto con degradado */}
        <div className="step-loading-gradient-text">
          <span className="step-loading-gradient-span">
            Hazlo ahora con el poder
            <br />
            revolucionario de Moto AI
          </span>
        </div>

        {/* Botón */}
        <Button className="step-loading-btn" size="compact-xl" radius="md">
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
        }
        .logo-moto {
          position: absolute;
          top: max(5vw, 32px);
          left: 50%;
          transform: translateX(-50%);
          width: min(220px, 38vw);
          height: auto;
          z-index: 10;
          pointer-events: none;
          user-select: none;
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
          text-shadow: 0 2px 10px #000a;
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
          background: linear-gradient(90deg, #ff6b37, #4fd1ff 90%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-weight: 700;
          filter: drop-shadow(0 2px 6px #ffab5c33);
          font-size: clamp(1.05rem, 4.3vw, 1.34rem);
        }
        .step-loading-btn {
          z-index: 12;
          position: absolute;
          left: 50%;
          bottom: 10vh;
          transform: translateX(-50%);
          background: linear-gradient(90deg, #ff784f, #ffb376 85%);
          font-size: clamp(1.09rem, 4vw, 1.4rem);
          padding: 0.92em 3.2em;
          font-weight: 800;
          letter-spacing: 0.2em;
          border: none;
          box-shadow: 0 3px 16px 0 #ff864033;
          min-width: 120px;
          max-width: 320px;
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
