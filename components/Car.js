// Top-view sports car drawn as inline SVG (original artwork, no external image needed).
export default function Car() {
  return (
    <svg viewBox="0 0 200 420" className="h-full w-full drop-shadow-[0_30px_40px_rgba(0,0,0,.7)]" aria-label="Sports car, top view" role="img">
      <defs>
        <linearGradient id="body" x1="0" x2="1">
          <stop offset="0" stopColor="#7fb800" />
          <stop offset=".5" stopColor="#c6ff3d" />
          <stop offset="1" stopColor="#7fb800" />
        </linearGradient>
        <linearGradient id="glass" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#1c2a33" />
          <stop offset="1" stopColor="#05090c" />
        </linearGradient>
      </defs>
      {/* wheels */}
      {[[18, 80], [162, 80], [18, 300], [162, 300]].map(([x, y], i) => (
        <rect key={i} x={x - 14} y={y - 32} width="28" height="64" rx="10" fill="#0a0a0a" />
      ))}
      {/* body */}
      <path d="M100 8 C150 8 172 60 172 130 L176 300 C176 370 150 410 100 412 C50 410 24 370 24 300 L28 130 C28 60 50 8 100 8Z" fill="url(#body)" />
      {/* hood lines */}
      <path d="M78 30 C80 80 78 110 74 130 M122 30 C120 80 122 110 126 130" stroke="rgba(0,0,0,.25)" strokeWidth="2" fill="none" />
      {/* windshield + cabin */}
      <path d="M56 140 C70 120 130 120 144 140 L138 175 L62 175Z" fill="url(#glass)" />
      <rect x="60" y="175" width="80" height="70" rx="14" fill="#0b1217" />
      <path d="M62 250 L138 250 L146 285 C120 296 80 296 54 285Z" fill="url(#glass)" />
      {/* side mirrors */}
      <rect x="8" y="150" width="20" height="12" rx="5" fill="#8fd000" />
      <rect x="172" y="150" width="20" height="12" rx="5" fill="#8fd000" />
      {/* head & tail lights */}
      <path d="M44 48 L74 40 L70 52Z M156 48 L126 40 L130 52Z" fill="#fff" />
      <rect x="44" y="392" width="34" height="6" rx="3" fill="#ff2d2d" />
      <rect x="122" y="392" width="34" height="6" rx="3" fill="#ff2d2d" />
    </svg>
  );
}
