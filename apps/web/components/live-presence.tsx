export function LivePresence({ count, mobile = false }: { count: number; mobile?: boolean }) {
  const label = `${count} ${count === 1 ? "person" : "people"} viewing now`;
  return (
    <span className={`live-presence ${mobile ? "mobile-presence" : ""}`} aria-live="polite" aria-label={label}>
      <i aria-hidden="true" />
      <span>{label}</span>
    </span>
  );
}
