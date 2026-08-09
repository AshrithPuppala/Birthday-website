/**
 * The little "tag / Heading / squiggle" block that starts most sections.
 * The original site injected the squiggle underline via JS after every
 * .section-head h2 - here it's just part of the markup.
 */
export default function SectionHead({ tag, children }) {
  return (
    <div className="section-head">
      <div className="tag">{tag}</div>
      <h2>{children}</h2>
      <span className="squiggle" />
    </div>
  );
}
