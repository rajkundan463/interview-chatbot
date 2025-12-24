import { TypeAnimation } from "react-type-animation";

const TypingAnim = () => {
  return (
    <TypeAnimation
      sequence={[
        "Chat With AI Assistant",
        1500,
        "Built With GEMINI + MERN",
        1500,
        "Your Personal Interview Assistant ",
        1500,
      ]}
      speed={50}
      repeat={Infinity}
      style={{
        fontSize: "clamp(28px, 5vw, 60px)",
        fontFamily: "Work Sans, sans-serif",
        fontWeight: 700,
        color: "white",
        textShadow: "1px 1px 25px rgba(0,0,0,0.6)",
      }}
    />
  );
};

export default TypingAnim;
