import { useState } from "react";
import { MantineProvider, Container, Paper } from "@mantine/core";
import StepWelcome from "./components/StepWelcome";
import StepUploadPhoto from "./components/StepUploadPhoto";
import StepLoading from "./components/StepLoading";
import StepSuccess from "./components/StepSuccess";
import StepCustomize from "./components/StepCustomize";
import StepFinish from "./components/StepFinish";

function App() {
  const [step, setStep] = useState(0);
  const [photo, setPhoto] = useState<string | null>(null);
  const [customStyle, setCustomStyle] = useState<string | null>(null);

  const next = () => setStep((s) => s + 1);
  const prev = () => setStep((s) => Math.max(s - 1, 0));
  const goTo = (n: number) => setStep(n);

  return (
    <MantineProvider>
      <Container size="xs" p="lg">
        <Paper shadow="md" p="xl" radius="lg">
          {step === 0 && <StepWelcome next={next} />}
          {step === 1 && (
            <StepUploadPhoto next={next} prev={prev} setPhoto={setPhoto} />
          )}
          {step === 2 && <StepLoading next={next} />}
          {step === 3 && (
            <StepSuccess next={next} goTo={goTo} photo={photo} />
          )}
          {step === 4 && (
            <StepCustomize
              photo={photo}
              setCustomStyle={setCustomStyle}
              next={next}
              prev={prev}
            />
          )}
          {step === 5 && <StepFinish avatar={customStyle as string} />}
        </Paper>
      </Container>
    </MantineProvider>
  );
}

export default App;
