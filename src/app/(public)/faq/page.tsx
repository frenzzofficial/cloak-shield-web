import type { Metadata } from "next";
import FaqSection from "@/components/features/faq/FaqSection";
import { Link } from "@/components/ui";
import { FAQ_GROUPS, faqConfig } from "@/packages/configs/faq.config";

export const metadata: Metadata = {
  title: "FAQ",
  description: faqConfig.description,
};

/** Structured data so search engines can show the questions. The text is our own, never user input. */
const jsonLd = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_GROUPS.flatMap((group) => group.items).map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer.join(" ") },
  })),
}).replace(/</g, "\\u003c");

const Page = () => (
  <main className="mx-auto w-full max-w-3xl px-4 py-16 sm:py-24">
    <Link href="/" variant="secondary">
      ← Back to home
    </Link>
    <h1 className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl">
      {faqConfig.title}
    </h1>
    <p className="mt-2 mb-10 text-muted-foreground">{faqConfig.description}</p>
    <FaqSection groups={FAQ_GROUPS} />
    <script type="application/ld+json">{jsonLd}</script>
  </main>
);

export default Page;
