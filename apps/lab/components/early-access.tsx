import Script from "next/script";

export function EarlyAccess() {
  const uid = process.env.NEXT_PUBLIC_KIT_EMBED_UID;
  const src = process.env.NEXT_PUBLIC_KIT_EMBED_SRC;
  const configured = Boolean(uid && src && /^https:\/\//.test(src));

  return <section className="early-access lab-shell" id="early-access" aria-labelledby="early-access-heading">
    <div><p className="eyebrow">First Agent Skill / Early access</p><h2 id="early-access-heading">See the first release when it&apos;s ready.</h2></div>
    <div className="early-access-detail"><p>The Design Skill is being built for solo builders using a coding agent in a supported Next.js or React repository. The first project covers a design foundation, core components, one finished flow, and a rollout guide.</p><p className="early-access-consent">Sign up only for updates about the first Agent Skill launch. This is not a general Lab newsletter. Kit sends a confirmation email before the subscription is active.</p>
      {configured ? <div className="kit-form" data-kit-form><Script async data-uid={uid} src={src!} strategy="afterInteractive" /></div> : <p className="early-access-pending" role="status">The early-access form opens after its dedicated list is configured.</p>}
    </div>
  </section>;
}
