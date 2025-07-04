export default function Input({ className = "", ...props }) {
  return (
    <input
      spellCheck="false"
      className={`
        input-dark
        px-4 
        py-2 
        bg-neutral-700 
        focus:outline-none 
        focus:ring-2 
        focus:ring-white 
        transition 
        duration-150 
        ${className}`}
      {...props}
    />
  );
}
