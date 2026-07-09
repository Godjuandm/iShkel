// components/shared/ProductDescription.tsx
// Renders a Shopify product description, preserving the formatting from
// Shopify Admin: paragraphs, line breaks, and bullet/numbered lists.
// Prefers descriptionHtml (Shopify's rich text) and safely falls back to
// turning plain-text newlines into real paragraphs/<br> when HTML isn't available.

interface ProductDescriptionProps {
  descriptionHtml?: string;
  description?: string;
  className?: string;
}

const HTML_STYLES =
  '[&_p]:mb-3 [&_p:last-child]:mb-0 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-3 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:mb-3 [&_li]:mb-1 [&_strong]:font-medium';

export default function ProductDescription({
  descriptionHtml,
  description,
  className = '',
}: ProductDescriptionProps) {
  if (descriptionHtml) {
    return (
      <div
        className={`${HTML_STYLES} ${className}`}
        dangerouslySetInnerHTML={{ __html: descriptionHtml }}
      />
    );
  }

  if (!description) return null;

  const paragraphs = description.split(/\n{2,}/);

  return (
    <div className={className}>
      {paragraphs.map((paragraph, i) => (
        <p key={i} className={i < paragraphs.length - 1 ? 'mb-3' : undefined}>
          {paragraph.split('\n').map((line, j, lines) => (
            <span key={j}>
              {line}
              {j < lines.length - 1 && <br />}
            </span>
          ))}
        </p>
      ))}
    </div>
  );
}
