import { education, experience, profile, skillGroups } from "@/lib/profile";
import { ActionLink, CompanyLink } from "@/components/editorial-links";
import { ResumeSkillJoke } from "@/components/resume-skill-joke";
import { ExperienceYears } from "@/components/experience-years";
import { getProfessionalExperienceYears } from "@/lib/professional-experience";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Résumé",
  description: `${profile.name} — ${profile.title}. Product engineering, frontend architecture, AI workflows, and full-stack delivery.`,
  path: "/resume",
});

export default function Resume() {
  return (
    <div className="page-shell shell">
      <header className="page-intro resume-intro">
        <div>
          <p className="eyebrow">Résumé · web edition</p>
          <h1>Product engineering with frontend depth.</h1>
          <p><ExperienceYears initialYears={getProfessionalExperienceYears()} /> of professional experience turning complex product requirements into scalable web applications, AI workflows, and maintainable frontend systems.</p>
        </div>
        <ActionLink href={profile.resumePath} download>Download PDF</ActionLink>
      </header>

      <div className="resume-layout">
        <aside>
          <h3>Contact</h3>
          <p><a href={`mailto:${profile.email}`}>{profile.email}</a><br/>{profile.location}</p>
          {skillGroups.map((group) => <div key={group.label}>{group.label === "Product & frontend" ? <div className="resume-skill-heading"><h3>{group.label}</h3><ResumeSkillJoke /></div> : <h3>{group.label}</h3>}<p>{group.skills.join(" · ")}</p></div>)}
          <h3>Profiles</h3>
          <p><a href={profile.github} target="_blank" rel="noreferrer">GitHub ↗</a><br/><a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a></p>
        </aside>

        <div className="resume-roles">
          {experience.map((role) => (
            <section key={`${role.company}-${role.period}`} id={role.company === "Chartmetric" ? "chartmetric" : undefined} tabIndex={role.company === "Chartmetric" ? -1 : undefined}>
              <p>{role.period}</p>
              <div><h2>{role.companyUrl ? <CompanyLink href={role.companyUrl}>{role.company}</CompanyLink> : role.company}</h2><h3>{role.role}{role.location && ` · ${role.location}`}</h3><p>{role.summary}</p><ul>{role.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul></div>
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
