import { Link } from "@/components/ui";
import {
  type LegalDocument,
  legalConfig,
} from "@/packages/configs/legal.config";

/** Renders one document from legal.config.ts, so Terms and Privacy share a layout. */
const LegalPage = ({ document }: { document: LegalDocument }) => (
  <main className="mx-auto w-full max-w-3xl px-4 py-16 sm:py-24">
    <Link href="/" variant="secondary">
      ← Back to home
    </Link>

    <h1 className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl">
      {document.title}
    </h1>
    <p className="mt-2 text-sm text-muted-foreground">
      Last updated {legalConfig.lastUpdated}
    </p>
    <p className="mt-6 text-muted-foreground">{document.intro}</p>

    {document.sections.map((section) => (
      <section key={section.heading} className="mt-8">
        <h2 className="text-xl font-semibold">{section.heading}</h2>
        {section.body.map((paragraph) => (
          <p key={paragraph} className="mt-2 text-muted-foreground">
            {paragraph}
          </p>
        ))}
      </section>
    ))}

    {legalConfig.contactEmail && (
      <p className="mt-10 text-sm text-muted-foreground">
        Questions? Write to{" "}
        <a className="underline" href={`mailto:${legalConfig.contactEmail}`}>
          {legalConfig.contactEmail}
        </a>
        .
      </p>
    )}
  </main>
);

export default LegalPage;
