"use client";
import { useEffect, useRef } from "react";

/** The real geography of Saint-Domingue — accurate coastline + the 8
 *  battles at their true coordinates, painted in the Drapo Ginen palette.
 *  (Owner: show the geography, not a generic mountain.) Ported from the
 *  mockup; colors are the Drapo tokens, hard-coded for render stability. */

const C = {
  kanvas: "#f2ecd9", bone: "#efe9d2", cornmeal: "#e8d9a0", umber: "#3a2a1c",
  night: "#120e0b", deepblue: "#16294d", seateal: "#17726b", deepsea: "#0c3b47",
  emerald: "#1e7a4d", ochre: "#c88a3a", oxblood: "#6e1414", iron: "#2a2622",
};
const SEA = [[19.6,-71.74],[19.67,-71.83],[19.7,-72.02],[19.77,-72.19],[19.85,-72.53],[19.95,-72.83],[19.9,-73.1],[19.83,-73.42],[19.68,-73.32],[19.65,-73.21],[19.63,-73.04],[19.45,-72.69],[19.25,-72.8],[19.1,-72.7],[18.95,-72.7],[18.77,-72.51],[18.73,-72.42],[18.57,-72.34],[18.51,-72.63],[18.43,-72.77],[18.45,-73.09],[18.53,-73.51],[18.48,-73.64],[18.57,-73.88],[18.65,-74.12],[18.4,-74.45],[18.06,-73.92],[18.19,-73.74],[18.15,-73.1],[18.18,-72.75],[18.22,-72.53],[18.23,-72.06],[18.03,-71.75]];
const BORDER = [[18.03,-71.75],[18.3,-71.76],[18.6,-71.72],[19,-71.78],[19.3,-71.7],[19.6,-71.74]];
const GONAVE = [[18.9,-73.28],[18.85,-72.93],[18.78,-72.99],[18.79,-73.2],[18.85,-73.38]];
const TORTUE = [[20.07,-72.98],[20.05,-72.65],[20,-72.68],[20.02,-72.95]];
const MSITES = [{n:1,lat:19.66,lng:-72.28},{n:2,lat:19.77,lng:-72.19},{n:3,lat:19.83,lng:-73.4},{n:4,lat:19.52,lng:-72.56},{n:5,lat:19.13,lng:-72.48},{n:6,lat:18.77,lng:-72.51},{n:7,lat:19.74,lng:-72.23},{n:8,lat:19.45,lng:-72.69}];
const MRANGES = [[19.55,-72.95,19.4,-71.95,9],[19.28,-72.52,19.08,-72.05,5],[18.92,-72.78,18.62,-72.3,6],[18.34,-72.55,18.29,-71.98,6],[18.4,-74.25,18.33,-73.68,5]];
const NPLAIN = [[19.72,-72.42],[19.8,-72.1],[19.62,-71.98],[19.5,-72.2],[19.55,-72.42]];

export default function CampaignMap({ currentUnit = 4 }: { currentUnit?: number }) {
  const ref = useRef<SVGSVGElement>(null);
  useEffect(() => {
    const s = ref.current;
    if (!s) return;
    const NS = "http://www.w3.org/2000/svg";
    while (s.firstChild) s.removeChild(s.firstChild);
    const W = 900, H = 640, PAD = 30, LNG0 = -74.7, LNG1 = -71.5, LAT0 = 20.15, LAT1 = 17.9;
    const X = (lo: number) => PAD + ((lo - LNG0) / (LNG1 - LNG0)) * (W - 2 * PAD);
    const Y = (la: number) => PAD + ((LAT0 - la) / (LAT0 - LAT1)) * (H - 2 * PAD);
    const P = (a: number[][]) => a.map(([la, lo]) => X(lo).toFixed(1) + "," + Y(la).toFixed(1)).join(" ");
    const E = (t: string, at: Record<string, string | number>, parent: Node = s) => {
      const e = document.createElementNS(NS, t);
      for (const k in at) e.setAttribute(k, String(at[k]));
      parent.appendChild(e);
      return e;
    };
    const d = E("defs", {});
    const gold = E("linearGradient", { id: "mgold", x1: 0, y1: 0, x2: 1, y2: 1 }, d);
    (["0 #6b4a12", "0.5 #d9a521", "1 #f4d66a"] as const).forEach((st) => {
      const [o, c] = st.split(" ");
      E("stop", { offset: o, "stop-color": c }, gold);
    });
    // sea
    const sea = E("linearGradient", { id: "msea", x1: 0, y1: 0, x2: 0, y2: 1 }, d);
    E("stop", { offset: 0, "stop-color": "#155a68" }, sea);
    E("stop", { offset: 1, "stop-color": C.seateal }, sea);
    E("rect", { x: 0, y: 0, width: W, height: H, fill: "url(#msea)" }, s);
    for (let i = 0; i < 7; i++) {
      const yy = 90 + i * 80;
      E("path", { d: `M0,${yy} q120,${8 - (i % 2) * 16} 240,0 t240,0 t240,0 t240,0`, fill: "none", stroke: C.deepsea, "stroke-width": 2, opacity: 0.35 }, s);
    }
    const land = SEA.concat(BORDER.slice(1, -1));
    E("polygon", { points: P(land), fill: "none", stroke: C.bone, "stroke-width": 7, opacity: 0.14, "stroke-linejoin": "round" }, s);
    const cp = E("clipPath", { id: "mland" }, d);
    E("polygon", { points: P(land) }, cp);
    E("polygon", { points: P(land), fill: C.emerald, stroke: C.umber, "stroke-width": 2, "stroke-linejoin": "round" }, s);
    const g = E("g", { "clip-path": "url(#mland)" }, s);
    E("rect", { x: 0, y: Y(19), width: W, height: H, fill: C.deepsea, opacity: 0.08 }, g);
    E("polygon", { points: P(NPLAIN), fill: C.ochre, opacity: 0.92 }, g);
    const mtn = (x: number, y: number, r: number) => {
      E("path", { d: `M${x - r},${y} Q${x - r * 0.5},${y - r * 1.5} ${x},${y - r * 1.7} Q${x + r * 0.5},${y - r * 1.5} ${x + r},${y} Z`, fill: C.deepsea, stroke: C.umber, "stroke-width": 1.2 }, g);
      E("path", { d: `M${x - r},${y} Q${x - r * 0.5},${y - r * 1.5} ${x},${y - r * 1.7} L${x},${y} Z`, fill: C.emerald, opacity: 0.55 }, g);
      E("path", { d: `M${x - r * 0.35},${y - r * 1.15} l${r * 0.35},${-r * 0.4} l${r * 0.35},${r * 0.4}`, fill: "none", stroke: C.bone, "stroke-width": 1.4, opacity: 0.7 }, g);
    };
    for (const rg of MRANGES) {
      const ax = X(rg[1]), ay = Y(rg[0]), bx = X(rg[3]), by = Y(rg[2]), cnt = rg[4];
      for (let i = 0; i <= cnt; i++) {
        const t = i / cnt, x = ax + (bx - ax) * t, y = ay + (by - ay) * t, r = 8 + ((i * 7) % 4);
        mtn(x, y + (i % 2 ? 3 : 0), r);
      }
    }
    [GONAVE, TORTUE].forEach((is) => E("polygon", { points: P(is), fill: C.emerald, stroke: C.umber, "stroke-width": 1.6 }, s));
    [[19.35, -72.95], [18.62, -72.9], [19.55, -73.6]].forEach(([la, lo]) => {
      const x = X(lo), y = Y(la);
      E("path", { d: `M${x - 9},${y} L${x + 9},${y} L${x + 5},${y + 6} L${x - 5},${y + 6} Z`, fill: C.bone }, s);
      E("path", { d: `M${x},${y} L${x},${y - 15} L${x + 9},${y} Z`, fill: C.kanvas }, s);
    });
    let rd = "M" + X(MSITES[0].lng) + "," + Y(MSITES[0].lat);
    for (let i = 1; i < MSITES.length; i++) rd += " L" + X(MSITES[i].lng) + "," + Y(MSITES[i].lat);
    E("path", { d: rd, fill: "none", stroke: C.night, "stroke-width": 4, opacity: 0.35, "stroke-linejoin": "round" }, s);
    E("path", { d: rd, fill: "none", stroke: "url(#mgold)", "stroke-width": 2.4, "stroke-dasharray": "7 6", "stroke-linejoin": "round" }, s);
    MSITES.forEach((m) => {
      const x = X(m.lng), y = Y(m.lat), cur = m.n === currentUnit, past = m.n < currentUnit;
      if (cur) E("circle", { cx: x, cy: y, r: 16, fill: "none", stroke: "url(#mgold)", "stroke-width": 2, opacity: 0.8 }, s);
      E("circle", { cx: x, cy: y, r: cur ? 12 : 9, fill: C.iron, stroke: cur ? "url(#mgold)" : C.umber, "stroke-width": cur ? 2.5 : 1.5 }, s);
      const t = E("text", { x, y: y + 4, "text-anchor": "middle", "font-family": "Archivo Black, sans-serif", "font-size": cur ? 14 : 11, fill: past ? "#8a7a5a" : C.cornmeal }, s);
      t.textContent = String(m.n);
    });
    const lbl = (la: number, lo: number, txt: string, dx: number, dy: number) => {
      const x = X(lo) + dx, y = Y(la) + dy, w = txt.length * 7 + 10;
      E("rect", { x: x - 4, y: y - 11, width: w, height: 16, fill: "rgba(9,7,5,.66)" }, s);
      const t = E("text", { x: x + 2, y: y + 1, "font-family": "IBM Plex Mono, monospace", "font-size": 11, fill: C.cornmeal, "letter-spacing": ".04em" }, s);
      t.textContent = txt;
    };
    lbl(19.77, -72.19, "LE CAP", 14, -6);
    lbl(19.83, -73.4, "MÔLE", -52, -4);
    lbl(19.45, -72.69, "GONAÏVES", -80, 4);
    lbl(18.57, -72.34, "PORT-AU-PRINCE", -4, 22);
    const cx = W - 58, cy = 64;
    E("line", { x1: cx, y1: cy - 18, x2: cx, y2: cy + 18, stroke: C.cornmeal, "stroke-width": 1 }, s);
    E("line", { x1: cx - 18, y1: cy, x2: cx + 18, y2: cy, stroke: C.cornmeal, "stroke-width": 1 }, s);
    E("polygon", { points: `${cx},${cy - 22} ${cx + 4},${cy} ${cx},${cy + 5} ${cx - 4},${cy}`, fill: "url(#mgold)" }, s);
    const nt = E("text", { x: cx, y: cy - 26, "text-anchor": "middle", "font-family": "Archivo Black, sans-serif", "font-size": 12, fill: C.cornmeal }, s);
    nt.textContent = "N";
  }, [currentUnit]);

  return <svg ref={ref} className="svgwrap" viewBox="0 0 900 640" preserveAspectRatio="xMidYMid meet" style={{ width: "100%", aspectRatio: "900 / 640", display: "block" }} aria-label="Saint-Domingue — the campaign" />;
}
