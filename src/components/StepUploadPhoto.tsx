import { Text } from "@mantine/core";
import { useRef, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { motion } from "framer-motion";

interface Props {
  next: () => void;
  prev?: () => void;
  setPhoto: (url: string) => void;
}

const caras = "/CARAS.png";
const cel = "/CEL.png";
const avatar = "/CARA_HOMBRE.png";
const selfie = "/selfie.png";

const SOCKET_URL = "https://moto-ai-server-wd9gh.ondigitalocean.app";

export default function StepUploadPhoto({ next, setPhoto }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [waitingImage, setWaitingImage] = useState(true);

  useEffect(() => {
    const socket = io(SOCKET_URL);

    socket.on("nueva-imagen", (data) => {
      setPhoto(data.url);
      setWaitingImage(false);
      next();
    });

    return () => {
      socket.disconnect();
    };
  }, [setPhoto, next]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
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
      {/* Caja con borde neón y pulso */}
      <motion.div
        initial={{ boxShadow: "0 0 20px 6px #ff4fc680" }}
        animate={{
          boxShadow: [
            "0 0 20px 6px #ff4fc680",
            "0 0 42px 14px #ff4fc680",
            "0 0 20px 6px #ff4fc680",
          ],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        style={{
          padding: "max(0vw, 6px)",
          borderRadius: 36,
          background:
            "linear-gradient(120deg, #ff5b9f 0%, #ffd36e 40%, #4fc6ff 80%, #a66bff 100%)",
          maxWidth: 440,
          width: "95vw",
          maxHeight: "94vh",
          minHeight: 320,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Contenido blanco */}
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
          {/* Aquí mostramos indicación solo si esperamos la imagen */}
          {waitingImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, repeat: Infinity, repeatType: "mirror" }}
              style={{
                marginBottom: 20,
                color: "#ff784f",
                fontWeight: "700",
                fontSize: "1.2rem",
                userSelect: "none",
                textAlign: "center",
              }}
            >
              Esperando que se genere el avatar en el celular Motorola...
            </motion.div>
          )}

          {/* Imágenes con float animado */}
          <motion.img
            src={caras}
            alt="rostros"
            draggable={false}
            style={{
              width: "min(220px, 80vw)",
              height: "auto",
              marginBottom: 10,
              maxWidth: "100%",
              opacity: waitingImage ? 0.7 : 1,
              transition: "opacity 0.4s ease",
            }}
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Card Moto IA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
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
            <motion.img
              src={cel}
              alt="Moto IA"
              draggable={false}
              style={{ width: 80, height: 80, minWidth: 24 }}
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
            <Text
              size="md"
              fw={600}
              style={{ fontSize: "clamp(1.23rem, 2.6vw, 1.23rem)" }}
            >
              Abre Moto IA en el celular e ingresa a <strong>"Image Studio"</strong>
            </Text>
          </motion.div>

          {/* Card Avatar 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
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
            <motion.img
              src={avatar}
              alt="crear avatar"
              draggable={false}
              style={{ width: 80, height: 80, minWidth: 24 }}
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
            <Text
              size="md"
              fw={600}
              style={{ fontSize: "clamp(1.23rem, 2.6vw, 1.23rem)" }}
            >
              Entra a <strong>“Crear avatar”</strong>
            </Text>
          </motion.div>

          {/* Card Avatar 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
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
            <motion.img
              src={selfie}
              alt="crear avatar"
              draggable={false}
              style={{ width: 80, height: 80, minWidth: 24 }}
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
            <Text
              size="md"
              fw={600}
              style={{ fontSize: "clamp(1.23rem, 2.6vw, 1.23rem)" }}
            >
              Tomate <strong> una selfie</strong>
            </Text>
          </motion.div>

          {/* Botón animado */}
          <motion.button
            onClick={() => next()}
            whileHover={{ scale: 1.05, boxShadow: "0 10px 25px #ff5b9fcc" }}
            whileTap={{ scale: 0.95 }}
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
            ¡Vamos!
          </motion.button>

          {/* Input oculto */}
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            style={{ display: "none" }}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setPhoto(URL.createObjectURL(file));
                next();
              }
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
