import { ImageResponse } from "next/og";

export const alt = "Jay's Lab — thinking, made usable";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(<div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "68px 76px", color: "#242527", background: "#f8f7f1", fontFamily: "sans-serif" }}>
    <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 28, fontWeight: 600, letterSpacing: "-0.03em" }}><div style={{ width: 48, height: 48, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 7, color: "#f8f7f1", background: "#242527", fontSize: 19 }}>J·L</div>Jay&apos;s Lab</div>
    <div style={{ display: "flex", flexDirection: "column", gap: 22 }}><div style={{ display: "flex", flexDirection: "column", fontSize: 95, letterSpacing: "-0.075em", lineHeight: .91, fontWeight: 600 }}><span>Thinking,</span><span>made usable.</span></div><div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid #c9c8c0", paddingTop: 20, fontSize: 22 }}><span>Standards · Experiments · Showcase</span><span style={{ color: "#4a4b47" }}>lab.jaylawrence.me</span></div></div>
    <div style={{ position: "absolute", right: 76, top: 74, width: 14, height: 14, borderRadius: "50%", background: "#cfff04" }} />
  </div>, size);
}
