import { Check } from 'lucide-react';

const steps = [
    { number: 1, title: 'Pilih Kamar', description: 'Unit sudah dipilih' },
    {
        number: 2,
        title: 'Isi Data & Jadwal Survey',
        description: 'Lengkapi informasi pemesan',
    },
    {
        number: 3,
        title: 'Bayar DP / Konfirmasi',
        description: 'Konfirmasi simulasi booking',
    },
];

type BookingStepIndicatorProps = {
    currentStep: 2 | 3;
    allCompleted?: boolean;
};

export function BookingStepIndicator({
    currentStep,
    allCompleted = false,
}: BookingStepIndicatorProps) {
    return (
        <ol
            className="grid gap-3 md:grid-cols-3"
            aria-label="Tahapan pemesanan kamar"
        >
            {steps.map((step) => {
                const isCompleted = allCompleted || step.number < currentStep;
                const isActive = !allCompleted && step.number === currentStep;

                return (
                    <li
                        key={step.number}
                        aria-current={isActive ? 'step' : undefined}
                        className={`flex items-center gap-3 rounded-2xl border p-4 ${
                            isActive
                                ? 'border-[#4F6F52] bg-[#F3F7F1]'
                                : isCompleted
                                  ? 'border-emerald-200 bg-emerald-50/70'
                                  : 'border-slate-200 bg-white'
                        }`}
                    >
                        <span
                            className={`grid size-9 shrink-0 place-items-center rounded-full text-sm font-bold ${
                                isActive
                                    ? 'bg-[#4F6F52] text-white'
                                    : isCompleted
                                      ? 'bg-emerald-600 text-white'
                                      : 'bg-slate-100 text-slate-500'
                            }`}
                        >
                            {isCompleted ? (
                                <Check
                                    className="size-5"
                                    strokeWidth={3}
                                    aria-hidden="true"
                                />
                            ) : (
                                step.number
                            )}
                        </span>
                        <span className="min-w-0">
                            <strong className="block text-sm text-[#1F2A24]">
                                {step.title}
                            </strong>
                            <span className="mt-0.5 block text-xs leading-4 text-[#5F6B63]">
                                {step.description}
                            </span>
                        </span>
                    </li>
                );
            })}
        </ol>
    );
}
