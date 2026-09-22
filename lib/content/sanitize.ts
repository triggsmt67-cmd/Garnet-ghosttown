import sanitizeHtml from "sanitize-html";

/**
 * Story text comes from WordPress's editor. Keep the structure editors can
 * create (paragraphs, emphasis, links, quotes, lists, images, captions) and
 * drop everything else: scripts, inline styles, classes, embeds. Layout and
 * typography always come from the site's own CSS.
 */
export function sanitizeStoryHtml(html: string): string {
  // The classic editor stores blank lines instead of <p> tags; restore them.
  const withParagraphs = /<p[\s>]/i.test(html)
    ? html
    : html
        .split(/\n\s*\n/)
        .map((block) => block.trim())
        .filter(Boolean)
        .map((block) =>
          /^<(h2|h3|ul|ol|blockquote|figure|img)/i.test(block)
            ? block
            : `<p>${block.replace(/\n/g, "<br />")}</p>`,
        )
        .join("\n");

  const clean = sanitizeHtml(withParagraphs, {
    allowedTags: [
      "p", "br", "strong", "b", "em", "i", "a", "blockquote", "ul", "ol", "li",
      "h2", "h3", "figure", "figcaption", "img",
    ],
    allowedAttributes: {
      a: ["href", "title", "target", "rel"],
      img: ["src", "alt", "width", "height"],
    },
    allowedSchemes: ["http", "https", "mailto"],
    transformTags: {
      h1: "h2",
      // Open outside links in a new tab, safely.
      a: (tagName, attribs) => {
        const href = attribs.href ?? "";
        const external: Record<string, string> = { href, target: "_blank", rel: "noreferrer" };
        return { tagName, attribs: /^https?:/i.test(href) ? external : { href } };
      },
    },
    exclusiveFilter: (frame) =>
      frame.tag === "p" && !frame.text.trim() && frame.mediaChildren.length === 0,
  });

  // A line starting with "—", "--" or "Source:" is a citation for the excerpt
  // above it. Editors type it on the line right after a quoted passage.
  // (WordPress turns "--" into an en dash, sometimes as an HTML entity.)
  return clean.replace(
    /<p>(\s*(?:—|–|--|&#8211;|&#8212;|&ndash;|&mdash;|Source:))/g,
    '<p class="excerpt-cite">$1',
  );
}
