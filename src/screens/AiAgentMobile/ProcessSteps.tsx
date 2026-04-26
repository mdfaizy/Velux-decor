import React from "react";

interface ProcessStep {
  step: string;
  title: string;
  desc: string;
}

interface ProcessStepsProps {
  processRef: (node?: Element | null | undefined) => void;
  processInView: boolean;
  PROCESS_STEPS: ProcessStep[];
}

export const ProcessSteps: React.FC<ProcessStepsProps> = ({
  processRef,
  processInView,
  PROCESS_STEPS,
}) => {
  return (
    <section
      ref={processRef}
      style={{ padding: "110px 0", background: "#3D2B1F" }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(201,168,76,0.15)",
              borderRadius: 30,
              padding: "6px 18px",
              marginBottom: 20,
              border: "1px solid rgba(201,168,76,0.2)",
            }}
          >
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: "#C9A84C",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              How It Works
            </span>
          </div>
          <h2
            style={{
              fontFamily: "'Playfair Display',serif",
              fontSize: "clamp(28px,4vw,48px)",
              fontWeight: 700,
              color: "#FAF7F2",
              marginBottom: 16,
            }}
          >
            Your Journey to a Dream Home
          </h2>
          <p
            style={{
              fontSize: 17,
              color: "rgba(250,247,242,0.6)",
              maxWidth: 500,
              margin: "0 auto",
            }}
          >
            A seamless, stress-free experience from the first consultation to
            the final installation.
          </p>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
            gap: 0,
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 40,
              left: "12.5%",
              right: "12.5%",
              height: 1,
              background:
                "linear-gradient(to right,rgba(201,168,76,0.1),rgba(201,168,76,0.5),rgba(201,168,76,0.1))",
            }}
            className="hidden md:block"
          />
          {PROCESS_STEPS.map((step, i) => (
            <div
              key={step.step}
              style={{
                textAlign: "center",
                padding: "0 20px",
                opacity: processInView ? 1 : 0,
                transform: processInView
                  ? "translateY(0)"
                  : "translateY(20px)",
                transition: `all 0.6s ease ${i * 0.15}s`,
              }}
            >
              <div
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  border: "2px solid rgba(201,168,76,0.35)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 28px",
                  background: "rgba(201,168,76,0.08)",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                <span
                  style={{
                    fontFamily: "'Playfair Display',serif",
                    fontSize: 22,
                    fontWeight: 700,
                    color: "#C9A84C",
                  }}
                >
                  {step.step}
                </span>
              </div>
              <h3
                style={{
                  fontFamily: "'Playfair Display',serif",
                  fontSize: 20,
                  fontWeight: 600,
                  color: "#FAF7F2",
                  marginBottom: 10,
                }}
              >
                {step.title}
              </h3>
              <p
                style={{
                  fontSize: 14,
                  color: "rgba(250,247,242,0.55)",
                  lineHeight: 1.6,
                }}
              >
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};