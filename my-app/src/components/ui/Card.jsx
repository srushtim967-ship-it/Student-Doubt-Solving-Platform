export default function Card({ children, className = "" }) {
  return (
    <div
      className={`bg-white p-6 rounded-xl shadow ${className}`}
    >
      {children}
    </div>
  );
}
