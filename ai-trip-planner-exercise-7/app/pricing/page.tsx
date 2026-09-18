import { PricingTable } from "@clerk/nextjs";
import Link from "next/link";
import Footer from "../_components/Footer";
import {
  Headphones,
  History,
  Mail,
  Map,
  RefreshCcw,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const features = [
  {
    icon: Sparkles,
    title: "Unlimited Trip Planning",
    description: "Generate as many AI itineraries as you need.",
  },
  {
    icon: History,
    title: "90 Days Trip History",
    description: "Revisit and reuse your past trips anytime.",
  },
  {
    icon: Map,
    title: "3D Places on Map",
    description: "Explore every destination in interactive 3D.",
  },
  {
    icon: Mail,
    title: "Email Support",
    description: "Get help from our team whenever you need it.",
  },
];

const trustItems = [
  { icon: ShieldCheck, label: "Secure payment" },
  { icon: RefreshCcw, label: "Cancel anytime" },
  { icon: Headphones, label: "24/7 support" },
];

const faqs = [
  {
    question: "Can I cancel my subscription anytime?",
    answer:
      "Yes. You can cancel your subscription at any time from your account settings, no questions asked. You'll keep access until the end of your current billing period.",
  },
  {
    question: "What happens to my trips if I cancel?",
    answer:
      "Your existing trips stay saved in your account. You'll just lose access to premium features like unlimited planning and 3D maps until you resubscribe.",
  },
  {
    question: "Is my payment information secure?",
    answer:
      "Absolutely. All payments are processed securely through our billing provider, and we never store your full card details on our servers.",
  },
  {
    question: "Do you offer refunds?",
    answer:
      "If something isn't working as expected, reach out to our support team within 14 days of your purchase and we'll make it right.",
  },
];

function Pricing() {
  return (
    <div className="bg-[#F8FAFC]">
      {/* Hero */}
      <section className="px-4 pt-12 pb-6 text-center md:pt-14 md:pb-8">
        <span className="mb-5 inline-flex items-center rounded-full bg-[#E0F2FE] px-4 py-1.5 text-xs font-semibold text-[#0284C7]">
          Pricing
        </span>
        <h1 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-[#0B2545] sm:text-4xl md:text-5xl">
          Plan Smarter Trips <span className="text-[#0EA5E9]">with AI</span>
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base text-[#64748B] sm:text-lg">
          Unlock unlimited AI-powered itineraries, hotel recommendations, and
          interactive maps. Cancel anytime.
        </p>
      </section>

      {/* Pricing card */}
      <section className="px-4 pb-10 md:pb-12">
        <div className="pricing-card-scope relative mx-auto max-w-[420px]">
          <style>{`
            .pricing-card-scope .cl-pricingTableCardFeaturesListItem svg {
              color: #0284C7 !important;
            }
          `}</style>
          <div className="absolute -top-3 left-1/2 z-10 -translate-x-1/2">
            <span className="inline-flex items-center rounded-full bg-[#0284C7] px-4 py-1 text-xs font-semibold text-white shadow-md">
              Most Popular
            </span>
          </div>
          <div className="overflow-hidden rounded-2xl border-2 border-[#0284C7] bg-white shadow-lg">
            <PricingTable
              appearance={{
                variables: {
                  colorPrimary: "#0284C7",
                  colorForeground: "#0B2545",
                  colorMutedForeground: "#64748B",
                  colorSuccess: "#0284C7",
                  borderRadius: "0.75rem",
                  fontFamily: "inherit",
                },
                elements: {
                  pricingTableCard: {
                    border: "none",
                    borderRadius: "0",
                    boxShadow: "none",
                  },
                  pricingTableCardHeader: {
                    backgroundColor: "#FFFFFF",
                    boxShadow: "none",
                    borderBottom: "none",
                  },
                  pricingTableCardFee: {
                    fontSize: "2rem",
                  },
                  pricingTableCardFeaturesListItem: {
                    color: "#0284C7",
                  },
                  pricingTableCardFeaturesListItemTitle: {
                    color: "#0B2545",
                  },
                },
              }}
            />
          </div>
        </div>

        {/* Trust row */}
        <div className="mx-auto mt-5 flex max-w-2xl flex-col items-center justify-center gap-4 sm:flex-row sm:gap-8">
          {trustItems.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2">
              <Icon className="h-4 w-4 text-[#0EA5E9]" />
              <span className="text-sm text-[#64748B]">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Feature grid */}
      <section className="px-4 py-10 md:py-12">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-6 text-center text-2xl font-bold text-[#0B2545] sm:text-3xl">
            Everything you get
          </h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="rounded-xl border border-[#E0F2FE] bg-white p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-[#E0F2FE]">
                  <Icon className="h-5 w-5 text-[#0284C7]" />
                </div>
                <h3 className="mb-1 font-semibold text-[#0B2545]">{title}</h3>
                <p className="text-sm text-[#64748B]">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 py-10 md:py-12">
        <div className="mx-auto max-w-[700px]">
          <h2 className="mb-5 text-center text-2xl font-bold text-[#0B2545] sm:text-3xl">
            Frequently Asked Questions
          </h2>
          <div className="rounded-2xl border border-[#E0F2FE] bg-white p-6 sm:p-8">
            <Accordion>
              {faqs.map((faq, index) => (
                <AccordionItem key={faq.question} value={`item-${index}`}>
                  <AccordionTrigger className="text-base font-medium text-[#0B2545] hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-[#64748B]">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-4 pb-10 md:pb-12">
        <div className="mx-auto max-w-5xl rounded-2xl bg-linear-to-r from-[#0B2545] to-[#0284C7] px-6 py-14 text-center sm:px-12 sm:py-16">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Ready for your next adventure?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-white/80">
            Start planning your next trip with AI in just a few clicks.
          </p>
          <Link
            href="/create-new-trip"
            className="mt-7 inline-flex items-center justify-center rounded-lg bg-white px-6 py-3 font-semibold text-[#0284C7] transition-colors duration-200 hover:bg-white/90"
          >
            Start Planning
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Pricing;
