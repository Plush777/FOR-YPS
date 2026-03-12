export default function Globe() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle cx={12} cy={12} r={9} stroke="currentColor" strokeWidth={1.5} />
      <path
        d="M12 3C12 3 8.5 6 8.5 12C8.5 18 12 21 12 21"
        stroke="currentColor"
        strokeWidth={1.5}
      />
      <path
        d="M12 3C12 3 15.5 6 15.5 12C15.5 18 12 21 12 21"
        stroke="currentColor"
        strokeWidth={1.5}
      />
      <path d="M3 12H21" stroke="currentColor" strokeWidth={1.5} />
      <path d="M4.5 7.5H19.5" stroke="currentColor" strokeWidth={1.5} />
      <path d="M4.5 16.5H19.5" stroke="currentColor" strokeWidth={1.5} />
    </svg>
  );
}
