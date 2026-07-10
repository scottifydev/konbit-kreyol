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
        if (!cancelled.current && chunks.current.length) {
          onRecorded(new Blob(chunks.current, { type: mr.mimeType }));
        }
      };
      mr.start();
      setSeconds(0);
      setRecording(true);
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
      {recording ? `● ${seconds}s` : labels.idle}
    </button>
  );
}
