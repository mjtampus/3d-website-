type CatPeekProps = {
  side: "bottom-right" | "bottom-left" | "top-right" | "top-left" | "right" | "left";
  tone: "sunrise" | "mint" | "violet" | "amber" | "graphite";
  label: string;
};

export function CatPeek({ side, tone, label }: CatPeekProps) {
  return (
    <div
      className={`cat-peek cat-${side} cat-${tone}`}
      data-mascot
      aria-hidden="true"
    >
      <span className="cat-peek-label">{label}</span>
      <svg viewBox="0 0 220 220" role="presentation">
        <defs>
          <linearGradient id={`cat-gradient-${tone}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.92" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0.72" />
          </linearGradient>
        </defs>
        <g fill={`url(#cat-gradient-${tone})`}>
          <path
            className="cat-tail"
            d="M70 144c-18 10-28 26-26 44 2 13 10 22 22 27"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="10"
          />
          <path d="M54 198c0-43 26-72 56-72s56 29 56 72z" />
          <circle cx="110" cy="108" r="44" />
          <path className="cat-ear" d="m78 82-18-38 38 22z" />
          <path className="cat-ear" d="m142 82 18-38-38 22z" />
          <path d="M112 132c19 0 33-8 42-20-7 21-19 34-42 34s-35-13-42-34c9 12 23 20 42 20z" />
        </g>
        <g fill="#fff" className="cat-face">
          <circle cx="96" cy="108" r="5" />
          <circle cx="124" cy="108" r="5" />
        </g>
        <circle cx="96" cy="108" r="2.2" fill="#000" className="cat-pupil" />
        <circle cx="124" cy="108" r="2.2" fill="#000" className="cat-pupil" />
        <path
          d="M105 120c3 4 7 4 10 0"
          fill="none"
          stroke="#fff"
          strokeLinecap="round"
          strokeWidth="2.2"
        />
      </svg>
    </div>
  );
}
