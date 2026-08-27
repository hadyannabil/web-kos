import { Quote, Star } from 'lucide-react';
import { testimonials } from '@/components/home/home-data';

export function Testimonials() {
    return (
        <section
            id="testimoni"
            aria-labelledby="testimonials-title"
            className="scroll-mt-24 rounded-3xl border border-blue-100 bg-white p-5 shadow-[0_12px_35px_rgba(28,73,133,0.07)] sm:p-6"
        >
            <div className="mb-5">
                <p className="text-xs font-bold tracking-[0.18em] text-[#0769f1]">
                    CERITA PENGHUNI
                </p>
                <h2
                    id="testimonials-title"
                    className="mt-1 text-2xl font-bold text-[#09245f]"
                >
                    Testimoni Penghuni
                </h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                {testimonials.map((testimonial) => (
                    <article
                        key={testimonial.name}
                        className="relative rounded-2xl border border-slate-200 p-4"
                    >
                        <Quote
                            className="absolute top-4 right-4 size-6 text-blue-100"
                            fill="currentColor"
                            aria-hidden="true"
                        />
                        <div className="flex items-center gap-3">
                            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#0b6cf0] to-[#72b4ff] text-xs font-bold text-white">
                                {testimonial.initials}
                            </span>
                            <div>
                                <h3 className="text-sm font-bold text-[#0a2864]">
                                    {testimonial.name}
                                </h3>
                                <p className="text-[11px] text-[#7b89a1]">
                                    {testimonial.role}
                                </p>
                            </div>
                        </div>
                        <div
                            className="mt-3 flex gap-0.5 text-amber-400"
                            aria-label="Rating 5 dari 5"
                        >
                            {Array.from({ length: 5 }).map((_, index) => (
                                <Star
                                    key={index}
                                    className="size-3.5"
                                    fill="currentColor"
                                    aria-hidden="true"
                                />
                            ))}
                        </div>
                        <p className="mt-3 text-xs leading-5 text-[#526484]">
                            “{testimonial.quote}”
                        </p>
                    </article>
                ))}
            </div>
        </section>
    );
}
