"use client";

import { useState } from "react";
import type { Direction } from "./demo-ship";

const slots = ["Tue 17 · 10:30 AM", "Tue 17 · 2:00 PM", "Wed 18 · 9:15 AM"] as const;

export function ShipDirectionFlow({ variant }: { variant: Direction["className"] }) {
  const [step, setStep] = useState<"choose" | "review" | "done">("choose");
  const [slot, setSlot] = useState<(typeof slots)[number]>(slots[0]);
  const [project, setProject] = useState("");
  const [milestone, setMilestone] = useState("");
  const isBooking = variant === "booking";

  function reset() {
    setStep("choose");
    setSlot(slots[0]);
    setProject("");
    setMilestone("");
  }

  return <section className="demo-ship__flow" aria-labelledby="demo-flow-title">
    <div className="demo-ship__flow-intro"><span>Working sample / local state only</span><h2 id="demo-flow-title">{isBooking ? "Try the booking sequence." : "Create a first project."}</h2><p>{isBooking ? "Select, review, and confirm a sample time. Nothing is sent or reserved." : "Name a fictional project and its first milestone. The data stays in this browser session and is cleared on refresh."}</p></div>
    <div className="demo-ship__flow-panel">
      <div className="demo-ship__flow-progress" aria-label="Flow progress"><span className="is-active">01 Choose</span><span className={step !== "choose" ? "is-active" : ""}>02 Review</span><span className={step === "done" ? "is-active" : ""}>03 Done</span></div>
      {step === "choose" && (isBooking ? <div className="demo-ship__flow-step"><h3>Find a time that fits.</h3><fieldset><legend>Available sample times</legend>{slots.map((option) => <label key={option} className={slot === option ? "is-selected" : ""}><input type="radio" name="booking-slot" value={option} checked={slot === option} onChange={() => setSlot(option)} />{option}</label>)}</fieldset><button type="button" onClick={() => setStep("review")}>Review time <span aria-hidden="true">→</span></button></div> : <form className="demo-ship__flow-step" onSubmit={(event) => { event.preventDefault(); if (project.trim() && milestone.trim()) setStep("review"); }}><h3>Give the idea a shape.</h3><label>Project name<input required maxLength={60} value={project} onChange={(event) => setProject(event.target.value)} placeholder="e.g. Field Notes" /></label><label>First milestone<input required maxLength={90} value={milestone} onChange={(event) => setMilestone(event.target.value)} placeholder="e.g. Invite two test users" /></label><button type="submit">Review project <span aria-hidden="true">→</span></button></form>)}
      {step === "review" && <div className="demo-ship__flow-step"><h3>Does this look right?</h3><dl>{isBooking ? <><dt>Service</dt><dd>Sample planning session</dd><dt>Time</dt><dd>{slot}</dd></> : <><dt>Project</dt><dd>{project.trim()}</dd><dt>First milestone</dt><dd>{milestone.trim()}</dd></>}</dl><div className="demo-ship__flow-buttons"><button type="button" className="is-secondary" onClick={() => setStep("choose")}>Edit choice</button><button type="button" onClick={() => setStep("done")}>Confirm sample <span aria-hidden="true">→</span></button></div></div>}
      {step === "done" && <div className="demo-ship__flow-step demo-ship__flow-done" aria-live="polite"><span aria-hidden="true">✓</span><h3>{isBooking ? "A clear next step." : "A place to begin."}</h3><p>{isBooking ? `${slot} is your sample selection. No appointment was booked.` : `${project.trim()} is a sample project. No account or project was created.`}</p><button type="button" onClick={reset}>Try again ↺</button></div>}
    </div>
  </section>;
}
