import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import Button from "./Button";
import logoAnimation from "../assets/logo.json";
import { useEffect, useState } from "react";

function Landing() {
  const navigate = useNavigate();

  // Lets have some fun with this
  // We want the heading to display one letter at a time
  const heading = "OpenStreams";
  const [displayed, setDisplayed] = useState("");
  const [showLogo, setShowLogo] = useState(false);

  // Use effect to display each letter of the heading
  // at a set interval
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(heading.slice(0, i + 1));
      i++;
      if (i === heading.length) {
        clearInterval(interval);
        setShowLogo(true); // Render logo after heading
      }
    }, 75);
    // We clear the interval again here in case the component unmounts
    return () => clearInterval(interval);
  }, [heading]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <h1 className="text-4xl font-semibold mb-8 tracking-tight">
        _{displayed}_
      </h1>
      {/* Animated logo to container animates after heading */}
      <div
        className={`transition-all duration-700 overflow-hidden`}
        style={{
          maxHeight: showLogo ? 200 : 0,
          opacity: showLogo ? 1 : 0,
        }}
      >
        {showLogo && (
          <Lottie
            animationData={logoAnimation}
            loop={false}
            className="w-40 h-40 mb-8"
          />
        )}
      </div>
      <div className="flex space-x-4">
        <Button onClick={() => navigate("/login")}>Log In</Button>
        <Button onClick={() => navigate("/signup")}>Sign Up</Button>
      </div>
    </div>
  );
}

export default Landing;
