
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

export default function FaqsPage() {
  const faqs = [
    {
      q: "What is Reverse Osmosis (RO)?",
      a: "RO is a water purification process that uses a semi-permeable membrane to remove ions, molecules, and larger particles from drinking water."
    },
    {
      q: "How often should RO membranes be replaced?",
      a: "Depending on water quality and usage, membranes typically last 2 to 5 years. Our automated monitoring systems help predict the ideal replacement time."
    },
    {
      q: "What is the difference between Domestic and Industrial RO?",
      a: "The primary differences are capacity, pressure requirements, and automation levels. Industrial systems are built for 24/7 operation and higher recovery rates."
    },
    {
      q: "Does RO remove beneficial minerals?",
      a: "Yes, RO removes almost all dissolved solids. However, our premium systems include an alkaline remineralization stage to add essential minerals back to the water."
    },
    {
      q: "What maintenance is required for a commercial system?",
      a: "Regular pre-filter changes (every 3-6 months), membrane cleaning, and instrumentation calibration are key to system longevity."
    }
  ];

  return (
    <div className="min-h-screen py-16 bg-background">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16 space-y-4">
          <div className="p-4 rounded-full bg-primary/10 text-primary w-fit mx-auto">
            <HelpCircle className="h-10 w-10" />
          </div>
          <h1 className="text-4xl font-bold font-headline text-primary">Frequently Asked Questions</h1>
          <p className="text-muted-foreground">Technical answers to your common queries about water treatment and our services.</p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border rounded-2xl px-6 bg-white shadow-sm">
              <AccordionTrigger className="text-left font-bold font-headline text-lg py-6 hover:no-underline">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-6">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
