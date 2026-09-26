import { useEffect, useRef } from "react";

const VIDEO_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_065045_c44942da-53c6-4804-b734-f9e07fc22e08.mp4";
const FADE = 0.5; // seconds
const RESTART_DELAY = 100; // ms

export function BackgroundVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    let raf = 0;
    let timeout = 0;

    // Opacity follows playback: fade in over the first 0.5s, fade out over the last 0.5s.
    const tick = () => {
      const { currentTime: t, duration: d } = video;
      if (d && !video.paused) {
        const opacity = t < FADE ? t / FADE : t > d - FADE ? (d - t) / FADE : 1;
        video.style.opacity = String(Math.min(1, Math.max(0, opacity)));
      }
      raf = requestAnimationFrame(tick);
    };

    const onEnded = () => {
      video.style.opacity = "0";
      timeout = window.setTimeout(() => {
        video.currentTime = 0;
        void video.play();
      }, RESTART_DELAY);
    };

    video.addEventListener("ended", onEnded);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timeout);
      video.removeEventListener("ended", onEnded);
    };
  }, []);

  return (
    <video
      ref={ref}
      src={VIDEO_URL}
      autoPlay
      muted
      playsInline
      preload="auto"
      className="absolute inset-0 h-full w-full object-cover"
      style={{ opacity: 0 }}
    />
  );
}
