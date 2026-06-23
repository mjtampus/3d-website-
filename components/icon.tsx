export function Icon({
  path,
  viewBox = "0 0 24 24",
}: {
  path: string;
  viewBox?: string;
}) {
  return (
    <svg aria-hidden="true" viewBox={viewBox} className="icon">
      <path d={path} />
    </svg>
  );
}
