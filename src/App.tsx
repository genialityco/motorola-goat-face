import { useState } from "react";
import { MantineProvider, Container, Paper } from "@mantine/core";
import StepWelcome from "./components/StepWelcome";
import StepUploadPhoto from "./components/StepUploadPhoto";
import StepLoading from "./components/StepLoading";
// import StepSuccess from "./components/StepSuccess";
// import StepCustomize from "./components/StepCustomize";
import StepFinish from "./components/StepFinish";

function App() {
  const [step, setStep] = useState(0);
  const [photo, setPhoto] = useState<string | null>(null);
  const [customStyle, setCustomStyle] = useState<string | null>(null);

  const next = () => setStep((s) => s + 1);
  const prev = () => setStep((s) => Math.max(s - 1, 0));
  // const goTo = (n: number) => setStep(n);

  console.log("Current step:", step);
  return (
    <MantineProvider>
      <Container size="xs" p="lg">
        <Paper shadow="md" p="xl" radius="lg">
          {step === 0 && <StepWelcome next={next} />}
          {step === 1 && <StepLoading next={next} />}

          {/* {step === 2 && <StepSuccess next={next} goTo={goTo} photo={photo} />} */}
          {step === 2 && (
            <StepUploadPhoto next={next} prev={prev} setPhoto={setPhoto} />
          )}
          {/* {step === 4 && (
            <StepCustomize
              photo={photo}
              setPhoto={(img) => {
                setPhoto(img); // Actualiza la foto
                setStep(4); // Pasa al loader inmediatamente
              }}
              setCustomStyle={setCustomStyle}
              next={next}
              prev={prev}
            />
          )} */}
          {step === 4 && (
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
    </MantineProvider>
  );
}

export default App;
