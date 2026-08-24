import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Reveal } from '@/components/site/reveal';

const FAQ_ITEMS = [
  {
    id: 'faq-1',
    question: 'What does FaQ Systems do?',
    answer:
      'We are a productized software company. That means we build focused SaaS products — FaQ Core, FaQ Toolkit, and whatever graduates from FaQ Labs — and offer them as clean, subscription-based software. No agencies, no retainers, no custom-quoting theater.',
  },
  {
    id: 'faq-2',
    question: 'What does "productized" actually mean?',
    answer:
      'Fixed scope, transparent pricing, and a defined outcome. You subscribe to a product that already exists, not a project that gets discovered as it burns hours. If a product needs changing, we change it for every subscriber at once — that discipline is what keeps our prices honest.',
  },
  {
    id: 'faq-3',
    question: 'Who builds and supports the products?',
    answer:
      'The founders — Faisal and Qayyum. The same two engineers who design and write the code answer support, fix bugs, and ship updates. There is no ticket black hole between you and the people who own the product.',
  },
  {
    id: 'faq-4',
    question: 'How is pricing structured?',
    answer:
      'Simple per-product subscriptions with a free tier where it makes sense. No sales calls required to see a price, no per-seat math that punishes growth, no annual lock-in. If a product stops earning its subscription, you should be able to leave in one click — your data exports with you.',
  },
  {
    id: 'faq-5',
    question: 'Do you take on custom work or partnerships?',
    answer:
      'Selectively. If your problem sits close to what we already build, we are genuinely interested — send us a note through the form below. If it does not, we will tell you that honestly instead of taking the money and missing the mark.',
  },
];

export function FAQ() {
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
                The questions people actually ask before working with a
                two-person software company.
              </p>
              <a
                href="#contact"
                className="link-underline mt-6 inline-block text-[13.5px] font-medium text-ink/75 hover:text-ink"
              >
                Still curious? Write to us
              </a>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <Accordion type="single" collapsible className="w-full">
              {FAQ_ITEMS.map((item) => (
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
