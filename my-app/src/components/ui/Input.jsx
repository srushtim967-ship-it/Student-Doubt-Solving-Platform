export default function Input({ className = "", ...props }) {
  return (
    <input
      {...props}
      className={`text-gray-500 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black ${className}`}
    />
  );
}
