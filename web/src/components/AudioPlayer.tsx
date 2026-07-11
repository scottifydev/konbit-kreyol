"use client";
import { useRef, useState } from "react";

/** A designed gold audio player — hearing your brother's voice (or the boys'
 *  recordings, in the Cipher Office) should feel like a tactile object, not a
 *  debug control. Wraps a hidden <audio>; play/pause is CSS-drawn (no emoji);
 *  the track fills gold and is scrubbable. Pointer events; touch-action:none
 *  on the track. */
export default function AudioPlayer({ src }: { src: string }) {
  const audio = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const toggle = () => {
    const a = audio.current;
    if (!a) return;
    if (a.paused) {
      a.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    } else {
      a.pause();
      setPlaying(false);
    }
  };

  const scrub = (e: React.PointerEvent<HTMLDivElement>) => {
    const a = audio.current;
    if (!a || !a.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    a.currentTime = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width)) * a.duration;
  };

  return (
    <div className="aplayer">
      <audio
        ref={audio}
        src={src}
        preload="none"
        onTimeUpdate={(e) => {
          const a = e.currentTarget;
          setProgress(a.duration ? a.currentTime / a.duration : 0);
        }}
        onEnded={() => {
          setPlaying(false);
          setProgress(0);
        }}
      />
      <button className="aplay" onPointerUp={toggle} aria-label={playing ? "pause" : "play"}>
        <span className={playing ? "aicon pause" : "aicon play"} aria-hidden />
      </button>
      <div className="atrack" onPointerUp={scrub}>
        <div className="afill" style={{ width: `${progress * 100}%` }} />
      </div>
    </div>
  );
}
