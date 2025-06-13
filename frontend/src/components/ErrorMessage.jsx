import Lottie from "lottie-react";
import animationError from "../assets/error.json";

export default function ErrorMessage({ error }) {
  return (
    <div
      className="transition-all duration-500 overflow-hidden mb-2"
      style={{
        maxHeight: error ? 100 : 0,
        opacity: error ? 1 : 0,
      }}
    >
      {error && (
        <div className="flex flex-col items-center">
          <Lottie
            animationData={animationError}
            loop={false}
            className="w-12 h-12 mb-2"
          />
          <p className="text-red-400">{error}</p>
        </div>
      )}
    </div>
  );
}
