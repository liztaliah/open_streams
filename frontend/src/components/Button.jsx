export default function Button({ children, classname = "", ...props }) {
  return (
    <button
      className={`w-24 px-4 py-2 bg-neutral-700 rounded-full hover:bg-neutral-600 transition ${classname}`}
      {...props}
    >
      {children}
    </button>
  );
}
