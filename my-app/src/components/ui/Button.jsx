// Inside your Button.jsx
export default function Button({ className, children, ...props }) {
  return (
    <button className={`default-styles ${className}`} {...props}>
      {children}
    </button>
  );
}
