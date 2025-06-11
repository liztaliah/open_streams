export default function Input({ className = "", ...props }) {
  return (
    <input className={`px-4 py-2 bg-neutral-700 ${className}`} {...props} />
  );
}
