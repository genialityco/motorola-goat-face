import { useState } from "react";
import { MantineProvider, Container, Paper } from "@mantine/core";
import { Routes, Route } from "react-router-dom";

import StepWelcome from "./components/StepWelcome";
import StepUploadPhoto from "./components/StepUploadPhoto";
import StepLoading from "./components/StepLoading";
import StepFinish from "./components/StepFinish";
import StepSmartConnect from "./components/StepSmartConnect";
import StepPublicity from "./components/StepPublicity";
import DownloadFrame from "./components/DownloadFrame"; // 👈 nuevo

function App() {
  const [step, setStep] = useState(0);
  const [photo, setPhoto] = useState<string | null>(null);
  const [customStyle, setCustomStyle] = useState<string | null>(null);

  const next = () => setStep((s) => s + 1);

  return (
    <MantineProvider>
      <Routes>
        {/* Flujo principal con steps */}
        <Route
          path="/"
          element={
            <Container size="xs" p="lg">
              <Paper shadow="md" p="xl" radius="lg">
                {step === 0 && <StepWelcome next={next} />}
                {step === 1 && <StepLoading next={next} />}
                {step === 2 && <StepPublicity next={next} />}
                {step === 3 && <StepUploadPhoto next={next} />}
                {step === 4 && <StepSmartConnect next={next} setPhoto={setPhoto} />}
                {step === 5 && (
                  <StepFinish
                    avatar={customStyle as string}
                    photo={photo}
                    onRestart={() => {
                      setStep(0);
                      setPhoto(null);
                      setCustomStyle(null);
                    }}
                  />
                )}
              </Paper>
            </Container>
          }
        />

        {/* Nueva ruta para el marco descargable */}
        <Route path="/download-frame" element={<DownloadFrame />} />
      </Routes>
    </MantineProvider>
  );
}

export default App;
