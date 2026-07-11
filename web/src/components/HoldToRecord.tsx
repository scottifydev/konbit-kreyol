"use client";
import { useRef, useState } from "react";

/** Hold-to-record — pointer events only, touch-action:none (house rules;
 *  05 §11 phone ergonomics). Recording state = solid red field + counting
 *  timer (no pulsing). Slide off or pointercancel = cancel.
 *  NO MACHINE JUDGMENT: this component records and uploads; nothing here
 *  or downstream evaluates the audio (voice law 3). */
export default function HoldToRecord({
  labels,
  onRecorded,
}: {
  labels: { idle: string; denied: string[] };
  onRecorded: (blob: Blob) => void;
}) {
  const [recording, setRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [denied, setDenied] = useState(false);
  const rec = useRef<MediaRecorder | null>(null);
  const chunks = useRef<Blob[]>([]);
  const tick = useRef<ReturnType<typeof setInterval> | null>(null);
  const cancelled = useRef(false);
  // live level meter — proves the mic hears you (volume only, never a grade)
  const meter = useRef<HTMLDivElement | null>(null);
  const audioCtx = useRef<AudioContext | null>(null);
  const raf = useRef<number | null>(null);

  const BARS = 15;

  const teardownMeter = () => {
    if (raf.current) cancelAnimationFrame(raf.current);
    raf.current = null;
    audioCtx.current?.close().catch(() => {});
    audioCtx.current = null;
  };

  const startMeter = (stream: MediaStream) => {
    try {
      const Ctx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      const ctx = new Ctx();
      audioCtx.current = ctx;
      const src = ctx.createMediaStreamSource(stream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 64;
      src.connect(analyser);
      const data = new Uint8Array(analyser.frequencyBinCount);
      const draw = () => {
        analyser.getByteFrequencyData(data);
        const bars = meter.current?.children;
        if (bars) {
          for (let b = 0; b < bars.length; b++) {
            const v = data[b + 1] / 255; // skip DC bin
            (bars[b] as HTMLElement).style.transform = `scaleY(${1 + v * 6})`;
          }
        }
        raf.current = requestAnimationFrame(draw);
      };
      draw();
    } catch {
      /* no Web Audio — the timer still shows it's recording */
    }
  };

  const start = async () => {
    cancelled.current = false;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mr = new MediaRecorder(stream);
      rec.current = mr;
      chunks.current = [];
      mr.ondataavailable = (e) => chunks.current.push(e.data);
      mr.onstop = () => {
        stream.getTracks().forEach((t) => t.stop());
        teardownMeter();
        if (!cancelled.current && chunks.current.length) {
          onRecorded(new Blob(chunks.current, { type: mr.mimeType }));
        }
      };
      mr.start();
      setSeconds(0);
      setRecording(true);
      startMeter(stream);
      tick.current = setInterval(() => setSeconds((s) => s + 1), 1000);
    } catch {
      setDenied(true);
    }
  };

  const stop = (cancel: boolean) => {
    cancelled.current = cancel;
    if (tick.current) clearInterval(tick.current);
    setRecording(false);
    if (rec.current && rec.current.state !== "inactive") rec.current.stop();
    else teardownMeter();
  };

  if (denied) {
    // mic-denied = numbered steps on the slate, never an apology (05 §9)
    return (
      <div className="slate">
        <ol>
          {labels.denied.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ol>
      </div>
    );
  }

  return (
    <button
      className={recording ? "hold-bar recording" : "hold-bar"}
      onPointerDown={start}
      onPointerUp={() => stop(false)}
      onPointerLeave={() => recording && stop(true)}
      onPointerCancel={() => stop(true)}
    >
      {recording ? (
        <>
          ● {seconds}s
          <div className="meter" ref={meter} aria-hidden>
            {Array.from({ length: BARS }, (_, k) => (
              <i key={k} />
            ))}
          </div>
        </>
      ) : (
        labels.idle
      )}
    </button>
  );
}
