import { ChevronDown } from 'lucide-react';
import { faqs } from '@/components/home/home-data';

export function FaqSection() {
    return (
        <section
            id="faq"
            aria-labelledby="faq-title"
            className="scroll-mt-24 rounded-3xl border border-blue-100 bg-white p-5 shadow-[0_12px_35px_rgba(28,73,133,0.07)] sm:p-6"
        >
            <p className="text-xs font-bold tracking-[0.18em] text-[#0769f1]">
                YANG SERING DITANYAKAN
            </p>
            <h2
                id="faq-title"
                className="mt-1 text-2xl font-bold text-[#09245f]"
            >
                FAQ
            </h2>
            <div className="mt-5 divide-y divide-blue-100">
                {faqs.map((faq) => (
                    <details
                        key={faq.question}
                        className="group py-4 first:pt-0 last:pb-0"
                    >
                        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-bold text-[#0a2864] marker:hidden">
                            {faq.question}
                            <ChevronDown
                                className="size-5 shrink-0 text-[#0769f1] transition group-open:rotate-180"
                                aria-hidden="true"
                            />
                        </summary>
                        <p className="pt-3 pr-8 text-sm leading-6 text-[#64738e]">
                            {faq.answer}
                        </p>
                    </details>
                ))}
            </div>
        </section>
    );
}
