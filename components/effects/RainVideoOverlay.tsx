"use client";

type RainVideoOverlayProps = {
  boosted?: boolean;
  dimmed?: boolean;
};

export default function RainVideoOverlay({ boosted = false, dimmed = false }: RainVideoOverlayProps) {
  const baseOpacity = dimmed ? 0.16 : 0.2;
  const activeOpacity = dimmed ? 0.2 : 0.25;

  return (
    <div className="rain-video-overlay pointer-events-none fixed inset-0" aria-hidden="true">
      <video
        className="h-full w-full object-cover mix-blend-screen transition-opacity duration-300"
        style={{ opacity: boosted ? activeOpacity : baseOpacity }}
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/rain.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
