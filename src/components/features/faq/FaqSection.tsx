import { Accordion } from "@/components/ui";
import type { FaqGroup } from "@/packages/configs/faq.config";

interface FaqSectionProps {
  groups: readonly FaqGroup[];
}

/** One heading + accordion per group. The page and the home section share it. */
const FaqSection = ({ groups }: FaqSectionProps) => (
  <div className="flex flex-col gap-10">
    {groups.map((group) => (
      <section key={group.id} aria-labelledby={`faq-${group.id}`}>
        <h2 id={`faq-${group.id}`} className="text-xl font-semibold">
          {group.title}
        </h2>
        {group.description && (
          <p className="mt-1 mb-4 text-sm text-muted-foreground">
            {group.description}
          </p>
        )}
        <Accordion
          className={group.description ? undefined : "mt-4"}
          items={group.items.map((item) => ({
            id: item.id,
            title: item.question,
            content: (
              <div className="flex flex-col gap-3">
                {item.answer.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            ),
          }))}
        />
      </section>
    ))}
  </div>
);

export default FaqSection;
