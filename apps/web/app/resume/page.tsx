import { Download } from "lucide-react";
import { education, experience, profile, skillGroups } from "@/lib/profile";

export const metadata = {
  title: "Résumé",
  description: `${profile.name} — ${profile.title}. Product engineering, frontend architecture, AI workflows, and full-stack delivery.`,
};

export default function Resume() {
  return (
    <div className="page-shell shell">
      <header className="page-intro resume-intro">
        <div>
          <p className="eyebrow">Résumé · web edition</p>
          <h1>Product engineering with frontend depth.</h1>
          <p>Four years of professional experience turning complex product requirements into scalable web applications, AI workflows, and maintainable frontend systems.</p>
        </div>
        <a className="button" href={profile.resumePath} download>Download PDF <Download size={16} /></a>
      </header>

      <div className="resume-layout">
        <aside>
          <h3>Contact</h3>
          <p><a href={`mailto:${profile.email}`}>{profile.email}</a><br/><a href={`tel:${profile.phone}`}>{profile.phoneDisplay}</a><br/>{profile.location}</p>
          {skillGroups.map((group) => <div key={group.label}><h3>{group.label}</h3><p>{group.skills.join(" · ")}</p></div>)}
          <h3>Profiles</h3>
          <p><a href={profile.github} target="_blank" rel="noreferrer">GitHub ↗</a><br/><a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a></p>
        </aside>

        <div className="resume-roles">
          {experience.map((role) => (
            <section key={`${role.company}-${role.period}`}>
              <p>{role.period}</p>
              <div><h2>{role.company}</h2><h3>{role.role} · {role.location}</h3><p>{role.summary}</p><ul>{role.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul></div>
            </section>
          ))}
        </div>
      </div>

      <section className="resume-education">
        <p className="eyebrow">Education</p>
        {education.map((item) => <article key={item.school}><div><h2>{item.program}</h2><p>{item.school}</p></div><p>{item.detail}</p></article>)}
      </section>
    </div>
  );
}
