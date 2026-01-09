export default function ConstellationOverlay() {
  return (
    <svg
      viewBox="0 0 400 240"
      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      aria-hidden="true"
    >
      <path
        d="M40 180 L110 120 L180 150 L260 90 L340 130"
        stroke="rgba(70, 243, 255, 0.8)"
        strokeWidth="1.2"
        fill="none"
        className="constellation-path"
      />
      <path
        d="M70 80 L140 50 L210 70 L290 40"
        stroke="rgba(255, 79, 216, 0.7)"
        strokeWidth="1"
        fill="none"
        className="constellation-path"
      />
      {[
        [40, 180],
        [110, 120],
        [180, 150],
        [260, 90],
        [340, 130],
        [70, 80],
        [140, 50],
        [210, 70],
        [290, 40]
      ].map(([x, y], index) => (
        <circle
          key={index}
          cx={x}
          cy={y}
          r="2.6"
          fill="rgba(255, 255, 255, 0.9)"
          className="animate-pulse"
        />
      ))}
    </svg>
  );
}
