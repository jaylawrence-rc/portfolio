import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";
import { getPost, posts } from "@/lib/posts";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const post = getPost((await params).slug);
  return post ? { title: post.title, description: post.description } : {};
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const post = getPost((await params).slug);
  if (!post) notFound();

  return (
    <article className="blog-article">
      <header className="blog-article-header reading-rail">
        <Link href="/blog" className="back-link"><ArrowLeft size={15} /> All posts</Link>
        <p className="eyebrow">{post.topics.join(" · ")}</p>
        <h1>{post.title}</h1>
        <p className="blog-deck">{post.description}</p>
        <div className="blog-byline"><span>By Jay Lawrence Dimaano</span><span>{post.publishedAt}</span><span>{post.readingTime}</span></div>
      </header>

      <div className="article-prose reading-rail">
        <p className="article-opening">AI is most useful to me when it makes the engineering process clearer. I do not use it to avoid understanding a problem. I use it to reach understanding faster, test more options, and spend more attention on decisions that require product and engineering judgment.</p>

        <section>
          <p className="eyebrow">The operating principle</p>
          <h2>AI works inside my process, not above it.</h2>
          <p>Shipping software still means being accountable for the outcome. The model does not attend the stakeholder conversation, own the production incident, or explain a tradeoff to the team. I do.</p>
          <p>That changes how I use tools such as Codex, Claude Code, and OpenCode. I treat them as fast collaborators that can inspect, compare, draft, and challenge. I do not treat their output as inherently correct.</p>
          <blockquote>My goal is not to generate more code. It is to reduce the distance between an unclear problem and a verified solution.</blockquote>
        </section>

        <section>
          <p className="eyebrow">My workflow</p>
          <h2>Five loops from context to confidence.</h2>
          <p>The exact tool changes, but the sequence is consistent. Each loop has a clear output and a reason to stop before moving forward.</p>
          <div className="workflow-strip" aria-label="AI-assisted development workflow">
            {["Context", "Plan", "Build", "Verify", "Learn"].map((step, index) => <div key={step}><span>0{index + 1}</span><strong>{step}</strong></div>)}
          </div>

          <h3>1. Build context before asking for code</h3>
          <p>I start with the user or business decision, then identify the relevant constraints: existing architecture, design patterns, data boundaries, performance expectations, and failure states. I ask AI to inspect the repository and explain what already exists before proposing anything new.</p>
          <p>Good context includes the files that define the system, not an enormous dump of everything. Product specifications, design tokens, component APIs, nearby tests, and repository instructions are usually more valuable than thousands of unrelated lines.</p>

          <h3>2. Turn ambiguity into a bounded plan</h3>
          <p>For ambiguous work, I ask the model to separate facts, assumptions, risks, and decisions. This is especially helpful when translating domain-heavy requirements into product behavior. At RAVPRO, for example, clinical workflows require more than a technically valid interface; terminology, correction paths, long-running AI states, and compliance boundaries all shape the implementation.</p>
          <p>The plan should be small enough to verify. If it contains multiple unrelated changes, I split it. A narrow loop makes both the AI output and my review more reliable.</p>

          <h3>3. Delegate mechanics, keep judgment</h3>
          <p>I use AI heavily for repository exploration, scaffolding, repetitive refactors, test cases, documentation, and comparing implementation options. These tasks benefit from speed and breadth.</p>
          <p>I stay directly involved in product behavior, architecture boundaries, security and privacy decisions, accessibility, performance tradeoffs, and any domain assumption that could change the result. Those decisions need context that is larger than a prompt.</p>

          <h3>4. Verify through the product, not the chat</h3>
          <p>A confident answer is not evidence. I run type checks, tests, production builds, and targeted browser journeys. I inspect the changed diff and check responsive layouts, keyboard paths, reduced motion, empty states, and failure behavior.</p>
          <p>When something breaks, I bring the concrete signal back into the loop: the error, the relevant code path, and the behavior I expected. This turns debugging into a testable investigation instead of repeated guessing.</p>

          <h3>5. Preserve what the team learned</h3>
          <p>If a correction is likely to matter again, I move it out of the conversation and into the system. It may become a test, a component primitive, a lint rule, a design token, an architecture note, or a repository instruction.</p>
          <p>This is where AI-assisted work compounds. The next task begins with better context because the previous task left behind more than code.</p>
        </section>

        <section>
          <p className="eyebrow">Where it helps</p>
          <h2>I use AI differently across the development lifecycle.</h2>
          <ul>
            <li><strong>Discovery:</strong> map an unfamiliar codebase, trace data flow, find existing patterns, and surface questions before implementation.</li>
            <li><strong>Product shaping:</strong> turn conversations into explicit requirements, edge cases, states, and acceptance criteria.</li>
            <li><strong>Implementation:</strong> draft components, migrations, tests, scripts, and documentation within known system boundaries.</li>
            <li><strong>Debugging:</strong> compare observed behavior against the expected path and generate focused hypotheses.</li>
            <li><strong>Review:</strong> challenge assumptions, inspect accessibility and performance risks, and look for changes outside the intended scope.</li>
          </ul>
        </section>

        <section>
          <p className="eyebrow">The boundaries</p>
          <h2>Some work should never be delegated blindly.</h2>
          <p>I never paste credentials, private customer information, patient data, or confidential business material into a tool without an approved environment and policy. Sanitizing context is part of the engineering task.</p>
          <p>I also avoid letting generated code establish a new architectural pattern by accident. A solution can work locally and still create inconsistency, unnecessary dependencies, or a maintenance problem. Existing system boundaries win unless there is a deliberate reason to change them.</p>
          <p>Finally, I read what ships. AI can draft quickly, but responsibility cannot be delegated.</p>
        </section>

        <section>
          <p className="eyebrow">A practical example</p>
          <h2>From an ambiguous workflow to a production feature.</h2>
          <ol>
            <li>I write the outcome in user language and list known constraints.</li>
            <li>I ask AI to inspect adjacent features, shared primitives, state management, and tests.</li>
            <li>We produce a short implementation plan with explicit assumptions and edge cases.</li>
            <li>AI drafts the mechanical parts while I shape behavior, naming, composition, and system boundaries.</li>
            <li>I run the real journey, review the diff, and test responsive, accessible, loading, empty, and error states.</li>
            <li>I capture any reusable correction in the codebase so the next feature starts smarter.</li>
          </ol>
        </section>

        <section>
          <p className="eyebrow">The result</p>
          <h2>AI gives me leverage when the feedback loop stays honest.</h2>
          <p>The value is not that AI can type faster than I can. The value is that it can help me inspect more context, compare more options, and verify more thoroughly—provided I keep the work bounded and remain accountable for every decision.</p>
          <p>Used this way, AI does not replace the software engineering workflow. It makes the workflow more deliberate.</p>
        </section>
      </div>

      <footer className="article-end reading-rail">
        <p className="eyebrow">Continue</p>
        <h2>See how that workflow appears in shipped product work.</h2>
        <Link href="/work">Explore the case studies <ArrowRight size={16} /></Link>
      </footer>
    </article>
  );
}
