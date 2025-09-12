// components/seo/ArticleJsonLd.tsx
export default function ArticleJsonLd({ title, description, url, date, locale }: {
  title: string; description: string; url: string; date: string; locale: "fa"|"en";
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    datePublished: date,
    inLanguage: locale,
    mainEntityOfPage: url,
    author: { "@type": "Person", name: "Fatemeh" },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
