import { useEffect, useRef } from "react";
import Lottie from "lottie-react";
import animationError from "../../assets/error.json";

export default function ErrorMessage({ error, show, onTransitionEnd }) {
  const lottieRef = useRef(); // Refernce to our lottie animation

  // Play the lottie animation when error is not null
  useEffect(() => {
    if (error && lottieRef.current) {
      lottieRef.current.stop();
      lottieRef.current.play();
    }
  }, [error]);

  return (
    <div
      className="transition-all duration-500 overflow-hidden mb-2"
      style={{
        maxHeight: show ? 100 : 0,
      }}
    >
      <div
        className="flex flex-col items-center transition-opacity duration-500 w-full"
        style={{
          opacity: show ? 1 : 0,
        }}
        onTransitionEnd={onTransitionEnd}
      >
        <Lottie
          lottieRef={lottieRef}
          animationData={animationError}
          loop={false}
          className="w-12 h-12 mb-2"
        />
        <p className="text-red-400">{error || ""}</p>
      </div>
    </div>
  );
}
