// A layout that centers its children vertically and horizontally,
// with optional padding and min height.
export default function PageCenterLayout({ children }) {
  return (
    <div
      className="
        flex 
        flex-col 
        items-center 
        justify-center 
        min-h-screen 
        px-4"
    >
      {children}
    </div>
  );
}
