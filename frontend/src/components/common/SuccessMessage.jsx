import Lottie from "lottie-react";
import animationSuccess from "../../assets/success.json";
import Button from "./Button";

// SuccessMessage component displays a success animation and a login button
export default function SuccessMessage({ onLogin }) {
  return (
    // Container for centering the content and handling transitions
    <div
      className="
        absolute 
        inset-0 
        flex 
        flex-col 
        items-center 
        justify-center 
        w-full 
        h-full 
        transition-opacity 
        duration-500"
    >
      {/* Lottie animation for success */}
      <Lottie
        animationData={animationSuccess}
        loop={false}
        className="w-16 h-16 mb-2"
      />
      {/* Success message text */}
      <p className="text-green-300 mb-8">account created successfully</p>
      {/* Button to trigger login action */}
      <Button onClick={onLogin}>Log In</Button>
    </div>
  );
}
