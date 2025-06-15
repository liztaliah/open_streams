export default function Button({ children, classname = "", ...props }) {
  return (
    <button
      className={`
        focus:outline-none
        focus:ring-2
        focus:ring-white
        w-24 
        px-4 
        py-2 
        bg-neutral-700 
        rounded-full 
        hover:bg-neutral-600 
        transition 
        duration-150
        ${classname}`}
      {...props}
    >
      {children}
    </button>
  );
}
