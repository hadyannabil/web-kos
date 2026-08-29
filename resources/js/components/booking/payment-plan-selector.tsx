import { CalendarRange, WalletCards } from 'lucide-react';
import { calculateBookingSummary, paymentPlanLabels } from '@/data/booking';
import type { PaymentPlan } from '@/data/booking';
import { formatRupiah } from '@/data/rooms';

type PaymentPlanSelectorProps = {
    value: PaymentPlan | '';
    monthlyPrice: number;
    durationMonths: number;
    error?: string;
    onChange: (paymentPlan: PaymentPlan) => void;
};

const paymentPlans: Array<{
    value: PaymentPlan;
    description: string;
    icon: typeof WalletCards;
}> = [
    {
        value: 'monthly',
        description: 'Bayar biaya sewa setiap bulan selama periode sewa.',
        icon: CalendarRange,
    },
    {
        value: 'upfront',
        description:
            'Bayar seluruh biaya sewa untuk periode yang dipilih sekaligus.',
        icon: WalletCards,
    },
];

export function PaymentPlanSelector({
    value,
    monthlyPrice,
    durationMonths,
    error,
    onChange,
}: PaymentPlanSelectorProps) {
    return (
        <fieldset aria-describedby={error ? 'payment-plan-error' : undefined}>
            <legend className="text-2xl font-bold text-[#1F2A24]">
                Skema Pembayaran
            </legend>
            <p className="mt-2 text-sm text-[#5F6B63]">
                Pilih cara pembayaran sewa yang paling sesuai.
            </p>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {paymentPlans.map((plan) => {
                    const Icon = plan.icon;
                    const calculation = calculateBookingSummary({
                        monthlyPrice,
                        durationMonths,
                        paymentPlan: plan.value,
                    });
                    const isSelected = value === plan.value;

                    return (
                        <label
                            key={plan.value}
                            className={`relative cursor-pointer rounded-2xl border p-4 transition ${
                                isSelected
                                    ? 'border-[#4F6F52] bg-[#F3F7F1] ring-2 ring-[#DDE8D8]'
                                    : 'border-slate-200 bg-white hover:border-[#4F6F52]'
                            }`}
                        >
                            <input
                                type="radio"
                                name="payment-plan"
                                value={plan.value}
                                checked={isSelected}
                                onChange={() => onChange(plan.value)}
                                className="sr-only"
                            />
                            <span className="flex items-start gap-3">
                                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#DDE8D8] text-[#4F6F52]">
                                    <Icon
                                        className="size-5"
                                        aria-hidden="true"
                                    />
                                </span>
                                <span className="min-w-0">
                                    <strong className="block text-sm text-[#1F2A24]">
                                        {paymentPlanLabels[plan.value]}
                                    </strong>
                                    <span className="mt-1 block text-xs leading-5 text-[#5F6B63]">
                                        {plan.description}
                                    </span>
                                </span>
                            </span>
                            <span className="mt-4 block border-t border-[#DDE8D8] pt-3 text-sm font-bold text-[#2F4F3E]">
                                {plan.value === 'monthly'
                                    ? `${formatRupiah(monthlyPrice)} / bulan`
                                    : formatRupiah(calculation.totalContract)}
                            </span>
                            <span className="mt-1 block text-xs text-[#5F6B63]">
                                {plan.value === 'monthly'
                                    ? `selama ${durationMonths} bulan`
                                    : `untuk ${durationMonths} bulan`}
                            </span>
                        </label>
                    );
                })}
            </div>

            {error && (
                <p
                    id="payment-plan-error"
                    className="mt-3 text-xs font-semibold text-red-600"
                >
                    {error}
                </p>
            )}
        </fieldset>
    );
}
