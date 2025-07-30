import { Button } from "@mantine/core";

const fondo = "/FONDO-HOME.png";
const centralImage = "/TEXTOS_HOME.png";

export default function StepWelcome({ next }: { next: () => void }) {
  return (
    <div className="step-welcome-bg" onClick={next}>
      <div className="step-welcome-center">
        <img
          src={centralImage}
          alt="GOAT FACE moto ai"
          className="step-welcome-image"
          draggable={false}
        />

        <Button
          size="xl"
          radius="md"
          className="step-welcome-btn"
          style={{
            fontWeight: 800,
            letterSpacing: 1,
            background: "#fff",
            color: "#222",
            boxShadow: "0 4px 18px 0 rgba(0,0,0,0.09)",
            border: "none",
            cursor: "pointer",
            transition: "background 0.2s, box-shadow 0.2s, transform 0.1s",
          }}
          onMouseDown={e => (e.currentTarget.style.transform = "scale(0.96)")}
          onMouseUp={e => (e.currentTarget.style.transform = "scale(1)")}
          onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
        >
          Comenzar
        </Button>
      </div>

      <style>{`
        .step-welcome-bg {
          position: fixed;
          inset: 0;
          width: 100vw;
          height: 100vh;
          background-image: url(${fondo});
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          overflow: hidden;
          padding: 0;
        }
        .step-welcome-center {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .step-welcome-image {
          width: min(90vw, 600px);
          max-width: 600px;
          aspect-ratio: 9/16;
          object-fit: cover;
          border-radius: 24px;
          pointer-events: none;
          user-select: none;
          display: block;
          transition: all 0.2s;
        }
        .step-welcome-btn {
          width: min(85vw, 320px);
          max-width: 320px;
          font-size: 22px;
          margin-top: 32px;
        }

        /* Responsive */
        @media (max-width: 600px) {
          .step-welcome-image {
            width: 98vw;
            max-width: 98vw;
            border-radius: 8px;
            margin-top: 4vw;
            margin-bottom: 2vw;
          }
          .step-welcome-btn {
            font-size: 16px;
            width: 88vw;
            max-width: 98vw;
          }
        }
      `}</style>
    </div>
  );
}
