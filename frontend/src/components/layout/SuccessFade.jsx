// A layout that absolutely centers its children and applies a fade transition.
// Pass in style (e.g., opacity, pointerEvents) as needed.
export default function SuccessFade({ children, style, ...props }) {
  return (
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
      style={style}
      {...props}
    >
      {children}
    </div>
  );
}
