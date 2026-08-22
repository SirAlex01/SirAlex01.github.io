/**
 * Fixed, purely-CSS backdrop: concentric wave fronts radiating from two
 * off-screen origins (where they cross they read as interference), a soft
 * stage light from above, a slow second bloom, fine grain and a vignette.
 * Token-driven, so it re-themes with the rest of the UI.
 */
export default function AmbientBackground() {
  return (
    <div className="ambient" aria-hidden="true">
      <div className="ambient__glow ambient__glow--a" />
      <div className="ambient__glow ambient__glow--b" />
      <div className="ambient__waves" />
      <div className="ambient__noise" />
      <div className="ambient__vignette" />
    </div>
  );
}
