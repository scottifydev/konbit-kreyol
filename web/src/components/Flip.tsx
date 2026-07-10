"use client";
import { useRef, useState } from "react";
import type { ChromeView } from "@/lib/engine/gate";

/** Renders one resolved chrome string. When the text is Kreyòl it carries
 *  data-en and the long-press escape hatch (language law §1.6). Pointer
 *  events only (house rules). */
export default function Flip({ view }: { view: ChromeView }) {
  const [tip, setTip] = useState<{ x: number; y: number } | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  if (!view.kreyol) return <>{view.text}</>;

  const start = (e: React.PointerEvent) => {
    const { clientX, clientY } = e;
    timer.current = setTimeout(
      () => setTip({ x: clientX, y: clientY + 20 }),
      450,
    );
  };
  const end = () => {
    if (timer.current) clearTimeout(timer.current);
    setTip(null);
  };

  return (
    <>
      <span
        className={view.isNew ? "flip flipnew" : "flip"}
        data-en={view.en}
        onPointerDown={start}
        onPointerUp={end}
        onPointerLeave={end}
        onPointerCancel={end}
      >
        {view.text}
      </span>
      {tip && (
        <span className="tooltip" style={{ left: tip.x, top: tip.y }}>
          {view.en}
        </span>
      )}
    </>
  );
}
