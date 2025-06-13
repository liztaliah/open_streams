export default function FormContainer({ children }) {
  return (
    <div className="relative transition-all duration-500 overflow-hidden flex flex-col items-center h-[175px] w-full max-w-[320px]">
      {children}
    </div>
  );
}
