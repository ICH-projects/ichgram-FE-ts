export default function EndIcon({ className = "" }) {
  return (
    <svg
      width="100"
      height="100"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs id="Patterns_And_Gradients">
        <linearGradient id="Gradient1" gradientTransform="rotate(45 0.5 0.5)">
          <stop offset="0" stopColor="#F7D44C" stopOpacity="1" />
          <stop offset="0.5" stopColor="#c00000" stopOpacity="1" />
          <stop offset="1" stopColor="#7938E9" stopOpacity="1" />
        </linearGradient>
      </defs>

      <circle
        cx="50"
        cy="50"
        r="47"
        strokeWidth="2.3"
        fill="none"
        stroke="url(#Gradient1)"
      />

      <path
        d="M 25 50 L 40 65 L 75 35"
        fill="none"
        stroke="url(#Gradient1)"
        strokeWidth="2.3"
        strokeLinecap="round"
      />
    </svg>
  );
}
