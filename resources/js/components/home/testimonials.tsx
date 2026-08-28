import { Quote, Star } from 'lucide-react';
import { testimonials } from '@/components/home/home-data';

export function Testimonials() {
    return (
        <section
            id="testimoni"
            aria-labelledby="testimonials-title"
            className="scroll-mt-24 rounded-3xl border border-[#DDE8D8] bg-white p-5 shadow-[0_12px_35px_rgba(47,79,62,0.07)] sm:p-6"
        >
            <div className="mb-5">
                <p className="text-xs font-bold tracking-[0.18em] text-[#4F6F52]">
                    CERITA PENGHUNI
                </p>
                <h2
                    id="testimonials-title"
                    className="mt-1 text-2xl font-bold text-[#1F2A24]"
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
                        <div className="flex items-center gap-3">
                            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#2F4F3E] to-[#4F6F52] text-xs font-bold text-white">
                                {testimonial.initials}
                            </span>
                            <div>
                                <h3 className="text-sm font-bold text-[#1F2A24]">
                                    {testimonial.name}
                                </h3>
                                <p className="text-[11px] text-[#5F6B63]">
                                    {testimonial.role}
                                </p>
                            </div>
                        </div>
                        <div className="mt-3 flex items-center justify-between gap-3">
                            <div
                                className="flex gap-0.5 text-amber-400"
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
                            <Quote
                                className="size-5 shrink-0 text-[#DDE8D8]"
                                fill="currentColor"
                                aria-hidden="true"
                            />
                        </div>
                        <p className="mt-3 text-xs leading-5 text-[#5F6B63]">
                            “{testimonial.quote}”
                        </p>
                    </article>
                ))}
            </div>
        </section>
    );
}
