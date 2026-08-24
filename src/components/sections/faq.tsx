import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { FAQ_ITEMS } from '@/lib/site-data';
import { Reveal } from '@/components/site/reveal';

export function FAQ() {
  const items = FAQ_ITEMS.slice(0, 6);

  return (
    <section id="faq" className="bg-background py-24 md:py-32" aria-label="Frequently asked questions">
      <div className="container-luxe">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <p className="eyebrow flex items-center gap-2.5 text-muted-foreground">
                <span aria-hidden="true" className="h-1.5 w-1.5 bg-crimson" />
                Frequently asked
              </p>
              <h2 className="mt-5 font-serif text-4xl leading-[1.08] tracking-[-0.015em] text-ink md:text-5xl">
                Answers, before you ask.
              </h2>
              <p className="mt-6 max-w-sm text-[15px] leading-[1.75] text-muted-foreground">
                The questions every captive, bank, and lessor asks before
                trusting a platform with their book.
              </p>
              <a
                href="#contact"
                className="link-underline mt-6 inline-block text-[13.5px] font-medium text-ink/75 hover:text-ink"
              >
                Still curious? Talk to our team
              </a>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <Accordion type="single" collapsible className="w-full">
              {items.map((item) => (
                <AccordionItem
                  key={item.id}
                  value={item.id}
                  className="border-b border-hairline last:border-b"
                >
                  <AccordionTrigger className="py-6 text-left font-serif text-[18px] leading-snug text-ink hover:no-underline hover:text-crimson data-[state=open]:text-ink [&>svg]:h-4 [&>svg]:w-4 [&>svg]:text-ink/40">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="pb-7 text-[14px] leading-[1.8] text-muted-foreground">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
