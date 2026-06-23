export function Icon({
  path,
  viewBox = "0 0 24 24",
  className = "icon",
}: {
  path: string;
  viewBox?: string;
  className?: string;
}) {
  return (
    <svg aria-hidden="true" viewBox={viewBox} className={className}>
      <path d={path} />
    </svg>
  );
}
